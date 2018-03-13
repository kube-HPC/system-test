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

    var data = {"OkPercent": 100.0, "KoPercent": 0.0};
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
    createTable($("#apdexTable"), {"supportsControllersDiscrimination": true, "overall": {"data": [0.9411764705882353, 500, 1500, "Total"], "isController": false}, "titles": ["Apdex", "T (Toleration threshold)  ", "F (Frustration threshold)", "Label"], "items": [{"data": [1.0, 500, 1500, "execute addmult 4"], "isController": false}, {"data": [1.0, 500, 1500, "assert expected/actual"], "isController": false}, {"data": [1.0, 500, 1500, "create workflow add mult"], "isController": false}, {"data": [1.0, 500, 1500, "get progress REST evalwait:60ae8822-be18-4190-84bf-dee2564bcbfd"], "isController": false}, {"data": [1.0, 500, 1500, "execute addmult 2"], "isController": false}, {"data": [1.0, 500, 1500, "execute addmult 3"], "isController": false}, {"data": [1.0, 500, 1500, "Get results REST addmult:0bd385c8-2350-4b98-ac5d-1e8c55c86b3b"], "isController": false}, {"data": [1.0, 500, 1500, "create request wait batch 20"], "isController": false}, {"data": [1.0, 500, 1500, "delete workflow addmult"], "isController": false}, {"data": [0.5, 500, 1500, "execute addmult 1"], "isController": false}, {"data": [1.0, 500, 1500, "Get results REST addmult:9514e01f-6b5c-4565-b879-c99b45bac2cc"], "isController": false}, {"data": [1.0, 500, 1500, "Get results REST evalwait:60ae8822-be18-4190-84bf-dee2564bcbfd"], "isController": false}, {"data": [0.5, 500, 1500, "create workflow eval wait"], "isController": false}, {"data": [1.0, 500, 1500, "Get results REST addmult:d443f351-6a85-4ba5-97a6-808f6cc412fe"], "isController": false}, {"data": [1.0, 500, 1500, "delete workflow eval wait"], "isController": false}, {"data": [1.0, 500, 1500, "Get results REST addmult:e7957f40-8289-4c17-924f-a9b90d86e6a2"], "isController": false}]}, function(index, item){
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
    createTable($("#statisticsTable"), {"supportsControllersDiscrimination": true, "overall": {"data": ["Total", 17, 0, 0.0, 262.8235294117647, 6, 571, 551.0, 571.0, 571.0, 0.6430624905431986, 1.1136861193070056, 0.21189145483431684], "isController": false}, "titles": ["Label", "#Samples", "KO", "Error %", "Average", "Min", "Max", "90th pct", "95th pct", "99th pct", "Throughput", "Received", "Sent"], "items": [{"data": ["execute addmult 4", 1, 0, 0.0, 128.0, 128, 128, 128.0, 128.0, 128.0, 7.8125, 4.37164306640625, 3.10516357421875], "isController": false}, {"data": ["assert expected/actual", 1, 0, 0.0, 6.0, 6, 6, 6.0, 6.0, 6.0, 166.66666666666666, 1659.66796875, 0.0], "isController": false}, {"data": ["create workflow add mult", 1, 0, 0.0, 83.0, 83, 83, 83.0, 83.0, 83.0, 12.048192771084338, 6.059393825301204, 8.341961596385541], "isController": false}, {"data": ["get progress REST evalwait:60ae8822-be18-4190-84bf-dee2564bcbfd", 2, 0, 0.0, 384.5, 384, 385, 385.0, 385.0, 385.0, 0.3437607425232039, 0.9515525631660365, 0.08594018563080097], "isController": false}, {"data": ["execute addmult 2", 1, 0, 0.0, 117.0, 117, 117, 117.0, 117.0, 117.0, 8.547008547008549, 4.782652243589744, 3.3637152777777777], "isController": false}, {"data": ["execute addmult 3", 1, 0, 0.0, 137.0, 137, 137, 137.0, 137.0, 137.0, 7.299270072992701, 4.084454835766423, 2.8655337591240873], "isController": false}, {"data": ["Get results REST addmult:0bd385c8-2350-4b98-ac5d-1e8c55c86b3b", 1, 0, 0.0, 97.0, 97, 97, 97.0, 97.0, 97.0, 10.309278350515465, 7.963514819587629, 2.5773195876288657], "isController": false}, {"data": ["create request wait batch 20", 1, 0, 0.0, 457.0, 457, 457, 457.0, 457.0, 457.0, 2.1881838074398248, 1.2265795951859957, 0.9081817560175054], "isController": false}, {"data": ["delete workflow addmult", 1, 0, 0.0, 88.0, 88, 88, 88.0, 88.0, 88.0, 11.363636363636363, 5.659623579545455, 2.7077414772727275], "isController": false}, {"data": ["execute addmult 1", 1, 0, 0.0, 546.0, 546, 546, 546.0, 546.0, 546.0, 1.8315018315018314, 1.024854052197802, 0.7190075549450549], "isController": false}, {"data": ["Get results REST addmult:9514e01f-6b5c-4565-b879-c99b45bac2cc", 1, 0, 0.0, 92.0, 92, 92, 92.0, 92.0, 92.0, 10.869565217391305, 8.396314538043478, 2.717391304347826], "isController": false}, {"data": ["Get results REST evalwait:60ae8822-be18-4190-84bf-dee2564bcbfd", 1, 0, 0.0, 462.0, 462, 462, 462.0, 462.0, 462.0, 2.1645021645021645, 13.111725514069263, 0.5432393127705627], "isController": false}, {"data": ["create workflow eval wait", 1, 0, 0.0, 571.0, 571, 571, 571.0, 571.0, 571.0, 1.7513134851138354, 0.8807875437828372, 1.207448555166375], "isController": false}, {"data": ["Get results REST addmult:d443f351-6a85-4ba5-97a6-808f6cc412fe", 1, 0, 0.0, 111.0, 111, 111, 111.0, 111.0, 111.0, 9.00900900900901, 6.941511824324325, 2.2522522522522523], "isController": false}, {"data": ["delete workflow eval wait", 1, 0, 0.0, 403.0, 403, 403, 403.0, 403.0, 403.0, 2.4813895781637716, 1.2358483250620347, 0.5936918424317618], "isController": false}, {"data": ["Get results REST addmult:e7957f40-8289-4c17-924f-a9b90d86e6a2", 1, 0, 0.0, 401.0, 401, 401, 401.0, 401.0, 401.0, 2.493765586034913, 1.9287718204488777, 0.6234413965087281], "isController": false}]}, function(index, item){
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
    createTable($("#errorsTable"), {"supportsControllersDiscrimination": false, "titles": ["Type of error", "Number of errors", "% in errors", "% in all samples"], "items": []}, function(index, item){
        switch(index){
            case 2:
            case 3:
                item = item.toFixed(2) + '%';
                break;
        }
        return item;
    }, [[1, 1]]);

        // Create top5 errors by sampler
    createTable($("#top5ErrorsBySamplerTable"), {"supportsControllersDiscrimination": false, "overall": {"data": ["Total", 17, 0, null, null, null, null, null, null, null, null, null, null], "isController": false}, "titles": ["Sample", "#Samples", "#Errors", "Error", "#Errors", "Error", "#Errors", "Error", "#Errors", "Error", "#Errors", "Error", "#Errors"], "items": [{"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}]}, function(index, item){
        return item;
    }, [[0, 0]], 0);

});
