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
jmeter -n -t "../tests/TID/TID_10_1_Define_the_Pipe_Line_input.jmx" -l "results/TID_10_1_Define_the_Pipe_Line_input.jtl" -e -o "results/dashboards/dashTID_10_1_Define_the_Pipe_Line_input"
jmeter -n -t "../tests/TID/TID_10_2_Define_the_Pipe_Line_input.jmx" -l "results/TID_10_2_Define_the_Pipe_Line_input.jtl" -e -o "results/dashboards/TID_10_2_Define_the_Pipe_Line_input"
jmeter -n -t "../tests/TID/TID_11_1_Define_the_Pipe_Line_order.jmx" -l "results/TID_11_1_Define_the_Pipe_Line_order.jtl" -e -o "results/dashboards/TID_11_1_Define_the_Pipe_Line_order"
jmeter -n -t "../tests/TID/TID_12_1_Define_the_Pipeline_hirarchy.jmx" -l "results/TID_12_1_Define_the_Pipeline_hirarchy.jmx.jtl" -e -o "results/dashboards/TID_12_1_Define_the_Pipeline_hirarchy.jmx"
jmeter -n -t "../tests/TID/TID_30_Define_the_pipelineName.jmx" -l "results/TID_30_Define_the_pipelineName.jtl" -e -o "results/dashboards/TID_30_Define_the_pipelineName"
jmeter -n -t "../tests/TID/TID_50_cancel_pipeline.jmx" -l "results/TID_50_cancel_pipeline.jtl" -e -o "results/dashboards/TID_50_cancel_pipeline"
jmeter -n -t "../tests/TID/TID_51_run_pipelines_in_a_queue.jmx" -l "results/TID_51_run_pipelines_in_a_queue.jtl" -e -o "results/dashboards/TID_51_run_pipelines_in_a_queue"
# jmeter -n -t "../tests/TID/TID_70_status Manager.jmx" -l "results/TID_70_status Manager.jtl" -e -o "results/dashboards/TID_70_status Manager"
# jmeter -n -t "../tests/TID/TID_80_pipelines run in an order.jmx" -l "results/TID_80_pipelines run in an order.jtl" -e -o "results/dashboards/TID_80_pipelines run in an order"
jmeter -n -t "../tests/TID/TID_114_not_exist_ids.jmx" -l "results/TID_114_not_exist_ids.jtl" -e -o "results/dashboards/TID_114_not_exist_ids"
jmeter -n -t "../tests/TID/TID_113_status_manager.jmx" -l "results/TID_113_status_manager.jtl" -e -o "results/dashboards/TID_113_status_manager"
jmeter -n -t "../tests/TID/TID_110_sevirity_levels.jmx" -l "results/TID_110_sevirity_levels.jtl" -e -o "results/dashboards/TID_110_sevirity_levels"
jmeter -n -t "../tests/TID/TID_170_1_10_percent_overhead_batch.jmx" -l "results/TID_170_1_10_percent_overhead_batch.jtl" -e -o "results/dashboards/TID_170_1_10_percent_overhead_batch"
jmeter -n -t "../tests/TID/TID_170_10_percent_overhead.jmx" -l "results/TID_170_10_percent_overhead.jtl" -e -o "results/dashboards/TID_170_10_percent_overhead"
# jmeter -n -t "../tests/TID/TID_120_system logs.jmx" -l "results/TID_120_system logs.jtl" -e -o "results/dashboards/TID_120_system logs"
jmeter -n -t "../tests/TID/TID_140_algo_writes_logs.jmx" -l "results/TID_140_algo_writes_logs.jtl" -e -o "results/dashboards/TID_140_algo_writes_logs"

python getResults.py results/
