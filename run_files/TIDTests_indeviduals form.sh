#!/bin/bash
#!/usr/bin/env python


script_dir=$(dirname $0)
dashboardPath=$script_dir'/results/dashboards'
filePath=$script_dir'/results/regression.csv'

cd $script_dir

rm -rf results/dashboards/*
rm results/*.jtl
#jmeter -n -t "test.jmx" -l "results/resultsFile.jtl" -e -o "results/dashboards/dashboardFile"

jmeter -n -t "../tests/done tests/TID_161_7_apak 1000 batch and fail pods http backend.jmx" -l "results/TID_161_7_apak 1000 batch and fail pods http backend.jtl" -e -o "results/dashboards/TID_161_7_apak 1000 batch and fail pods http backend"
sleep 10
jmeter -n -t "../tests/done tests/TID_161_2_apak 1000 batch and fail pods pipeline.jmx" -l "results/TID_161_2_apak 1000 batch and fail pods pipeline.jtl" -e -o "results/dashboards/TID_161_2_apak 1000 batch and fail pods pipeline"
sleep 10
jmeter -n -t "../tests/done tests/TID_161_1_apak 1000 batch and fail pods workers and api serverst.jmx" -l "results/TID_161_1_apak 1000 batch and fail pods workers and api serverst.jtl" -e -o "results/dashboards/TID_161_1_apak 1000 batch and fail pods workers and api serverst"
sleep 10
jmeter -n -t "../tests/done tests/TID_161_8_apak 1000 batch and fail pods webhook.jmx" -l "results/TID_161_8_apak 1000 batch and fail pods webhook.jtl" -e -o "results/dashboards/TID_161_8_apak 1000 batch and fail pods webhook"
sleep 10
jmeter -n -t "../tests/done tests/TID_161_9_apak 1000 batch and fail pods simulator.jmx" -l "results/TID_161_9_apak 1000 batch and fail pods simulator.jtl" -e -o "results/dashboards/TID_161_9_apak 1000 batch and fail pods simulator"
sleep 10
jmeter -n -t "../tests/done tests/TID_161_5_apak 1000 batch and fail pods redis sentinal.jmx" -l "results/TID_161_5_apak 1000 batch and fail pods redis sentinal.jtl" -e -o "results/dashboards/TID_161_5_apak 1000 batch and fail pods redis sentinal"
sleep 10
jmeter -n -t "../tests/done tests/TID_161_3_apak 1000 batch and fail pods etcd.jmx" -l "results/TID_161_3_apak 1000 batch and fail pods etcd.jtl" -e -o "results/dashboards/TID_161_3_apak 1000 batch and fail pods etcd"
sleep 10
jmeter -n -t "../tests/done tests/TID_161_6_apak 1000 batch and fail pods redis server.jmx" -l "results/TID_161_6_apak 1000 batch and fail pods redis server.jtl" -e -o "results/dashboards/TID_161_6_apak 1000 batch and fail pods redis server"
sleep 10
jmeter -n -t "../tests/done tests/TID_161_4_apak 1000 batch and fail pods jaeger.jmx" -l "results/TID_161_4_apak 1000 batch and fail pods jaeger.jtl" -e -o "results/dashboards/TID_161_4_apak 1000 batch and fail pods jaeger"
sleep 10
jmeter -n -t "../tests/done tests/TID_161_10_apak 1000 batch and fail pods monitor server.jmx" -l "results/TID_161_10_apak 1000 batch and fail pods monitor server.jtl" -e -o "results/dashboards/TID_161_10_apak 1000 batch and fail pods monitor server"

python getResults.py results/
