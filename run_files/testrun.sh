#!/bin/bash


# jmeter=/home/eitang/WorkStuff/TestManager/apache-jmeter-3.3/bin/jmeter

script_dir=$(dirname $0)

echo $script_dir
dashboardPath=$script_dir'/results/dashboards'
filePath=$script_dir'/results/regression.csv'


# rm -rf results/dashboards/*lts/TID_10_1_Define_the_Pipe_
# rm results/*.jtl
# #$jmeter -n -t "test.jmx" -l "results/resultsFile.jtl" -e -o "results/dashboards/dashboardFile"
cd $script_dir
jmeter -n -t "../tests/TID/TID_10_1_Define_the_Pipe_Line_input.jmx" -JresultPath="$filePath"
# $jmeter -n -t "../tests/TID/TID_10_2_Define_the_Pipe_Line_input.jmx" -JresultPath="$filePath"
# $jmeter -n -t "../tests/TID/TID_30_Define_the_pipelineName.jmx" -JresultPath="$filePath"
# $jmeter -n -t "../tests/TID/TID_50_cancel pipeline.jmx" -JresultPath="$filePath"
# $jmeter -n -t "../tests/TID/TID_51_run pipelines in a queue.jmx" -JresultPath="$filePath"
# $jmeter -n -t "../tests/TID/TID_70_status Manager.jmx" -JresultPath="$filePath"
# $jmeter -n -t "../tests/TID/TID_80_pipelines run in an order.jmx" -JresultPath="$filePath"
# $jmeter -n -t "../tests/TID/TID_114_not exist ids.jmx" -JresultPath="$filePath"
# $jmeter -n -t "../tests/TID/TID_113_status manager.jmx" -JresultPath="$filePath"
# $jmeter -n -t "../tests/TID/TID_110_sevirity levels.jmx" -JresultPath="$filePath"
# $jmeter -n -t "../tests/TID/TID_170_1_10 percent overhead batch.jmx" -JresultPath="$filePath"
# $jmeter -n -t "../tests/TID/TID_170_10 percent overhead.jmx" -JresultPath="$filePath"
# $jmeter -n -t "../tests/TID/TID_120_system logs.jmx" -JresultPath="$filePath"


# jmeter -g $filePath" -o "$dashboardPath"
