/*
   Licensed to the Apache Software Foundation (ASF) under one or more
   contributor license agreements.  See the NOTICE file distributed with
   this work for additional information regarding copyright ownership.
   The ASF licenses this file to You under the Apache License, Version 2.0
   (the "License"); you may not use this file except in compliance with
   the License.  You may obtain a copy of the License at

       http://www.apache.org/licenses/LICENSE-2.0

   Unless required by applicable law or agreed to in writing, software
   distributed under the License is distributed on an "AS IS" BASIS,
   WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   See the License for the specific language governing permissions and
   limitations under the License.
*/
var showControllersOnly = false;
var seriesFilter = "";
var filtersOnlySampleSeries = true;

/*
 * Add header in statistics table to group metrics by category
 * format
 *
 */
function summaryTableHeader(header) {
    var newRow = header.insertRow(-1);
    newRow.className = "tablesorter-no-sort";
    var cell = document.createElement('th');
    cell.setAttribute("data-sorter", false);
    cell.colSpan = 1;
    cell.innerHTML = "Requests";
    newRow.appendChild(cell);

    cell = document.createElement('th');
    cell.setAttribute("data-sorter", false);
    cell.colSpan = 3;
    cell.innerHTML = "Executions";
    newRow.appendChild(cell);

    cell = document.createElement('th');
    cell.setAttribute("data-sorter", false);
    cell.colSpan = 7;
    cell.innerHTML = "Response Times (ms)";
    newRow.appendChild(cell);

    cell = document.createElement('th');
    cell.setAttribute("data-sorter", false);
    cell.colSpan = 2;
    cell.innerHTML = "Network (KB/sec)";
    newRow.appendChild(cell);
}

/*
 * Populates the table identified by id parameter with the specified data and
 * format
 *
 */
function createTable(table, info, formatter, defaultSorts, seriesIndex, headerCreator) {
    var tableRef = table[0];

    // Create header and populate it with data.titles array
    var header = tableRef.createTHead();

    // Call callback is available
    if(headerCreator) {
        headerCreator(header);
    }

    var newRow = header.insertRow(-1);
    for (var index = 0; index < info.titles.length; index++) {
        var cell = document.createElement('th');
        cell.innerHTML = info.titles[index];
        newRow.appendChild(cell);
    }

    var tBody;

    // Create overall body if defined
    if(info.overall){
        tBody = document.createElement('tbody');
        tBody.className = "tablesorter-no-sort";
        tableRef.appendChild(tBody);
        var newRow = tBody.insertRow(-1);
        var data = info.overall.data;
        for(var index=0;index < data.length; index++){
            var cell = newRow.insertCell(-1);
            cell.innerHTML = formatter ? formatter(index, data[index]): data[index];
        }
    }

    // Create regular body
    tBody = document.createElement('tbody');
    tableRef.appendChild(tBody);

    var regexp;
    if(seriesFilter) {
        regexp = new RegExp(seriesFilter, 'i');
    }
    // Populate body with data.items array
    for(var index=0; index < info.items.length; index++){
        var item = info.items[index];
        if((!regexp || filtersOnlySampleSeries && !info.supportsControllersDiscrimination || regexp.test(item.data[seriesIndex]))
                &&
                (!showControllersOnly || !info.supportsControllersDiscrimination || item.isController)){
            if(item.data.length > 0) {
                var newRow = tBody.insertRow(-1);
                for(var col=0; col < item.data.length; col++){
                    var cell = newRow.insertCell(-1);
                    cell.innerHTML = formatter ? formatter(col, item.data[col]) : item.data[col];
                }
            }
        }
    }

    // Add support of columns sort
    table.tablesorter({sortList : defaultSorts});
}

$(document).ready(function() {

    // Customize table sorter default options
    $.extend( $.tablesorter.defaults, {
        theme: 'blue',
        cssInfoBlock: "tablesorter-no-sort",
        widthFixed: true,
        widgets: ['zebra']
    });

    var data = {"OkPercent": 80.0, "KoPercent": 20.0};
    var dataset = [
        {
            "label" : "KO",
            "data" : data.KoPercent,
            "color" : "#FF6347"
        },
        {
            "label" : "OK",
            "data" : data.OkPercent,
            "color" : "#9ACD32"
        }];
    $.plot($("#flot-requests-summary"), dataset, {
        series : {
            pie : {
                show : true,
                radius : 1,
                label : {
                    show : true,
                    radius : 3 / 4,
                    formatter : function(label, series) {
                        return '<div style="font-size:8pt;text-align:center;padding:2px;color:white;">'
                            + label
                            + '<br/>'
                            + Math.round10(series.percent, -2)
                            + '%</div>';
                    },
                    background : {
                        opacity : 0.5,
                        color : '#000'
                    }
                }
            }
        },
        legend : {
            show : true
        }
    });

    // Creates APDEX table
    createTable($("#apdexTable"), {"supportsControllersDiscrimination": true, "overall": {"data": [0.7, 500, 1500, "Total"], "isController": false}, "titles": ["Apdex", "T (Toleration threshold)  ", "F (Frustration threshold)", "Label"], "items": [{"data": [0.0, 500, 1500, "assert expected/actual"], "isController": false}, {"data": [0.5, 500, 1500, "create workflow eval wait"], "isController": false}, {"data": [0.5, 500, 1500, "Get results REST evalwait:7f790bfa-0870-487d-8b51-5e2d45689458"], "isController": false}, {"data": [1.0, 500, 1500, "delete workflow eval wait"], "isController": false}, {"data": [1.0, 500, 1500, "create request 10 minutes as a batch"], "isController": false}, {"data": [1.0, 500, 1500, "get progress REST evalwait:7f790bfa-0870-487d-8b51-5e2d45689458"], "isController": false}, {"data": [1.0, 500, 1500, "create request 5 minutes"], "isController": false}, {"data": [1.0, 500, 1500, "Get results REST evalwait:9537a009-6670-4f86-be22-a22dea64273c"], "isController": false}, {"data": [1.0, 500, 1500, "get progress REST evalwait:9537a009-6670-4f86-be22-a22dea64273c"], "isController": false}]}, function(index, item){
        switch(index){
            case 0:
                item = item.toFixed(3);
                break;
            case 1:
            case 2:
                item = formatDuration(item);
                break;
        }
        return item;
    }, [[0, 0]], 3);

    // Create statistics table
    createTable($("#statisticsTable"), {"supportsControllersDiscrimination": true, "overall": {"data": ["Total", 10, 2, 20.0, 341.70000000000005, 8, 623, 612.0, 623.0, 623.0, 0.7192174913693902, 1.9973034962960299, 0.19876811529056387], "isController": false}, "titles": ["Label", "#Samples", "KO", "Error %", "Average", "Min", "Max", "90th pct", "95th pct", "99th pct", "Throughput", "Received", "Sent"], "items": [{"data": ["assert expected/actual", 2, 2, 100.0, 13.0, 8, 18, 18.0, 18.0, 18.0, 0.3067484662576687, 1.790763995398773, 0.0], "isController": false}, {"data": ["create workflow eval wait", 1, 0, 0.0, 623.0, 623, 623, 623.0, 623.0, 623.0, 1.6051364365971108, 0.8072707664526485, 1.2477427768860354], "isController": false}, {"data": ["Get results REST evalwait:7f790bfa-0870-487d-8b51-5e2d45689458", 1, 0, 0.0, 513.0, 513, 513, 513.0, 513.0, 513.0, 1.949317738791423, 11.551230506822613, 0.4892330653021442], "isController": false}, {"data": ["delete workflow eval wait", 1, 0, 0.0, 412.0, 412, 412, 412.0, 412.0, 412.0, 2.4271844660194173, 1.2088516383495147, 0.5807228458737864], "isController": false}, {"data": ["create request 10 minutes as a batch", 1, 0, 0.0, 453.0, 453, 453, 453.0, 453.0, 453.0, 2.207505518763797, 1.2374103200883002, 0.9722509657836644], "isController": false}, {"data": ["get progress REST evalwait:7f790bfa-0870-487d-8b51-5e2d45689458", 1, 0, 0.0, 406.0, 406, 406, 406.0, 406.0, 406.0, 2.4630541871921183, 6.285117764778325, 0.6157635467980295], "isController": false}, {"data": ["create request 5 minutes", 1, 0, 0.0, 479.0, 479, 479, 479.0, 479.0, 479.0, 2.08768267223382, 1.1702439979123174, 0.6360908141962422], "isController": false}, {"data": ["Get results REST evalwait:9537a009-6670-4f86-be22-a22dea64273c", 1, 0, 0.0, 103.0, 103, 103, 103.0, 103.0, 103.0, 9.70873786407767, 28.709041262135923, 2.436665655339806], "isController": false}, {"data": ["get progress REST evalwait:9537a009-6670-4f86-be22-a22dea64273c", 1, 0, 0.0, 402.0, 402, 402, 402.0, 402.0, 402.0, 2.487562189054726, 6.313646610696517, 0.6218905472636815], "isController": false}]}, function(index, item){
        switch(index){
            // Errors pct
            case 3:
                item = item.toFixed(2) + '%';
                break;
            // Mean
            case 4:
            // Mean
            case 7:
            // Percentile 1
            case 8:
            // Percentile 2
            case 9:
            // Percentile 3
            case 10:
            // Throughput
            case 11:
            // Kbytes/s
            case 12:
            // Sent Kbytes/s
                item = item.toFixed(2);
                break;
        }
        return item;
    }, [[0, 0]], 0, summaryTableHeader);

    // Create error table
    createTable($("#errorsTable"), {"supportsControllersDiscrimination": false, "titles": ["Type of error", "Number of errors", "% in errors", "% in all samples"], "items": [{"data": ["both string was not equal", 2, 100.0, 20.0], "isController": false}]}, function(index, item){
        switch(index){
            case 2:
            case 3:
                item = item.toFixed(2) + '%';
                break;
        }
        return item;
    }, [[1, 1]]);

        // Create top5 errors by sampler
    createTable($("#top5ErrorsBySamplerTable"), {"supportsControllersDiscrimination": false, "overall": {"data": ["Total", 10, 2, "both string was not equal", 2, null, null, null, null, null, null, null, null], "isController": false}, "titles": ["Sample", "#Samples", "#Errors", "Error", "#Errors", "Error", "#Errors", "Error", "#Errors", "Error", "#Errors", "Error", "#Errors"], "items": [{"data": ["assert expected/actual", 2, 2, "both string was not equal", 2, null, null, null, null, null, null, null, null], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}]}, function(index, item){
        return item;
    }, [[0, 0]], 0);

});
