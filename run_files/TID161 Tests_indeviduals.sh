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

jmeter -n -t "../tests/TID/TID_161_12_eval_batch_fail_the_api_server.jmx" -l "results/TID_161_12_eval_batch_fail_the_api_server.jtl" -e -o "results/dashboards/TID_161_12_eval_batch_fail_the_api_server"
sleep 10
jmeter -n -t "../tests/TID/TID_161_23_eval_batch_and_fail_es_data.jmx" -l "results/TID_161_23_eval_batch_and_fail_es_data.jtl" -e -o "results/dashboards/TID_161_23_eval_batch_and_fail_es_data"
sleep 10
jmeter -n -t "../tests/TID/TID_161_13_eval_batch_and_fail_worker_pods.jmx" -l "results/TID_161_13_eval_batch_and_fail_worker_pods.jtl" -e -o "results/dashboards/TID_161_13_eval_batch_and_fail_worker_pods"
sleep 10
jmeter -n -t "../tests/TID/TID_161_31_eval_and_fail_prometheus.jmx" -l "results/TID_161_31_eval_and_fail_prometheus.jtl" -e -o "results/dashboards/TID_161_31_eval_and_fail_prometheus"
sleep 10
jmeter -n -t "../tests/TID/TID_161_25_eval_batch_and_fail_es_master.jmx" -l "results/TID_161_25_eval_batch_and_fail_es_master.jtl" -e -o "results/dashboards/TID_161_25_eval_batch_and_fail_es_master"
sleep 10
jmeter -n -t "../tests/TID/TID_161_18_eval_batch_and_fail_pods_redis_server.jmx" -l "results/TID_161_18_eval_batch_and_fail_pods_redis_server.jtl" -e -o "results/dashboards/TID_161_18_eval_batch_and_fail_pods_redis_server"
sleep 10
jmeter -n -t "../tests/TID/TID_161_14_eval_batch_and_fail_pods_pipeline.jmx" -l "results/TID_161_14_eval_batch_and_fail_pods_pipeline.jtl" -e -o "results/dashboards/TID_161_14_eval_batch_and_fail_pods_pipeline"
sleep 10
jmeter -n -t "../tests/TID/TID_161_24_eval_batch_and_fail_es_client.jmx" -l "results/TID_161_24_eval_batch_and_fail_es_client.jtl" -e -o "results/dashboards/TID_161_24_eval_batch_and_fail_es_client"
sleep 10
jmeter -n -t "../tests/TID/TID_161_16_eval_batch_and_fail_jaeger.jmx" -l "results/TID_161_16_eval_batch_and_fail_jaeger.jtl" -e -o "results/dashboards/TID_161_16_eval_batch_and_fail_jaeger"
sleep 10
jmeter -n -t "../tests/TID/TID_161_22_eval_batch_and_fail_pods_monitor_server.jmx" -l "results/TID_161_22_eval_batch_and_fail_pods_monitor_server.jtl" -e -o "results/dashboards/TID_161_22_eval_batch_and_fail_pods_monitor_server"
sleep 10
jmeter -n -t "../tests/TID/TID_161_29_eval_batch_and_fail_kube-dns.jmx" -l "results/TID_161_29_eval_batch_and_fail_kube-dns.jtl" -e -o "results/dashboards/TID_161_29_eval_batch_and_fail_kube-dns"
sleep 10
jmeter -n -t "../tests/TID/TID_161_26_eval_batch_and_fail_kibana.jmx" -l "results/TID_161_26_eval_batch_and_fail_kibana.jtl" -e -o "results/dashboards/TID_161_26_eval_batch_and_fail_kibana"
sleep 10
jmeter -n -t "../tests/TID/TID_161_27_eval_batch_and_fail_kubernetes_dashboard.jmx" -l "results/TID_161_27_eval_batch_and_fail_kubernetes_dashboard.jtl" -e -o "results/dashboards/TID_161_27_eval_batch_and_fail_kubernetes_dashboard"
sleep 10
jmeter -n -t "../tests/TID/TID_161_27_eval_batch_and_fail_kubernetes_dashboard.jmx" -l "results/TID_161_27_eval_batch_and_fail_kubernetes_dashboard.jtl" -e -o "results/dashboards/TID_161_27_eval_batch_and_fail_kubernetes_dashboard"
sleep 10
jmeter -n -t "../tests/TID/TID_161_34_eval_and_fail_resource_manager.jmx" -l "results/TID_161_34_eval_and_fail_resource_manager.jtl" -e -o "results/dashboards/TID_161_34_eval_and_fail_resource_manager"
sleep 10
jmeter -n -t "../tests/TID/TID_161_32_eval_and_fail_trigger_service.jmx" -l "results/TID_161_32_eval_and_fail_trigger_service.jtl" -e -o "results/dashboards/TID_161_32_eval_and_fail_trigger_service"
sleep 10
jmeter -n -t "../tests/TID/TID_161_36_eval_and_fail_algorithm_operator.jmx" -l "results/TID_161_36_eval_and_fail_algorithm_operator.jtl" -e -o "results/dashboards/TID_161_36_eval_and_fail_algorithm_operator"
sleep 10
jmeter -n -t "../tests/TID/TID_161_19_eval_batch_and_fail_pods_http_backend.jmx" -l "results/TID_161_19_eval_batch_and_fail_pods_http_backend.jtl" -e -o "results/dashboards/TID_161_19_eval_batch_and_fail_pods_http_backend"
sleep 10
jmeter -n -t "../tests/TID/TID_161_15_eval_batch_and_fail_pods_etcd.jmx" -l "results/TID_161_15_eval_batch_and_fail_pods_etcd.jtl" -e -o "results/dashboards/TID_161_15_eval_batch_and_fail_pods_etcd"
sleep 10
jmeter -n -t "../tests/TID/TID_161_28_eval_batch_and_fail_kubedns-autoscalar.jmx" -l "results/TID_161_28_eval_batch_and_fail_kubedns-autoscalar.jtl" -e -o "results/dashboards/TID_161_28_eval_batch_and_fail_kubedns-autoscalar"
sleep 10
jmeter -n -t "../tests/TID/TID_161_17_eval_batch_and_fail_pods_redis_sentinal.jmx" -l "results/TID_161_17_eval_batch_and_fail_pods_redis_sentinal.jtl" -e -o "results/dashboards/TID_161_17_eval_batch_and_fail_pods_redis_sentinal"
sleep 10
jmeter -n -t "../tests/TID/TID_161_33_eval_and_fail_task_executor.jmx" -l "results/TID_161_33_eval_and_fail_task_executor.jtl" -e -o "results/dashboards/TID_161_33_eval_and_fail_task_executor"
sleep 10
jmeter -n -t "../tests/TID/TID_161_21_eval_batch_and_fail_pods_simulator.jmx" -l "results/TID_161_21_eval_batch_and_fail_pods_simulator.jtl" -e -o "results/dashboards/TID_161_21_eval_batch_and_fail_pods_simulator"
sleep 10
jmeter -n -t "../tests/TID/TID_161_21_eval_batch_and_fail_pods_simulator.jmx" -l "results/TID_161_21_eval_batch_and_fail_pods_simulator.jtl" -e -o "results/dashboards/TID_161_21_eval_batch_and_fail_pods_simulator"
sleep 10
jmeter -n -t "../tests/TID/TID_161_30_eval_and_fail_algo_queue.jmx" -l "results/TID_161_30_eval_and_fail_algo_queue.jtl" -e -o "results/dashboards/TID_161_30_eval_and_fail_algo_queue"
sleep 10
jmeter -n -t "../tests/TID/TID_161_35_eval_and_fail_pipeline_driver_queue.jmx" -l "results/TID_161_35_eval_and_fail_pipeline_driver_queue.jtl" -e -o "results/dashboards/TID_161_35_eval_and_fail_pipeline_driver_queue"
sleep 10


python getResults.py results/
