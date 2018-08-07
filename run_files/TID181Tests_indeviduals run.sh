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

jmeter -n -t "../tests/TID/TID_181_5_1_eval_500_batch_1_thread_30sec.jmx" -l "results/TID_181_5_1_eval_500_batch_1_thread_30sec.jtl" -e -o "results/dashboards/TID_181_5_1_eval_500_batch_1_thread_30sec"
sleep 10
jmeter -n -t "../tests/TID/TID_181_2_2_eval_500_batch_4_thread_15sec.jmx" -l "results/TID_181_2_2_eval_500_batch_4_thread_15sec.jtl" -e -o "results/dashboards/TID_181_2_2_eval_500_batch_4_thread_15sec"
sleep 10
jmeter -n -t "../tests/TID/TID_181_7_cpu_load.jmx" -l "results/TID_181_7_cpu_load.jtl" -e -o "results/dashboards/TID_181_7_cpu_load"
sleep 10
jmeter -n -t "../tests/TID/TID_181_6_1_eval_1000_batch_1_thread_30sec.jmx" -l "results/TID_181_6_1_eval_1000_batch_1_thread_30sec.jtl" -e -o "results/dashboards/TID_181_6_1_eval_1000_batch_1_thread_30sec"
sleep 10
jmeter -n -t "../tests/TID/TID_181_5_2_eval_500_batch_4_thread_30sec.jmx" -l "results/TID_181_5_2_eval_500_batch_4_thread_30sec.jtl" -e -o "results/dashboards/TID_181_5_2_eval_500_batch_4_thread_30sec"
sleep 10
jmeter -n -t "../tests/TID/TID_181_1_2_eval_100_batch_4_threads_15sec.jmx" -l "results/TID_181_1_2_eval_100_batch_4_threads_15sec.jtl" -e -o "results/dashboards/TID_181_1_2_eval_100_batch_4_threads_15sec"
sleep 10
jmeter -n -t "../tests/TID/TID_181_3_1_eval_1000_batch_1_thread_15sec.jmx" -l "results/TID_181_3_1_eval_1000_batch_1_thread_15sec.jtl" -e -o "results/dashboards/TID_181_3_1_eval_1000_batch_1_thread_15sec"
sleep 10
jmeter -n -t "../tests/TID/TID_181_3_2_eval_1000_batch_4_thread_15sec.jmx" -l "results/TID_181_3_2_eval_1000_batch_4_thread_15sec.jtl" -e -o "results/dashboards/TID_181_3_2_eval_1000_batch_4_thread_15sec"
sleep 10
jmeter -n -t "../tests/TID/TID_181_1_1_eval_100_batch_1_thread_15sec.jmx" -l "results/TID_181_1_1_eval_100_batch_1_thread_15sec.jtl" -e -o "results/dashboards/TID_181_1_1_eval_100_batch_1_thread_15sec"
sleep 10
jmeter -n -t "../tests/TID/TID_181_4_2_eval_100_batch_4_thread_30sec.jmx" -l "results/TID_181_4_2_eval_100_batch_4_thread_30sec.jtl" -e -o "results/dashboards/TID_181_4_2_eval_100_batch_4_thread_30sec"
sleep 10
jmeter -n -t "../tests/TID/TID_181_2_1_eval_500_batch_1_thread_15sec.jmx" -l "results/TID_181_2_1_eval_500_batch_1_thread_15sec.jtl" -e -o "results/dashboards/TID_181_2_1_eval_500_batch_1_thread_15sec"
sleep 10
jmeter -n -t "../tests/TID/TID_181_6_2_eval_1000_batch_4_thread_30sec.jmx" -l "results/TID_181_6_2_eval_1000_batch_4_thread_30sec.jtl" -e -o "results/dashboards/TID_181_6_2_eval_1000_batch_4_thread_30sec"
sleep 10
jmeter -n -t "../tests/TID/TID_181_4_1_eval_100_batch_1_thread_30sec.jmx" -l "results/TID_181_4_1_eval_100_batch_1_thread_30sec.jtl" -e -o "results/dashboards/TID_181_4_1_eval_100_batch_1_thread_30sec"
sleep 10



python getResults.py results/
