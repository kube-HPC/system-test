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
    createTable($("#apdexTable"), {"supportsControllersDiscrimination": true, "overall": {"data": [0.9085365853658537, 500, 1500, "Total"], "isController": false}, "titles": ["Apdex", "T (Toleration threshold)  ", "F (Frustration threshold)", "Label"], "items": [{"data": [1.0, 500, 1500, "get progress 20 evalerror:c2b94cac-b4a5-4d1b-9514-ac3eef167c5a"], "isController": false}, {"data": [1.0, 500, 1500, "get progress 100 evalerror:f80f54ad-3a5b-4e71-8594-bc1e9fa3a3f8"], "isController": false}, {"data": [1.0, 500, 1500, "get progress 100 evalerror:0e5892a8-bf4b-4744-aabf-a60a72f9ffc1"], "isController": false}, {"data": [1.0, 500, 1500, "Get results 60 evalerror:9dbe8825-1d00-40a5-b4fc-155930551cfe"], "isController": false}, {"data": [1.0, 500, 1500, "get progress 60 evalerror:9dbe8825-1d00-40a5-b4fc-155930551cfe"], "isController": false}, {"data": [0.7, 500, 1500, "execute eval 60"], "isController": false}, {"data": [1.0, 500, 1500, "Get results 20 evalerror:f3c9ea28-7812-4908-a45f-62b72a667829"], "isController": false}, {"data": [1.0, 500, 1500, "get progress 60 evalerror:d514cd4c-aec6-4a2a-814b-b54b8a04bfee"], "isController": false}, {"data": [0.6, 500, 1500, "execute eval 20"], "isController": false}, {"data": [1.0, 500, 1500, "Get results 20 evalerror:fecd3baf-003a-433d-a4c7-adc6e2ae5703"], "isController": false}, {"data": [1.0, 500, 1500, "get progress 100 evalerror:3db0c623-8035-4258-adbc-a009e1f82ce6"], "isController": false}, {"data": [1.0, 500, 1500, "get progress 20 evalerror:ec2ffa87-69b7-4a2c-9cec-942b064eddd0"], "isController": false}, {"data": [1.0, 500, 1500, "get progress 100 evalerror:0e111e5f-dbda-4bd9-93cb-568912077c46"], "isController": false}, {"data": [1.0, 500, 1500, "Get results 60 evalerror:2a79fce6-81dd-4bd7-b390-ae164c7d3917"], "isController": false}, {"data": [0.6, 500, 1500, "execute eval 0"], "isController": false}, {"data": [1.0, 500, 1500, "get progress 0 evalerror:22147d01-c9f4-483f-bf33-1e5253ce0155"], "isController": false}, {"data": [1.0, 500, 1500, "Get results 100 evalerror:0e5892a8-bf4b-4744-aabf-a60a72f9ffc1"], "isController": false}, {"data": [1.0, 500, 1500, "get progress 20 evalerror:f3c9ea28-7812-4908-a45f-62b72a667829"], "isController": false}, {"data": [1.0, 500, 1500, "Get results 60 evalerror:4a2119ec-249f-4354-9102-7e77a180bf5d"], "isController": false}, {"data": [1.0, 500, 1500, "execute eval 20.6"], "isController": false}, {"data": [1.0, 500, 1500, "Get results 100 evalerror:f80f54ad-3a5b-4e71-8594-bc1e9fa3a3f8"], "isController": false}, {"data": [1.0, 500, 1500, "Get results 0 evalerror:7a7a3755-976c-4934-bcd6-67cc90116a45"], "isController": false}, {"data": [1.0, 500, 1500, "Get results 20 evalerror:c2b94cac-b4a5-4d1b-9514-ac3eef167c5a"], "isController": false}, {"data": [1.0, 500, 1500, "get progress 60 evalerror:2a79fce6-81dd-4bd7-b390-ae164c7d3917"], "isController": false}, {"data": [1.0, 500, 1500, "execute eval string"], "isController": false}, {"data": [1.0, 500, 1500, "get progress 20 evalerror:fecd3baf-003a-433d-a4c7-adc6e2ae5703"], "isController": false}, {"data": [1.0, 500, 1500, "delete workflow error"], "isController": false}, {"data": [1.0, 500, 1500, "Get results 0 evalerror:5cb32c42-7685-4091-902d-90518f012afd"], "isController": false}, {"data": [1.0, 500, 1500, "Get results 100 evalerror:0e111e5f-dbda-4bd9-93cb-568912077c46"], "isController": false}, {"data": [1.0, 500, 1500, "Get results 20 evalerror:f1b9a417-d035-4817-82b6-25c2e8733493"], "isController": false}, {"data": [1.0, 500, 1500, "get progress 60 evalerror:4a2119ec-249f-4354-9102-7e77a180bf5d"], "isController": false}, {"data": [1.0, 500, 1500, "Get results 100 evalerror:1b90800b-eea6-44ef-863e-bc1eb41b7401"], "isController": false}, {"data": [1.0, 500, 1500, "get progress 0 evalerror:5cb32c42-7685-4091-902d-90518f012afd"], "isController": false}, {"data": [0.7, 500, 1500, "execute eval 100"], "isController": false}, {"data": [1.0, 500, 1500, "execute eval 101"], "isController": false}, {"data": [1.0, 500, 1500, "get progress 0 evalerror:7a7a3755-976c-4934-bcd6-67cc90116a45"], "isController": false}, {"data": [1.0, 500, 1500, "Get results 60 evalerror:6700e088-dbd3-4371-851e-d2d6a448ae63"], "isController": false}, {"data": [1.0, 500, 1500, "get progress 20 evalerror:f1b9a417-d035-4817-82b6-25c2e8733493"], "isController": false}, {"data": [1.0, 500, 1500, "Get results 100 evalerror:3db0c623-8035-4258-adbc-a009e1f82ce6"], "isController": false}, {"data": [1.0, 500, 1500, "Get results 0 evalerror:22147d01-c9f4-483f-bf33-1e5253ce0155"], "isController": false}, {"data": [1.0, 500, 1500, "Get results 20 evalerror:ec2ffa87-69b7-4a2c-9cec-942b064eddd0"], "isController": false}, {"data": [0.5, 500, 1500, "create workflow error"], "isController": false}, {"data": [1.0, 500, 1500, "execute eval -2"], "isController": false}, {"data": [1.0, 500, 1500, "Get results 60 evalerror:d514cd4c-aec6-4a2a-814b-b54b8a04bfee"], "isController": false}, {"data": [1.0, 500, 1500, "get progress 100 evalerror:1b90800b-eea6-44ef-863e-bc1eb41b7401"], "isController": false}, {"data": [1.0, 500, 1500, "Get results 0 evalerror:28c9e191-37b4-45cc-8ecb-fefeaeb6e487"], "isController": false}, {"data": [1.0, 500, 1500, "get progress 0 evalerror:28c9e191-37b4-45cc-8ecb-fefeaeb6e487"], "isController": false}, {"data": [1.0, 500, 1500, "get progress 60 evalerror:6700e088-dbd3-4371-851e-d2d6a448ae63"], "isController": false}, {"data": [1.0, 500, 1500, "get progress 0 evalerror:04958762-3f0c-40ae-a9cd-1d1e7efa9557"], "isController": false}, {"data": [1.0, 500, 1500, "Get results 0 evalerror:04958762-3f0c-40ae-a9cd-1d1e7efa9557"], "isController": false}]}, function(index, item){
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
    createTable($("#statisticsTable"), {"supportsControllersDiscrimination": true, "overall": {"data": ["Total", 82, 0, 0.0, 353.19512195121945, 77, 725, 562.2, 579.0999999999999, 725.0, 1.6556959980616242, 2.6619540746274684, 0.5359203688466664], "isController": false}, "titles": ["Label", "#Samples", "KO", "Error %", "Average", "Min", "Max", "90th pct", "95th pct", "99th pct", "Throughput", "Received", "Sent"], "items": [{"data": ["get progress 20 evalerror:c2b94cac-b4a5-4d1b-9514-ac3eef167c5a", 1, 0, 0.0, 387.0, 387, 387, 387.0, 387.0, 387.0, 2.5839793281653747, 7.121083656330749, 0.6485182493540051], "isController": false}, {"data": ["get progress 100 evalerror:f80f54ad-3a5b-4e71-8594-bc1e9fa3a3f8", 1, 0, 0.0, 391.0, 391, 391, 391.0, 391.0, 391.0, 2.557544757033248, 6.57618686061381, 0.6418837915601022], "isController": false}, {"data": ["get progress 100 evalerror:0e5892a8-bf4b-4744-aabf-a60a72f9ffc1", 1, 0, 0.0, 214.0, 214, 214, 214.0, 214.0, 214.0, 4.672897196261682, 12.010806074766355, 1.1727876752336448], "isController": false}, {"data": ["Get results 60 evalerror:9dbe8825-1d00-40a5-b4fc-155930551cfe", 1, 0, 0.0, 166.0, 166, 166, 166.0, 166.0, 166.0, 6.024096385542169, 17.601656626506024, 1.517789909638554], "isController": false}, {"data": ["get progress 60 evalerror:9dbe8825-1d00-40a5-b4fc-155930551cfe", 1, 0, 0.0, 394.0, 394, 394, 394.0, 394.0, 394.0, 2.5380710659898473, 6.521157201776649, 0.6369963515228426], "isController": false}, {"data": ["execute eval 60", 5, 0, 0.0, 522.6, 463, 574, 574.0, 574.0, 574.0, 3.5790980672870436, 2.009747449892627, 1.3806091177523263], "isController": false}, {"data": ["Get results 20 evalerror:f3c9ea28-7812-4908-a45f-62b72a667829", 1, 0, 0.0, 79.0, 79, 79, 79.0, 79.0, 79.0, 12.658227848101266, 32.64685522151899, 3.189280063291139], "isController": false}, {"data": ["get progress 60 evalerror:d514cd4c-aec6-4a2a-814b-b54b8a04bfee", 1, 0, 0.0, 395.0, 395, 395, 395.0, 395.0, 395.0, 2.5316455696202533, 6.504647943037974, 0.6353837025316456], "isController": false}, {"data": ["execute eval 20", 5, 0, 0.0, 544.8, 473, 589, 589.0, 589.0, 589.0, 3.6153289949385394, 2.0300919649313087, 1.3945849150397687], "isController": false}, {"data": ["Get results 20 evalerror:fecd3baf-003a-433d-a4c7-adc6e2ae5703", 1, 0, 0.0, 84.0, 84, 84, 84.0, 84.0, 84.0, 11.904761904761903, 30.7035900297619, 2.999441964285714], "isController": false}, {"data": ["get progress 100 evalerror:3db0c623-8035-4258-adbc-a009e1f82ce6", 1, 0, 0.0, 411.0, 411, 411, 411.0, 411.0, 411.0, 2.4330900243309004, 6.256177767639903, 0.6106485705596107], "isController": false}, {"data": ["get progress 20 evalerror:ec2ffa87-69b7-4a2c-9cec-942b064eddd0", 1, 0, 0.0, 208.0, 208, 208, 208.0, 208.0, 208.0, 4.807692307692308, 13.197678786057693, 1.2066180889423077], "isController": false}, {"data": ["get progress 100 evalerror:0e111e5f-dbda-4bd9-93cb-568912077c46", 1, 0, 0.0, 401.0, 401, 401, 401.0, 401.0, 401.0, 2.493765586034913, 6.412192175810474, 0.6258767144638404], "isController": false}, {"data": ["Get results 60 evalerror:2a79fce6-81dd-4bd7-b390-ae164c7d3917", 1, 0, 0.0, 155.0, 155, 155, 155.0, 155.0, 155.0, 6.451612903225806, 18.863407258064516, 1.6255040322580645], "isController": false}, {"data": ["execute eval 0", 5, 0, 0.0, 526.8, 438, 570, 570.0, 570.0, 570.0, 3.652300949598247, 2.050852584002922, 1.405279857560263], "isController": false}, {"data": ["get progress 0 evalerror:22147d01-c9f4-483f-bf33-1e5253ce0155", 1, 0, 0.0, 206.0, 206, 206, 206.0, 206.0, 206.0, 4.854368932038835, 13.363736347087379, 1.218332827669903], "isController": false}, {"data": ["Get results 100 evalerror:0e5892a8-bf4b-4744-aabf-a60a72f9ffc1", 1, 0, 0.0, 216.0, 216, 216, 216.0, 216.0, 216.0, 4.62962962962963, 13.545283564814815, 1.166449652777778], "isController": false}, {"data": ["get progress 20 evalerror:f3c9ea28-7812-4908-a45f-62b72a667829", 1, 0, 0.0, 384.0, 384, 384, 384.0, 384.0, 384.0, 2.6041666666666665, 7.176717122395833, 0.6535847981770834], "isController": false}, {"data": ["Get results 60 evalerror:4a2119ec-249f-4354-9102-7e77a180bf5d", 1, 0, 0.0, 170.0, 170, 170, 170.0, 170.0, 170.0, 5.88235294117647, 17.193244485294116, 1.4820772058823528], "isController": false}, {"data": ["execute eval 20.6", 5, 0, 0.0, 386.6, 384, 388, 388.0, 388.0, 388.0, 4.2087542087542085, 2.3961950231481484, 1.6317142781986533], "isController": false}, {"data": ["Get results 100 evalerror:f80f54ad-3a5b-4e71-8594-bc1e9fa3a3f8", 1, 0, 0.0, 204.0, 204, 204, 204.0, 204.0, 204.0, 4.901960784313726, 14.337277879901961, 1.2350643382352942], "isController": false}, {"data": ["Get results 0 evalerror:7a7a3755-976c-4934-bcd6-67cc90116a45", 1, 0, 0.0, 84.0, 84, 84, 84.0, 84.0, 84.0, 11.904761904761903, 30.668712797619047, 2.999441964285714], "isController": false}, {"data": ["Get results 20 evalerror:c2b94cac-b4a5-4d1b-9514-ac3eef167c5a", 1, 0, 0.0, 83.0, 83, 83, 83.0, 83.0, 83.0, 12.048192771084338, 31.061746987951807, 3.035579819277108], "isController": false}, {"data": ["get progress 60 evalerror:2a79fce6-81dd-4bd7-b390-ae164c7d3917", 1, 0, 0.0, 392.0, 392, 392, 392.0, 392.0, 392.0, 2.5510204081632653, 6.554428411989796, 0.6402463329081632], "isController": false}, {"data": ["execute eval string", 5, 0, 0.0, 382.0, 377, 387, 387.0, 387.0, 387.0, 4.2158516020236085, 2.4002358241989885, 1.6509340746205734], "isController": false}, {"data": ["get progress 20 evalerror:fecd3baf-003a-433d-a4c7-adc6e2ae5703", 1, 0, 0.0, 383.0, 383, 383, 383.0, 383.0, 383.0, 2.6109660574412534, 7.195455287206266, 0.6552912859007832], "isController": false}, {"data": ["delete workflow error", 1, 0, 0.0, 410.0, 410, 410, 410.0, 410.0, 410.0, 2.4390243902439024, 1.2147484756097562, 0.5859375], "isController": false}, {"data": ["Get results 0 evalerror:5cb32c42-7685-4091-902d-90518f012afd", 1, 0, 0.0, 78.0, 78, 78, 78.0, 78.0, 78.0, 12.82051282051282, 33.01532451923077, 3.230168269230769], "isController": false}, {"data": ["Get results 100 evalerror:0e111e5f-dbda-4bd9-93cb-568912077c46", 1, 0, 0.0, 182.0, 182, 182, 182.0, 182.0, 182.0, 5.4945054945054945, 16.075721153846153, 1.3843578296703296], "isController": false}, {"data": ["Get results 20 evalerror:f1b9a417-d035-4817-82b6-25c2e8733493", 1, 0, 0.0, 79.0, 79, 79, 79.0, 79.0, 79.0, 12.658227848101266, 32.64685522151899, 3.189280063291139], "isController": false}, {"data": ["get progress 60 evalerror:4a2119ec-249f-4354-9102-7e77a180bf5d", 1, 0, 0.0, 210.0, 210, 210, 210.0, 210.0, 210.0, 4.761904761904763, 12.225632440476192, 1.1951264880952381], "isController": false}, {"data": ["Get results 100 evalerror:1b90800b-eea6-44ef-863e-bc1eb41b7401", 1, 0, 0.0, 221.0, 221, 221, 221.0, 221.0, 221.0, 4.524886877828055, 13.229991515837105, 1.1400593891402715], "isController": false}, {"data": ["get progress 0 evalerror:5cb32c42-7685-4091-902d-90518f012afd", 1, 0, 0.0, 397.0, 397, 397, 397.0, 397.0, 397.0, 2.5188916876574305, 6.9294119962216625, 0.6321827770780856], "isController": false}, {"data": ["execute eval 100", 5, 0, 0.0, 547.0, 477, 725, 725.0, 725.0, 725.0, 3.240440699935191, 1.8195834008425147, 1.2531391769280622], "isController": false}, {"data": ["execute eval 101", 5, 0, 0.0, 388.2, 382, 397, 397.0, 397.0, 397.0, 4.219409282700422, 2.3981408227848102, 1.6317246835443038], "isController": false}, {"data": ["get progress 0 evalerror:7a7a3755-976c-4934-bcd6-67cc90116a45", 1, 0, 0.0, 383.0, 383, 383, 383.0, 383.0, 383.0, 2.6109660574412534, 7.187805972584856, 0.6552912859007832], "isController": false}, {"data": ["Get results 60 evalerror:6700e088-dbd3-4371-851e-d2d6a448ae63", 1, 0, 0.0, 145.0, 145, 145, 145.0, 145.0, 145.0, 6.896551724137931, 20.15086206896552, 1.7376077586206897], "isController": false}, {"data": ["get progress 20 evalerror:f1b9a417-d035-4817-82b6-25c2e8733493", 1, 0, 0.0, 384.0, 384, 384, 384.0, 384.0, 384.0, 2.6041666666666665, 7.174173990885416, 0.6535847981770834], "isController": false}, {"data": ["Get results 100 evalerror:3db0c623-8035-4258-adbc-a009e1f82ce6", 1, 0, 0.0, 147.0, 147, 147, 147.0, 147.0, 147.0, 6.802721088435374, 19.896630527210885, 1.713966836734694], "isController": false}, {"data": ["Get results 0 evalerror:22147d01-c9f4-483f-bf33-1e5253ce0155", 1, 0, 0.0, 80.0, 80, 80, 80.0, 80.0, 80.0, 12.5, 32.2021484375, 3.1494140625], "isController": false}, {"data": ["Get results 20 evalerror:ec2ffa87-69b7-4a2c-9cec-942b064eddd0", 1, 0, 0.0, 80.0, 80, 80, 80.0, 80.0, 80.0, 12.5, 32.23876953125, 3.1494140625], "isController": false}, {"data": ["create workflow error", 1, 0, 0.0, 604.0, 604, 604, 604.0, 604.0, 604.0, 1.6556291390728477, 0.8326650455298014, 1.2740583609271523], "isController": false}, {"data": ["execute eval -2", 5, 0, 0.0, 386.4, 383, 389, 389.0, 389.0, 389.0, 4.205214465937763, 2.381859756097561, 1.6221286269974768], "isController": false}, {"data": ["Get results 60 evalerror:d514cd4c-aec6-4a2a-814b-b54b8a04bfee", 1, 0, 0.0, 149.0, 149, 149, 149.0, 149.0, 149.0, 6.7114093959731544, 19.623007550335572, 1.6909605704697988], "isController": false}, {"data": ["get progress 100 evalerror:1b90800b-eea6-44ef-863e-bc1eb41b7401", 1, 0, 0.0, 223.0, 223, 223, 223.0, 223.0, 223.0, 4.484304932735426, 11.526065022421525, 1.125455437219731], "isController": false}, {"data": ["Get results 0 evalerror:28c9e191-37b4-45cc-8ecb-fefeaeb6e487", 1, 0, 0.0, 77.0, 77, 77, 77.0, 77.0, 77.0, 12.987012987012989, 33.4567775974026, 3.2721185064935066], "isController": false}, {"data": ["get progress 0 evalerror:28c9e191-37b4-45cc-8ecb-fefeaeb6e487", 1, 0, 0.0, 407.0, 407, 407, 407.0, 407.0, 407.0, 2.457002457002457, 6.763955006142506, 0.6166500307125308], "isController": false}, {"data": ["get progress 60 evalerror:6700e088-dbd3-4371-851e-d2d6a448ae63", 1, 0, 0.0, 393.0, 393, 393, 393.0, 393.0, 393.0, 2.544529262086514, 6.5377504770992365, 0.6386172073791349], "isController": false}, {"data": ["get progress 0 evalerror:04958762-3f0c-40ae-a9cd-1d1e7efa9557", 1, 0, 0.0, 402.0, 402, 402, 402.0, 402.0, 402.0, 2.487562189054726, 6.821361940298507, 0.6243198072139303], "isController": false}, {"data": ["Get results 0 evalerror:04958762-3f0c-40ae-a9cd-1d1e7efa9557", 1, 0, 0.0, 82.0, 82, 82, 82.0, 82.0, 82.0, 12.195121951219512, 31.47627667682927, 3.0725990853658534], "isController": false}]}, function(index, item){
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
