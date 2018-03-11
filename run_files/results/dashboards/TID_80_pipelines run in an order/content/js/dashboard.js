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
    createTable($("#apdexTable"), {"supportsControllersDiscrimination": true, "overall": {"data": [0.9411764705882353, 500, 1500, "Total"], "isController": false}, "titles": ["Apdex", "T (Toleration threshold)  ", "F (Frustration threshold)", "Label"], "items": [{"data": [1.0, 500, 1500, "execute addmult 4"], "isController": false}, {"data": [1.0, 500, 1500, "assert expected/actual"], "isController": false}, {"data": [1.0, 500, 1500, "create workflow add mult"], "isController": false}, {"data": [1.0, 500, 1500, "execute addmult 2"], "isController": false}, {"data": [1.0, 500, 1500, "execute addmult 3"], "isController": false}, {"data": [1.0, 500, 1500, "create request wait batch 20"], "isController": false}, {"data": [1.0, 500, 1500, "delete workflow addmult"], "isController": false}, {"data": [1.0, 500, 1500, "Get results REST addmult:02ce6dd9-dc84-4597-b6f7-fbed5dd48ea5"], "isController": false}, {"data": [1.0, 500, 1500, "Get results REST addmult:223e9126-02b5-4651-8402-ca9697edbefc"], "isController": false}, {"data": [0.5, 500, 1500, "execute addmult 1"], "isController": false}, {"data": [1.0, 500, 1500, "Get results REST addmult:64e6df2a-80ea-4cb7-8643-517ab44b1c11"], "isController": false}, {"data": [1.0, 500, 1500, "Get results REST addmult:cd9decd1-0090-404a-98ce-0574283987fc"], "isController": false}, {"data": [0.5, 500, 1500, "create workflow eval wait"], "isController": false}, {"data": [1.0, 500, 1500, "get progress REST evalwait:fdd6f5d1-3046-43dc-bbc6-e3357a2126af"], "isController": false}, {"data": [1.0, 500, 1500, "Get results REST evalwait:fdd6f5d1-3046-43dc-bbc6-e3357a2126af"], "isController": false}, {"data": [1.0, 500, 1500, "delete workflow eval wait"], "isController": false}]}, function(index, item){
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
    createTable($("#statisticsTable"), {"supportsControllersDiscrimination": true, "overall": {"data": ["Total", 17, 0, 0.0, 266.47058823529414, 7, 640, 564.8, 640.0, 640.0, 0.6396267589735872, 1.0938837454849877, 0.2107593686507638], "isController": false}, "titles": ["Label", "#Samples", "KO", "Error %", "Average", "Min", "Max", "90th pct", "95th pct", "99th pct", "Throughput", "Received", "Sent"], "items": [{"data": ["execute addmult 4", 1, 0, 0.0, 119.0, 119, 119, 119.0, 119.0, 119.0, 8.403361344537815, 4.7022715336134455, 3.3400078781512605], "isController": false}, {"data": ["assert expected/actual", 1, 0, 0.0, 7.0, 7, 7, 7.0, 7.0, 7.0, 142.85714285714286, 1401.2276785714284, 0.0], "isController": false}, {"data": ["create workflow add mult", 1, 0, 0.0, 103.0, 103, 103, 103.0, 103.0, 103.0, 9.70873786407767, 4.8828125, 6.72216322815534], "isController": false}, {"data": ["execute addmult 2", 1, 0, 0.0, 144.0, 144, 144, 144.0, 144.0, 144.0, 6.944444444444444, 3.885904947916667, 2.7330186631944446], "isController": false}, {"data": ["execute addmult 3", 1, 0, 0.0, 178.0, 178, 178, 178.0, 178.0, 178.0, 5.617977528089887, 3.143653441011236, 2.2054950842696632], "isController": false}, {"data": ["create request wait batch 20", 1, 0, 0.0, 436.0, 436, 436, 436.0, 436.0, 436.0, 2.293577981651376, 1.2856579701834863, 0.9519244552752294], "isController": false}, {"data": ["delete workflow addmult", 1, 0, 0.0, 106.0, 106, 106, 106.0, 106.0, 106.0, 9.433962264150942, 4.698555424528302, 2.247936320754717], "isController": false}, {"data": ["Get results REST addmult:02ce6dd9-dc84-4597-b6f7-fbed5dd48ea5", 1, 0, 0.0, 160.0, 160, 160, 160.0, 160.0, 160.0, 6.25, 4.58984375, 1.5625], "isController": false}, {"data": ["Get results REST addmult:223e9126-02b5-4651-8402-ca9697edbefc", 1, 0, 0.0, 96.0, 96, 96, 96.0, 96.0, 96.0, 10.416666666666666, 7.670084635416666, 2.6041666666666665], "isController": false}, {"data": ["execute addmult 1", 1, 0, 0.0, 546.0, 546, 546, 546.0, 546.0, 546.0, 1.8315018315018314, 1.024854052197802, 0.7190075549450549], "isController": false}, {"data": ["Get results REST addmult:64e6df2a-80ea-4cb7-8643-517ab44b1c11", 1, 0, 0.0, 94.0, 94, 94, 94.0, 94.0, 94.0, 10.638297872340425, 7.8228889627659575, 2.6595744680851063], "isController": false}, {"data": ["Get results REST addmult:cd9decd1-0090-404a-98ce-0574283987fc", 1, 0, 0.0, 233.0, 233, 233, 233.0, 233.0, 233.0, 4.291845493562231, 3.1643978004291844, 1.0729613733905579], "isController": false}, {"data": ["create workflow eval wait", 1, 0, 0.0, 640.0, 640, 640, 640.0, 640.0, 640.0, 1.5625, 0.78582763671875, 1.0772705078125], "isController": false}, {"data": ["get progress REST evalwait:fdd6f5d1-3046-43dc-bbc6-e3357a2126af", 2, 0, 0.0, 398.5, 395, 402, 402.0, 402.0, 402.0, 0.3412969283276451, 0.9443992640784983, 0.08532423208191126], "isController": false}, {"data": ["Get results REST evalwait:fdd6f5d1-3046-43dc-bbc6-e3357a2126af", 1, 0, 0.0, 469.0, 469, 469, 469.0, 469.0, 469.0, 2.1321961620469083, 12.764025852878465, 0.5351312633262261], "isController": false}, {"data": ["delete workflow eval wait", 1, 0, 0.0, 402.0, 402, 402, 402.0, 402.0, 402.0, 2.487562189054726, 1.2389225746268655, 0.5951686878109452], "isController": false}]}, function(index, item){
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
