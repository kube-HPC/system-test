#!/bin/bash
#!/usr/bin/env python

script_dir=$(dirname $0)
dashboardPath=$script_dir'/results/dashboards'
filePath=$script_dir'/results/regression.csv'

cd $script_dir
rm -rf results/dashboards/*
rm results/*.jtl
#jmeter -n -t "../tests/TID/test.jmx" -l "results/resultsFile.jtl" -e -o "results/dashboards/dashboardFile"

jmeter -n -t "../tests/TID/TID_181_1_1apak 100 batch 1thread.jmx" -l "results/TID_181_1_1apak 100 batch 1thread.jtl" -e -o "results/dashboards/TID_181_1_1apak 100 batch 1thread"
sleep 10
jmeter -n -t "../tests/TID/TID_181_1_2apak 100 batch 4threads.jmx" -l "results/TID_181_1_2apak 100 batch 4threads.jtl" -e -o "results/dashboards/TID_181_1_2apak 100 batch 4threads"
sleep 10
jmeter -n -t "../tests/TID/TID_181_1_3_apak 100 8 min batch.jmx" -l "results/TID_181_1_3_apak 100 8 min batch.jtl" -e -o "results/dashboards/TID_181_1_3_apak 100 8 min batch"
sleep 10
jmeter -n -t "../tests/TID/TID_181_1_4apak 100  8 min batch 4threads.jmx" -l "results/TID_181_1_4apak 100  8 min batch 4threads.jtl" -e -o "results/dashboards/TID_181_1_4apak 100  8 min batch 4threads"
sleep 10
jmeter -n -t "../tests/TID/TID_181_2_1apak 500 batch 1thread.jmx" -l "results/TID_181_2_1apak 500 batch 1thread.jtl" -e -o "results/dashboards/TID_181_2_1apak 500 batch 1thread"
sleep 10
jmeter -n -t "../tests/TID/TID_181_2_2apak 500 batch 4 threads.jmx" -l "results/TID_181_2_2apak 500 batch 4 threads.jtl" -e -o "results/dashboards/TID_181_2_2apak 500 batch 4 threads"
sleep 10
jmeter -n -t "../tests/TID/TID_181_2_3apak 500 batch 8min 1thread.jmx" -l "results/TID_181_2_3apak 500 batch 8min 1thread.jtl" -e -o "results/dashboards/TID_181_2_3apak 500 batch 8min 1thread"
sleep 10
jmeter -n -t "../tests/TID/TID_181_2_4apak 500 batch 8min 4thread.jmx" -l "results/TID_181_2_4apak 500 batch 8min 4thread.jtl" -e -o "results/dashboards/TID_181_2_4apak 500 batch 8min 4thread"
sleep 10
jmeter -n -t "../tests/TID/TID_181_3_1apak 1000 batch 1min 1thread.jmx" -l "results/TID_181_3_1apak 1000 batch 1min 1thread.jtl" -e -o "results/dashboards/TID_181_3_1apak 1000 batch 1min 1thread"
sleep 10
jmeter -n -t "../tests/TID/TID_181_3_2apak 1000 batch 4 threads 1min 1thread.jmx" -l "results/TID_181_3_2apak 1000 batch 4 threads 1min 1thread.jtl" -e -o "results/dashboards/TID_181_3_2apak 1000 batch 4 threads 1min 1thread"
sleep 10
jmeter -n -t "../tests/TID/TID_181_3_3apak 1000 batch 8min 1thread.jmx" -l "results/TID_181_3_3apak 1000 batch 8min 1thread.jtl" -e -o "results/dashboards/TID_181_3_3apak 1000 batch 8min 1thread"
sleep 10
jmeter -n -t "../tests/TID/TID_181_3_4apak 1000 batch 8min 4thread.jmx" -l "results/TID_181_3_4apak 1000 batch 8min 4thread.jtl" -e -o "results/dashboards/TID_181_3_4apak 1000 batch 8min 4thread"
sleep 10


python getResults.py results/
