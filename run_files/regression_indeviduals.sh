#!/bin/bash
#!/usr/bin/env python

mkdir -p results/dashboards
script_dir=$(dirname $0)
dashboardPath=$script_dir'/results/dashboards'
filePath=$script_dir'/results/regression.csv'

cd $script_dir

rm -rf results/dashboards/*
rm results/*.jtl
#jmeter -n -t "../tests/TID/test.jmx" -l "results/resultsFile.jtl" -e -o "results/dashboards/dashboardFile"

# jmeter -n -t "../tests/TID/storeApak.jmx"
jmeter -n -t "../tests/TID/TID_10_1_Define_the_Pipe_Line_input.jmx" -l "results/TID_10_1_Define_the_Pipe_Line_input.jtl" -e -o "results/dashboards/dashTID_10_1_Define_the_Pipe_Line_inputboardFile"
jmeter -n -t "../tests/TID/TID_10_2_Define_the_Pipe_Line_input.jmx" -l "results/TID_10_2_Define_the_Pipe_Line_input.jtl" -e -o "results/dashboards/TID_10_2_Define_the_Pipe_Line_input"
jmeter -n -t "../tests/TID/TID_11_1_Define_the_Pipe_Line order.jmx" -l "results/TID_11_1_Define_the_Pipe_Line order.jtl" -e -o "results/dashboards/TID_11_1_Define_the_Pipe_Line order"
jmeter -n -t "../tests/TID/TID_12_1_Define_the_Pipeline hirarchy.jmx.jmx" -l "results/TID_12_1_Define_the_Pipeline hirarchy.jmx.jtl" -e -o "results/dashboards/TID_12_1_Define_the_Pipeline hirarchy.jmx"
jmeter -n -t "../tests/TID/TID_30_Define_the_pipelineName.jmx" -l "results/TID_30_Define_the_pipelineName.jtl" -e -o "results/dashboards/TID_30_Define_the_pipelineName"
jmeter -n -t "../tests/TID/TID_50_cancel pipeline.jmx" -l "results/TID_50_cancel pipeline.jtl" -e -o "results/dashboards/TID_50_cancel pipeline"
jmeter -n -t "../tests/TID/TID_51_run pipelines in a queue.jmx" -l "results/TID_51_run pipelines in a queue.jtl" -e -o "results/dashboards/TID_51_run pipelines in a queue"
# jmeter -n -t "../tests/TID/TID_70_status Manager.jmx" -l "results/TID_70_status Manager.jtl" -e -o "results/dashboards/TID_70_status Manager"
jmeter -n -t "../tests/TID/TID_80_pipelines run in an order.jmx" -l "results/TID_80_pipelines run in an order.jtl" -e -o "results/dashboards/TID_80_pipelines run in an order"
jmeter -n -t "../tests/TID/TID_114_not exist ids.jmx" -l "results/TID_114_not exist ids.jtl" -e -o "results/dashboards/TID_114_not exist ids"
jmeter -n -t "../tests/TID/TID_113_status manager.jmx" -l "results/TID_113_status manager.jtl" -e -o "results/dashboards/TID_113_status manager"
jmeter -n -t "../tests/TID/TID_110_sevirity levels.jmx" -l "results/TID_110_sevirity levels.jtl" -e -o "results/dashboards/TID_110_sevirity levels"
jmeter -n -t "../tests/TID/TID_170_1_10 percent overhead batch.jmx" -l "results/TID_170_1_10 percent overhead batch.jtl" -e -o "results/dashboards/TID_170_1_10 percent overhead batch"
jmeter -n -t "../tests/TID/TID_170_10 percent overhead.jmx" -l "results/TID_170_10 percent overhead.jtl" -e -o "results/dashboards/TID_170_10 percent overhead"
# jmeter -n -t "../tests/TID/TID_120_system logs.jmx" -l "results/TID_120_system logs.jtl" -e -o "results/dashboards/TID_120_system logs"
jmeter -n -t "../tests/TID/TID_140_algo_writes logs.jmx" -l "results/TID_140_algo_writes logs.jtl" -e -o "results/dashboards/TID_140_algo_writes logs"

python getResults.py results/
