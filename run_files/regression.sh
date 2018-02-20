#!/bin/bash
#!/usr/bin/env python

jmeter=/home/eitang/WorkStuff/TestManager/apache-jmeter-3.3/bin/jmeter

rm -rf results/dashboards/*
rm results/*.jtl
#$jmeter -n -t "test.jmx" -l "results/resultsFile.jtl" -e -o "results/dashboards/dashboardFile"

$jmeter -n -t "../tests/done tests/TID_10_1_Define_the_Pipe_Line_input.jmx" -l "results/TID_10_1_Define_the_Pipe_Line_input.jtl" -e -o "results/dashboards/TID_10_1_Define_the_Pipe_Line_input"
$jmeter -n -t "../tests/done tests/TID_10_2_Define_the_Pipe_Line_input.jmx" -l "results/TID_10_2_Define_the_Pipe_Line_input.jtl" -e -o "results/dashboards/TID_10_2_Define_the_Pipe_Line_input"
$jmeter -n -t "../tests/done tests/TID_30_Define_the_pipelineName.jmx" -l "results/TID_30_Define_the_pipelineName.jtl" -e -o "results/dashboards/TID_30_Define_the_pipelineName"
$jmeter -n -t "../tests/done tests/TID_50_cancel pipeline.jmx" -l "results/TID_50_cancel pipeline.jtl" -e -o "results/dashboards/TID_50_cancel pipeline"
$jmeter -n -t "../tests/done tests/TID_51_run pipelines in a queue.jmx" -l "results/TID_51_run pipelines in a queue.jtl" -e -o "results/dashboards/TID_51_run pipelines in a queue"
$jmeter -n -t "../tests/done tests/TID_70_status Manager.jmx" -l "results/TID_70_status Manager.jtl" -e -o "results/dashboards/TID_70_status Manager"
$jmeter -n -t "../tests/done tests/TID_80_pipelines run in an order.jmx" -l "results/TID_80_pipelines run in an order.jtl" -e -o "results/dashboards/TID_80_pipelines run in an order"
$jmeter -n -t "../tests/done tests/TID_114_not exist ids.jmx" -l "results/TID_114_not exist ids.jtl" -e -o "results/dashboards/TID_114_not exist ids"
$jmeter -n -t "../tests/done tests/TID_113_status manager.jmx" -l "results/TID_113_status manager.jtl" -e -o "results/dashboards/TID_113_status manager"
$jmeter -n -t "../tests/done tests/TID_110_sevirity levels.jmx" -l "results/TID_110_sevirity levels.jtl" -e -o "results/dashboards/TID_110_sevirity levels"
$jmeter -n -t "../tests/done tests/TID_170_1_10 percent overhead batch.jmx" -l "results/TID_170_1_10 percent overhead batch.jtl" -e -o "results/dashboards/TID_170_1_10 percent overhead batch"
$jmeter -n -t "../tests/done tests/TID_170_10 percent overhead.jmx" -l "results/TID_170_10 percent overhead.jtl" -e -o "results/dashboards/TID_170_10 percent overhead"
$jmeter -n -t "../tests/done tests/TID_120_system logs.jmx" -l "results/TID_120_system logs.jtl" -e -o "results/dashboards/TID_120_system logs"

python getResults.py results/