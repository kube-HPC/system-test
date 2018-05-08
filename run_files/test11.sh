#!/bin/bash
#!/usr/bin/env python

jmeter=/home/eitang/WorkStuff/TestManager/apache-jmeter-3.3/bin/jmeter
dashboardPath='/home/eitang/WorkStuff/TestManager/system-tests/run_files/results/dashboards'
filePath='/home/eitang/WorkStuff/TestManager/system-tests/run_files/results/regression.csv'


rm -rf results/dashboards/*
rm results/*.csv

$jmeter -n -t "../tests/done tests/TID_10_1_Define_the_Pipe_Line_input.jmx" -JresultPath="$filePath"
$jmeter -n -t "../tests/done tests/TID_10_2_Define_the_Pipe_Line_input.jmx" -JresultPath="$filePath"


$jmeter -g $filePath" -o "$dashboardPath"



#python getResults.py results/