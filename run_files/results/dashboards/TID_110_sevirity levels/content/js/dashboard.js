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
    createTable($("#apdexTable"), {"supportsControllersDiscrimination": true, "overall": {"data": [0.926829268292683, 500, 1500, "Total"], "isController": false}, "titles": ["Apdex", "T (Toleration threshold)  ", "F (Frustration threshold)", "Label"], "items": [{"data": [1.0, 500, 1500, "get progress 20 evalerror:ee62821d-67f1-439c-8b8e-01ffd090a828"], "isController": false}, {"data": [1.0, 500, 1500, "Get results 60 evalerror:0f80d2ce-fb90-428e-825c-b2ede2f21e6a"], "isController": false}, {"data": [0.6, 500, 1500, "execute eval 60"], "isController": false}, {"data": [1.0, 500, 1500, "get progress 60 evalerror:0f80d2ce-fb90-428e-825c-b2ede2f21e6a"], "isController": false}, {"data": [0.7, 500, 1500, "execute eval 20"], "isController": false}, {"data": [1.0, 500, 1500, "Get results 100 evalerror:ba36adaa-aad7-4a43-a756-788d216ad226"], "isController": false}, {"data": [1.0, 500, 1500, "get progress 100 evalerror:f33306d8-ce8f-4e95-b84a-5d0563c9f361"], "isController": false}, {"data": [1.0, 500, 1500, "get progress 20 evalerror:1d324efd-73a1-426c-b1a3-afb87b3c4d5c"], "isController": false}, {"data": [1.0, 500, 1500, "Get results 60 evalerror:ae217e80-3ce7-4070-8ba6-aa0a8f75e6b8"], "isController": false}, {"data": [1.0, 500, 1500, "get progress 20 evalerror:c6d3683c-2da2-485c-b0e9-9aaf4e1b70de"], "isController": false}, {"data": [1.0, 500, 1500, "get progress 0 evalerror:53665793-297a-4708-981e-6fa933c5d1b2"], "isController": false}, {"data": [1.0, 500, 1500, "Get results 20 evalerror:814547d6-a371-4571-b234-aef8ac47b998"], "isController": false}, {"data": [1.0, 500, 1500, "Get results 100 evalerror:218c479d-2b8f-4e2d-829b-f4259db7d2c3"], "isController": false}, {"data": [1.0, 500, 1500, "Get results 100 evalerror:f33306d8-ce8f-4e95-b84a-5d0563c9f361"], "isController": false}, {"data": [0.8, 500, 1500, "execute eval 0"], "isController": false}, {"data": [1.0, 500, 1500, "get progress 0 evalerror:e1848562-cf84-472f-bb66-4e1c9fdbe424"], "isController": false}, {"data": [1.0, 500, 1500, "Get results 20 evalerror:9cd36071-74bc-4ec2-9b36-5a820d803a8a"], "isController": false}, {"data": [1.0, 500, 1500, "get progress 0 evalerror:bf37c3dc-7378-4dd0-95d7-fc7f8c042df7"], "isController": false}, {"data": [1.0, 500, 1500, "get progress 100 evalerror:ba36adaa-aad7-4a43-a756-788d216ad226"], "isController": false}, {"data": [1.0, 500, 1500, "Get results 100 evalerror:b1a51db5-032b-451c-b14f-41bc95937546"], "isController": false}, {"data": [1.0, 500, 1500, "Get results 0 evalerror:e1848562-cf84-472f-bb66-4e1c9fdbe424"], "isController": false}, {"data": [1.0, 500, 1500, "execute eval 20.6"], "isController": false}, {"data": [1.0, 500, 1500, "Get results 0 evalerror:bf37c3dc-7378-4dd0-95d7-fc7f8c042df7"], "isController": false}, {"data": [1.0, 500, 1500, "get progress 20 evalerror:814547d6-a371-4571-b234-aef8ac47b998"], "isController": false}, {"data": [1.0, 500, 1500, "Get results 20 evalerror:ee62821d-67f1-439c-8b8e-01ffd090a828"], "isController": false}, {"data": [1.0, 500, 1500, "get progress 100 evalerror:b9c55b10-d15f-44f2-bca9-81c8e4228212"], "isController": false}, {"data": [1.0, 500, 1500, "execute eval string"], "isController": false}, {"data": [1.0, 500, 1500, "delete workflow error"], "isController": false}, {"data": [1.0, 500, 1500, "Get results 60 evalerror:ba87ff4f-aba1-40c5-a40b-137519edad2d"], "isController": false}, {"data": [1.0, 500, 1500, "get progress 60 evalerror:6a8c79fc-e4c5-4ba9-9e9c-e1443a1c48f9"], "isController": false}, {"data": [1.0, 500, 1500, "Get results 60 evalerror:6a8c79fc-e4c5-4ba9-9e9c-e1443a1c48f9"], "isController": false}, {"data": [1.0, 500, 1500, "Get results 0 evalerror:b446aa7a-7344-4b89-9a9a-8cc5f6dc3583"], "isController": false}, {"data": [1.0, 500, 1500, "get progress 0 evalerror:b446aa7a-7344-4b89-9a9a-8cc5f6dc3583"], "isController": false}, {"data": [0.8, 500, 1500, "execute eval 100"], "isController": false}, {"data": [1.0, 500, 1500, "execute eval 101"], "isController": false}, {"data": [1.0, 500, 1500, "get progress 60 evalerror:ba87ff4f-aba1-40c5-a40b-137519edad2d"], "isController": false}, {"data": [1.0, 500, 1500, "get progress 60 evalerror:da76167b-fb52-4144-8f75-9e7c5dad01e5"], "isController": false}, {"data": [1.0, 500, 1500, "Get results 0 evalerror:2b4c960e-0031-44af-a720-2acec71f2075"], "isController": false}, {"data": [1.0, 500, 1500, "get progress 0 evalerror:2b4c960e-0031-44af-a720-2acec71f2075"], "isController": false}, {"data": [1.0, 500, 1500, "get progress 100 evalerror:218c479d-2b8f-4e2d-829b-f4259db7d2c3"], "isController": false}, {"data": [1.0, 500, 1500, "get progress 60 evalerror:ae217e80-3ce7-4070-8ba6-aa0a8f75e6b8"], "isController": false}, {"data": [1.0, 500, 1500, "Get results 0 evalerror:53665793-297a-4708-981e-6fa933c5d1b2"], "isController": false}, {"data": [0.5, 500, 1500, "create workflow error"], "isController": false}, {"data": [1.0, 500, 1500, "Get results 100 evalerror:b9c55b10-d15f-44f2-bca9-81c8e4228212"], "isController": false}, {"data": [1.0, 500, 1500, "execute eval -2"], "isController": false}, {"data": [1.0, 500, 1500, "get progress 100 evalerror:b1a51db5-032b-451c-b14f-41bc95937546"], "isController": false}, {"data": [1.0, 500, 1500, "Get results 20 evalerror:c6d3683c-2da2-485c-b0e9-9aaf4e1b70de"], "isController": false}, {"data": [1.0, 500, 1500, "Get results 60 evalerror:da76167b-fb52-4144-8f75-9e7c5dad01e5"], "isController": false}, {"data": [1.0, 500, 1500, "Get results 20 evalerror:1d324efd-73a1-426c-b1a3-afb87b3c4d5c"], "isController": false}, {"data": [1.0, 500, 1500, "get progress 20 evalerror:9cd36071-74bc-4ec2-9b36-5a820d803a8a"], "isController": false}]}, function(index, item){
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
    createTable($("#statisticsTable"), {"supportsControllersDiscrimination": true, "overall": {"data": ["Total", 82, 0, 0.0, 353.1585365853658, 76, 612, 544.3000000000001, 581.25, 612.0, 1.6637247144277396, 2.6813810246616754, 0.5385191264938016], "isController": false}, "titles": ["Label", "#Samples", "KO", "Error %", "Average", "Min", "Max", "90th pct", "95th pct", "99th pct", "Throughput", "Received", "Sent"], "items": [{"data": ["get progress 20 evalerror:ee62821d-67f1-439c-8b8e-01ffd090a828", 1, 0, 0.0, 399.0, 399, 399, 399.0, 399.0, 399.0, 2.506265664160401, 6.933838502506266, 0.6290139411027569], "isController": false}, {"data": ["Get results 60 evalerror:0f80d2ce-fb90-428e-825c-b2ede2f21e6a", 1, 0, 0.0, 139.0, 139, 139, 139.0, 139.0, 139.0, 7.194244604316547, 21.280631744604314, 1.8126124100719423], "isController": false}, {"data": ["execute eval 60", 5, 0, 0.0, 526.2, 468, 561, 561.0, 561.0, 561.0, 3.631082062454612, 2.038937681554103, 1.4006615377632534], "isController": false}, {"data": ["get progress 60 evalerror:0f80d2ce-fb90-428e-825c-b2ede2f21e6a", 1, 0, 0.0, 383.0, 383, 383, 383.0, 383.0, 383.0, 2.6109660574412534, 6.708448922976501, 0.6552912859007832], "isController": false}, {"data": ["execute eval 20", 5, 0, 0.0, 527.4, 439, 612, 612.0, 612.0, 612.0, 3.4482758620689653, 1.9362877155172415, 1.330145474137931], "isController": false}, {"data": ["Get results 100 evalerror:ba36adaa-aad7-4a43-a756-788d216ad226", 1, 0, 0.0, 128.0, 128, 128, 128.0, 128.0, 128.0, 7.8125, 23.13232421875, 1.9683837890625], "isController": false}, {"data": ["get progress 100 evalerror:f33306d8-ce8f-4e95-b84a-5d0563c9f361", 1, 0, 0.0, 395.0, 395, 395, 395.0, 395.0, 395.0, 2.5316455696202533, 6.5071202531645564, 0.6353837025316456], "isController": false}, {"data": ["get progress 20 evalerror:1d324efd-73a1-426c-b1a3-afb87b3c4d5c", 1, 0, 0.0, 389.0, 389, 389, 389.0, 389.0, 389.0, 2.5706940874035986, 7.084471401028277, 0.6451839652956298], "isController": false}, {"data": ["Get results 60 evalerror:ae217e80-3ce7-4070-8ba6-aa0a8f75e6b8", 1, 0, 0.0, 162.0, 162, 162, 162.0, 162.0, 162.0, 6.172839506172839, 18.26533564814815, 1.5552662037037037], "isController": false}, {"data": ["get progress 20 evalerror:c6d3683c-2da2-485c-b0e9-9aaf4e1b70de", 1, 0, 0.0, 390.0, 390, 390, 390.0, 390.0, 390.0, 2.5641025641025643, 7.09385016025641, 0.6435296474358975], "isController": false}, {"data": ["get progress 0 evalerror:53665793-297a-4708-981e-6fa933c5d1b2", 1, 0, 0.0, 391.0, 391, 391, 391.0, 391.0, 391.0, 2.557544757033248, 7.013267263427109, 0.6418837915601022], "isController": false}, {"data": ["Get results 20 evalerror:814547d6-a371-4571-b234-aef8ac47b998", 1, 0, 0.0, 79.0, 79, 79, 79.0, 79.0, 79.0, 12.658227848101266, 32.69630142405063, 3.189280063291139], "isController": false}, {"data": ["Get results 100 evalerror:218c479d-2b8f-4e2d-829b-f4259db7d2c3", 1, 0, 0.0, 210.0, 210, 210, 210.0, 210.0, 210.0, 4.761904761904763, 14.099702380952381, 1.1997767857142858], "isController": false}, {"data": ["Get results 100 evalerror:f33306d8-ce8f-4e95-b84a-5d0563c9f361", 1, 0, 0.0, 116.0, 116, 116, 116.0, 116.0, 116.0, 8.620689655172413, 25.525323275862068, 2.172009698275862], "isController": false}, {"data": ["execute eval 0", 5, 0, 0.0, 489.2, 438, 586, 586.0, 586.0, 586.0, 3.946329913180742, 2.2159567383583267, 1.518412095501184], "isController": false}, {"data": ["get progress 0 evalerror:e1848562-cf84-472f-bb66-4e1c9fdbe424", 1, 0, 0.0, 395.0, 395, 395, 395.0, 395.0, 395.0, 2.5316455696202533, 6.969442246835443, 0.6353837025316456], "isController": false}, {"data": ["Get results 20 evalerror:9cd36071-74bc-4ec2-9b36-5a820d803a8a", 1, 0, 0.0, 81.0, 81, 81, 81.0, 81.0, 81.0, 12.345679012345679, 31.876929012345677, 3.1105324074074074], "isController": false}, {"data": ["get progress 0 evalerror:bf37c3dc-7378-4dd0-95d7-fc7f8c042df7", 1, 0, 0.0, 380.0, 380, 380, 380.0, 380.0, 380.0, 2.631578947368421, 7.0132606907894735, 0.6604646381578947], "isController": false}, {"data": ["get progress 100 evalerror:ba36adaa-aad7-4a43-a756-788d216ad226", 1, 0, 0.0, 390.0, 390, 390, 390.0, 390.0, 390.0, 2.5641025641025643, 6.590544871794871, 0.6435296474358975], "isController": false}, {"data": ["Get results 100 evalerror:b1a51db5-032b-451c-b14f-41bc95937546", 1, 0, 0.0, 152.0, 152, 152, 152.0, 152.0, 152.0, 6.578947368421052, 19.467002467105264, 1.6575863486842106], "isController": false}, {"data": ["Get results 0 evalerror:e1848562-cf84-472f-bb66-4e1c9fdbe424", 1, 0, 0.0, 76.0, 76, 76, 76.0, 76.0, 76.0, 13.157894736842104, 33.948396381578945, 3.3151726973684212], "isController": false}, {"data": ["execute eval 20.6", 5, 0, 0.0, 390.0, 385, 394, 394.0, 394.0, 394.0, 4.198152812762385, 2.390159267422334, 1.6276041666666665], "isController": false}, {"data": ["Get results 0 evalerror:bf37c3dc-7378-4dd0-95d7-fc7f8c042df7", 1, 0, 0.0, 78.0, 78, 78, 78.0, 78.0, 78.0, 12.82051282051282, 33.07792467948718, 3.230168269230769], "isController": false}, {"data": ["get progress 20 evalerror:814547d6-a371-4571-b234-aef8ac47b998", 1, 0, 0.0, 383.0, 383, 383, 383.0, 383.0, 383.0, 2.6109660574412534, 7.167407800261096, 0.6552912859007832], "isController": false}, {"data": ["Get results 20 evalerror:ee62821d-67f1-439c-8b8e-01ffd090a828", 1, 0, 0.0, 76.0, 76, 76, 76.0, 76.0, 76.0, 13.157894736842104, 33.97409539473684, 3.3151726973684212], "isController": false}, {"data": ["get progress 100 evalerror:b9c55b10-d15f-44f2-bca9-81c8e4228212", 1, 0, 0.0, 398.0, 398, 398, 398.0, 398.0, 398.0, 2.512562814070352, 6.460525282663316, 0.6305943781407035], "isController": false}, {"data": ["execute eval string", 5, 0, 0.0, 387.6, 383, 396, 396.0, 396.0, 396.0, 4.170141784820684, 2.3742115825688073, 1.6330340387823186], "isController": false}, {"data": ["delete workflow error", 1, 0, 0.0, 420.0, 420, 420, 420.0, 420.0, 420.0, 2.3809523809523814, 1.1858258928571428, 0.5719866071428572], "isController": false}, {"data": ["Get results 60 evalerror:ba87ff4f-aba1-40c5-a40b-137519edad2d", 1, 0, 0.0, 157.0, 157, 157, 157.0, 157.0, 157.0, 6.369426751592357, 18.840814092356688, 1.604796974522293], "isController": false}, {"data": ["get progress 60 evalerror:6a8c79fc-e4c5-4ba9-9e9c-e1443a1c48f9", 1, 0, 0.0, 401.0, 401, 401, 401.0, 401.0, 401.0, 2.493765586034913, 6.404886221945136, 0.6258767144638404], "isController": false}, {"data": ["Get results 60 evalerror:6a8c79fc-e4c5-4ba9-9e9c-e1443a1c48f9", 1, 0, 0.0, 188.0, 188, 188, 188.0, 188.0, 188.0, 5.319148936170213, 15.739278590425531, 1.3401761968085106], "isController": false}, {"data": ["Get results 0 evalerror:b446aa7a-7344-4b89-9a9a-8cc5f6dc3583", 1, 0, 0.0, 78.0, 78, 78, 78.0, 78.0, 78.0, 12.82051282051282, 33.07792467948718, 3.230168269230769], "isController": false}, {"data": ["get progress 0 evalerror:b446aa7a-7344-4b89-9a9a-8cc5f6dc3583", 1, 0, 0.0, 386.0, 386, 386, 386.0, 386.0, 386.0, 2.5906735751295336, 7.104112694300518, 0.6501983484455959], "isController": false}, {"data": ["execute eval 100", 5, 0, 0.0, 513.2, 465, 582, 582.0, 582.0, 582.0, 3.8284839203675345, 2.149783451378254, 1.4805465160796325], "isController": false}, {"data": ["execute eval 101", 5, 0, 0.0, 380.4, 377, 385, 385.0, 385.0, 385.0, 4.212299915754001, 2.394100147430497, 1.6289753580454929], "isController": false}, {"data": ["get progress 60 evalerror:ba87ff4f-aba1-40c5-a40b-137519edad2d", 1, 0, 0.0, 383.0, 383, 383, 383.0, 383.0, 383.0, 2.6109660574412534, 6.708448922976501, 0.6552912859007832], "isController": false}, {"data": ["get progress 60 evalerror:da76167b-fb52-4144-8f75-9e7c5dad01e5", 1, 0, 0.0, 380.0, 380, 380, 380.0, 380.0, 380.0, 2.631578947368421, 6.761410361842105, 0.6604646381578947], "isController": false}, {"data": ["Get results 0 evalerror:2b4c960e-0031-44af-a720-2acec71f2075", 1, 0, 0.0, 77.0, 77, 77, 77.0, 77.0, 77.0, 12.987012987012989, 33.49482548701299, 3.2721185064935066], "isController": false}, {"data": ["get progress 0 evalerror:2b4c960e-0031-44af-a720-2acec71f2075", 1, 0, 0.0, 209.0, 209, 209, 209.0, 209.0, 209.0, 4.784688995215311, 13.171912380382775, 1.2008447966507179], "isController": false}, {"data": ["get progress 100 evalerror:218c479d-2b8f-4e2d-829b-f4259db7d2c3", 1, 0, 0.0, 396.0, 396, 396, 396.0, 396.0, 396.0, 2.5252525252525255, 6.493154198232323, 0.6337791982323232], "isController": false}, {"data": ["get progress 60 evalerror:ae217e80-3ce7-4070-8ba6-aa0a8f75e6b8", 1, 0, 0.0, 384.0, 384, 384, 384.0, 384.0, 384.0, 2.6041666666666665, 6.69097900390625, 0.6535847981770834], "isController": false}, {"data": ["Get results 0 evalerror:53665793-297a-4708-981e-6fa933c5d1b2", 1, 0, 0.0, 78.0, 78, 78, 78.0, 78.0, 78.0, 12.82051282051282, 33.05288461538461, 3.230168269230769], "isController": false}, {"data": ["create workflow error", 1, 0, 0.0, 587.0, 587, 587, 587.0, 587.0, 587.0, 1.7035775127768313, 0.8567797061328791, 1.310956132879046], "isController": false}, {"data": ["Get results 100 evalerror:b9c55b10-d15f-44f2-bca9-81c8e4228212", 1, 0, 0.0, 160.0, 160, 160, 160.0, 160.0, 160.0, 6.25, 18.499755859375, 1.57470703125], "isController": false}, {"data": ["execute eval -2", 5, 0, 0.0, 379.6, 378, 384, 384.0, 384.0, 384.0, 4.244482173174873, 2.40410123089983, 1.6372758382852293], "isController": false}, {"data": ["get progress 100 evalerror:b1a51db5-032b-451c-b14f-41bc95937546", 1, 0, 0.0, 404.0, 404, 404, 404.0, 404.0, 404.0, 2.4752475247524752, 6.362159653465346, 0.6212291150990099], "isController": false}, {"data": ["Get results 20 evalerror:c6d3683c-2da2-485c-b0e9-9aaf4e1b70de", 1, 0, 0.0, 82.0, 82, 82, 82.0, 82.0, 82.0, 12.195121951219512, 31.500095274390244, 3.0725990853658534], "isController": false}, {"data": ["Get results 60 evalerror:da76167b-fb52-4144-8f75-9e7c5dad01e5", 1, 0, 0.0, 160.0, 160, 160, 160.0, 160.0, 160.0, 6.25, 18.49365234375, 1.57470703125], "isController": false}, {"data": ["Get results 20 evalerror:1d324efd-73a1-426c-b1a3-afb87b3c4d5c", 1, 0, 0.0, 80.0, 80, 80, 80.0, 80.0, 80.0, 12.5, 32.28759765625, 3.1494140625], "isController": false}, {"data": ["get progress 20 evalerror:9cd36071-74bc-4ec2-9b36-5a820d803a8a", 1, 0, 0.0, 391.0, 391, 391, 391.0, 391.0, 391.0, 2.557544757033248, 7.070712116368286, 0.6418837915601022], "isController": false}]}, function(index, item){
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
    createTable($("#top5ErrorsBySamplerTable"), {"supportsControllersDiscrimination": false, "overall": {"data": ["Total", 82, 0, null, null, null, null, null, null, null, null, null, null], "isController": false}, "titles": ["Sample", "#Samples", "#Errors", "Error", "#Errors", "Error", "#Errors", "Error", "#Errors", "Error", "#Errors", "Error", "#Errors"], "items": [{"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}]}, function(index, item){
        return item;
    }, [[0, 0]], 0);

});
