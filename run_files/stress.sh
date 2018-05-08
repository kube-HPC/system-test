#!/bin/bash
#!/usr/bin/env python

jmeter=/home/eitang/WorkStuff/TestManager/apache-jmeter-3.3/bin/jmeter
dashboardPath='/home/eitang/WorkStuff/TestManager/system-tests/run_files/results/dashboards'
filePath='/home/eitang/WorkStuff/TestManager/system-tests/run_files/results/stress.csv'

rm -rf results/dashboards/*
rm results/*.jtl
#$jmeter -n -t "test.jmx" -l "results/resultsFile.jtl" -e -o "results/dashboards/dashboardFile"


$jmeter -n -t "../tests/done tests/TID_100_long runing pipelines and algo.jmx" -JresultPath="$filePath"
sleep 15
$jmeter -n -t "../tests/done tests/TID_180_apak 8M 1000 batch.jmx" -JresultPath="$filePath"
sleep 15
$jmeter -n -t "../tests/done tests/TID_111_fail pods while runing apak.jmx" -JresultPath="$filePath"
sleep 15
$jmeter -n -t "../tests/done tests/TID_190_requests in parallel 10 batch of 2.jmx" -JresultPath="$filePath"
sleep 15
$jmeter -n -t "../tests/done tests/TID_115_max num of algo retries.jmx" -JresultPath="$filePath"
sleep 15
$jmeter -n -t "../tests/done tests/TID_190_1_requests in parallel batch 1000.jmx" -JresultPath="$filePath"



$jmeter -g $filePath" -o "$dashboardPath"