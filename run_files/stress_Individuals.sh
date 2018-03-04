#!/bin/bash
#!/usr/bin/env python

jmeter=/home/eitang/WorkStuff/TestManager/apache-jmeter-3.3/bin/jmeter


rm -rf results/dashboards/*
rm results/*.jtl
#$jmeter -n -t "test.jmx" -l "results/resultsFile.jtl" -e -o "results/dashboards/dashboardFile"


$jmeter -n -t "../tests/done tests/TID_100_long runing pipelines and algo.jmx" -l "results/TID_100_long runing pipelines and algo.jtl" -e -o "results/dashboards/TID_100_long runing pipelines and algo"
sleep 15
$jmeter -n -t "../tests/done tests/TID_180_apak 8M 1000 batch.jmx" -l "results/TID_180_apak 8M 1000 batch.jtl" -e -o "results/dashboards/TID_180_apak 8M 1000 batch"
sleep 15
$jmeter -n -t "../tests/done tests/TID_111_fail pods while runing apak.jmx" -l "results/TID_111_fail pods while runing apak.jtl" -e -o "results/dashboards/TID_111_fail pods while runing apak"
sleep 15
$jmeter -n -t "../tests/done tests/TID_190_requests in parallel 10 batch of 2.jmx" -l "results/TID_190_requests in parallel 10 batch of 2.jtl" -e -o "results/dashboards/TID_190_requests in parallel 10 batch of 2"
sleep 15
$jmeter -n -t "../tests/done tests/TID_115_max num of algo retries.jmx" -l "results/TID_115_max num of algo retries.jtl" -e -o "results/dashboards/TID_115_max num of algo retries"
sleep 15
$jmeter -n -t "../tests/done tests/TID_190_1_requests in parallel batch 1000.jmx" -l "results/TID_190_1_requests in parallel batch 1000.jtl" -e -o "results/dashboards/TID_190_1_requests in parallel batch 1000"

python getResults.py results/