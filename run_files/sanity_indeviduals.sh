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


jmeter -n -t "../tests/TID/TID_113_status_manager.jmx" -l "results/TID_113_status_manager.jtl" -e -o "results/dashboards/TID_113_status_manager"
jmeter -n -t "../tests/TID/TID_490_override_pipeline_options.jmx" -l "results/TID_490_override_pipeline_options.jtl" -e -o "results/dashboards/TID_490_override_pipeline_options"
jmeter -n -t "../tests/TID/TID_460_algo_statuses.jmx" -l "results/TID_460_algo_statuses.jtl" -e -o "results/dashboards/TID_460_algo_statuses"
jmeter -n -t "../tests/TID/TID_480_ttl_test.jmx" -l "results/TID_480_ttl_test.jtl" -e -o "results/dashboards/TID_480_ttl_test"
jmeter -n -t "../tests/TID/TID_430_cron_jobs.jmx" -l "results/TID_430_cron_jobs.jtl" -e -o "results/dashboards/TID_430_cron_jobs"
jmeter -n -t "../tests/TID/TID_430_1_cron_jobs.jmx" -l "results/TID_430_1_cron_jobs.jtl" -e -o "results/dashboards/TID_430_1_cron_jobs"
jmeter -n -t "../tests/TID/TID_50_1_stop_pipeline_that_didnt_start.jmx" -l "results/TID_50_1_stop_pipeline_that_didnt_start.jtl" -e -o "results/dashboards/TID_50_1_stop_pipeline_that_didnt_start"
jmeter -n -t "../tests/TID/TID_50_cancel_pipeline.jmx" -l "results/TID_50_cancel_pipeline.jtl" -e -o "results/dashboards/TID_50_cancel_pipeline"
jmeter -n -t "../tests/TID/TID_300_define_the_order_of_the_pipeline.jmx" -l "results/TID_300_define_the_order_of_the_pipeline.jtl" -e -o "results/dashboards/TID_300_define_the_order_of_the_pipeline"
jmeter -n -t "../tests/TID/TID_420_checkHotPods_continue_running.jmx" -l "results/TID_420_checkHotPods_continue_running.jtl" -e -o "results/dashboards/TID_420_checkHotPods_continue_running"
jmeter -n -t "../tests/TID/TID_371_5000_batch_of_prime.jmx" -l "results/TID_371_5000_batch_of_prime.jtl" -e -o "results/dashboards/TID_371_5000_batch_of_prime"
jmeter -n -t "../tests/TID/TID_390_10X6_requests.jmx" -l "results/TID_390_10X6_requests.jtl" -e -o "results/dashboards/TID_390_10X6_requests"
jmeter -n -t "../tests/TID/TID_380_10pipelinesInParallel.jmx" -l "results/TID_380_10pipelinesInParallel.jtl" -e -o "results/dashboards/TID_380_10pipelinesInParallel"



python getResults.py results/
