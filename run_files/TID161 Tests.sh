#!/bin/bash
#!/usr/bin/env python

jmeter=/home/eitang/WorkStuff/TestManager/apache-jmeter-3.3/bin/jmeter
dashboardPath='/home/eitang/WorkStuff/TestManager/system-tests/run_files/results/dashboards'
filePath='/home/eitang/WorkStuff/TestManager/system-tests/run_files/results/TID161Tests.csv'

rm -rf results/dashboards/*
rm results/*.jtl
#$jmeter -n -t "test.jmx" -l "results/resultsFile.jtl" -e -o "results/dashboards/dashboardFile"

$jmeter -n -t "../tests/done tests/TID_161_7_apak 1000 batch and fail pods http backend.jmx" -JresultPath="$filePath"
sleep 10
$jmeter -n -t "../tests/done tests/TID_161_2_apak 1000 batch and fail pods pipeline.jmx" -JresultPath="$filePath"
sleep 10
$jmeter -n -t "../tests/done tests/TID_161_1_apak 1000 batch and fail pods workers and api serverst.jmx" -JresultPath="$filePath"
sleep 10
$jmeter -n -t "../tests/done tests/TID_161_8_apak 1000 batch and fail pods webhook.jmx" -JresultPath="$filePath"
sleep 10
$jmeter -n -t "../tests/done tests/TID_161_9_apak 1000 batch and fail pods simulator.jmx" -JresultPath="$filePath"
sleep 10
$jmeter -n -t "../tests/done tests/TID_161_5_apak 1000 batch and fail pods redis sentinal.jmx" -JresultPath="$filePath"
sleep 10
$jmeter -n -t "../tests/done tests/TID_161_3_apak 1000 batch and fail pods etcd.jmx" -JresultPath="$filePath"
sleep 10
$jmeter -n -t "../tests/done tests/TID_161_6_apak 1000 batch and fail pods redis server.jmx" -JresultPath="$filePath"
sleep 10
$jmeter -n -t "../tests/done tests/TID_161_4_apak 1000 batch and fail pods jaeger.jmx" -JresultPath="$filePath"
sleep 10
$jmeter -n -t "../tests/done tests/TID_161_10_apak 1000 batch and fail pods monitor server.jmx" -JresultPath="$filePath"

$jmeter -g $filePath" -o "$dashboardPath"
