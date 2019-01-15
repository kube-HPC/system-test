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

jmeter -n -t "../tests/TID/TID_111_fail_pods_while_running_eval.jmx" -l "results/TID_111_fail_pods_while_running_eval.jtl" -e -o "results/dashboards/TID_111_fail_pods_while_running_eval"
jmeter -n -t "../tests/TID/TID_113_status_manager.jmx" -l "results/TID_113_status_manager.jtl" -e -o "results/dashboards/TID_113_status_manager"
jmeter -n -t "../tests/TID/TID_115_max_num_of_algo_retries.jmx" -l "results/TID_115_max_num_of_algo_retries.jtl" -e -o "results/dashboards/TID_115_max_num_of_algo_retries"


# jmeter -n -t "../tests/TID/TID_170_10_percent_overhead.jmx" -l "results/TID_170_10_percent_overhead.jtl" -e -o "results/dashboards/TID_170_10_percent_overhead"
# jmeter -n -t "../tests/TID/TID_170_10_percent_overhead10sec_1000times.jmx" -l "results/TID_170_10_percent_overhead10sec_1000times.jtl" -e -o "results/dashboards/TID_170_10_percent_overhead10sec_1000times"
# jmeter -n -t "../tests/TID/TID_170_10_percent_overhead10sec_100times.jmx" -l "results/TID_170_10_percent_overhead10sec_100times.jtl" -e -o "results/dashboards/TID_170_10_percent_overhead10sec_100times"
# jmeter -n -t "../tests/TID/TID_170_10_percent_overhead10sec_10times.jmx" -l "results/TID_170_10_percent_overhead10sec_10times.jtl" -e -o "results/dashboards/TID_170_10_percent_overhead10sec_10times"
# jmeter -n -t "../tests/TID/TID_170_10_percent_overhead10sec_500times.jmx" -l "results/TID_170_10_percent_overhead10sec_500times.jtl" -e -o "results/dashboards/TID_170_10_percent_overhead10sec_500times"
# jmeter -n -t "../tests/TID/TID_170_10_percent_overhead60sec_1000times.jmx" -l "results/TID_170_10_percent_overhead60sec_1000times.jtl" -e -o "results/dashboards/TID_170_10_percent_overhead60sec_1000times"
# jmeter -n -t "../tests/TID/TID_170_10_percent_overhead60sec_100times.jmx" -l "results/TID_170_10_percent_overhead60sec_100times.jtl" -e -o "results/dashboards/TID_170_10_percent_overhead60sec_100times"
# jmeter -n -t "../tests/TID/TID_170_10_percent_overhead60sec_10times.jmx" -l "results/TID_170_10_percent_overhead60sec_10times.jtl" -e -o "results/dashboards/TID_170_10_percent_overhead60sec_10times"
# jmeter -n -t "../tests/TID/TID_170_10_percent_overhead60sec_500times.jmx" -l "results/TID_170_10_percent_overhead60sec_500times.jtl" -e -o "results/dashboards/TID_170_10_percent_overhead60sec_500times"
# jmeter -n -t "../tests/TID/TID_170_1_10_percent_overhead_batch.jmx" -l "results/TID_170_1_10_percent_overhead_batch.jtl" -e -o "results/dashboards/TID_170_1_10_percent_overhead_batch"


jmeter -n -t "../tests/TID/TID_182_1_burst_test_batchSize.jmx" -l "results/TID_182_1_burst_test_batchSize.jtl" -e -o "results/dashboards/TID_182_1_burst_test_batchSize"
jmeter -n -t "../tests/TID/TID_182_2_burst_test_time.jmx" -l "results/TID_182_2_burst_test_time.jtl" -e -o "results/dashboards/TID_182_2_burst_test_time"
jmeter -n -t "../tests/TID/TID_182_3_burst_test_pipeline_increase.jmx" -l "results/TID_182_3_burst_test_pipeline_increase.jtl" -e -o "results/dashboards/TID_182_3_burst_test_pipeline_increase"
jmeter -n -t "../tests/TID/TID_183_1_burst_test2_batchSize.jmx" -l "results/TID_183_1_burst_test2_batchSize.jtl" -e -o "results/dashboards/TID_183_1_burst_test2_batchSize"
jmeter -n -t "../tests/TID/TID_183_2_burst_test2_time.jmx" -l "results/TID_183_2_burst_test2_time.jtl" -e -o "results/dashboards/TID_183_2_burst_test2_time"
jmeter -n -t "../tests/TID/TID_183_3_burst_test2_pipeline_increase.jmx" -l "results/TID_183_3_burst_test2_pipeline_increase.jtl" -e -o "results/dashboards/TID_183_3_burst_test2_pipeline_increase"
# jmeter -n -t "../tests/TID/TID_203_1_monitoring.jmx" -l "results/TID_203_1_monitoring.jtl" -e -o "results/dashboards/TID_203_1_monitoring"


# jmeter -n -t "../tests/TID/TID_205_algorithm_monitoring.jmx" -l "results/TID_205_algorithm_monitoring.jtl" -e -o "results/dashboards/TID_205_algorithm_monitoring"
# jmeter -n -t "../tests/TID/TID_206_pipeline_monitoring.jmx" -l "results/TID_206_pipeline_monitoring.jtl" -e -o "results/dashboards/TID_206_pipeline_monitoring"
jmeter -n -t "../tests/TID/TID_300_define_the_order_of_the_pipeline.jmx" -l "results/TID_300_define_the_order_of_the_pipeline.jtl" -e -o "results/dashboards/TID_300_define_the_order_of_the_pipeline"
jmeter -n -t "../tests/TID/TID_371_5000_batch_of_prime.jmx" -l "results/TID_371_5000_batch_of_prime.jtl" -e -o "results/dashboards/TID_371_5000_batch_of_prime"
sleep 20
jmeter -n -t "../tests/TID/TID_380_10pipelinesInParallel.jmx" -l "results/TID_380_10pipelinesInParallel.jtl" -e -o "results/dashboards/TID_380_10pipelinesInParallel"
# jmeter -n -t "../tests/TID/TID_390_10X6_requests.jmx" -l "results/TID_390_10X6_requests.jtl" -e -o "results/dashboards/TID_390_10X6_requests"
jmeter -n -t "../tests/TID/TID_400_manyBytes.jmx" -l "results/TID_400_manyBytes.jtl" -e -o "results/dashboards/TID_400_manyBytes"
jmeter -n -t "../tests/TID/TID_420_checkHotPods_continue_running.jmx" -l "results/TID_420_checkHotPods_continue_running.jtl" -e -o "results/dashboards/TID_420_checkHotPods_continue_running"
jmeter -n -t "../tests/TID/TID_430_1_cron_jobs.jmx" -l "results/TID_430_1_cron_jobs.jtl" -e -o "results/dashboards/TID_430_1_cron_jobs"
jmeter -n -t "../tests/TID/TID_430_cron_jobs.jmx" -l "results/TID_430_cron_jobs.jtl" -e -o "results/dashboards/TID_430_cron_jobs"
jmeter -n -t "../tests/TID/TID_440_1_pipelines_by_priority.jmx" -l "results/TID_440_1_pipelines_by_priority.jtl" -e -o "results/dashboards/TID_440_1_pipelines_by_priority"
jmeter -n -t "../tests/TID/TID_440_2_pipelines_by_batch_size.jmx" -l "results/TID_440_2_pipelines_by_batch_size.jtl" -e -o "results/dashboards/TID_440_2_pipelines_by_batch_size"
jmeter -n -t "../tests/TID/TID_440_3_pipelines_by_batch_size_and_priority.jmx" -l "results/TID_440_3_pipelines_by_batch_size_and_priority.jtl" -e -o "results/dashboards/TID_440_3_pipelines_by_batch_size_and_priority"
jmeter -n -t "../tests/TID/TID_440_4_pipelines_by_batch_size_and_check_resources.jmx" -l "results/TID_440_4_pipelines_by_batch_size_and_check_resources.jtl" -e -o "results/dashboards/TID_440_4_pipelines_by_batch_size_and_check_resources"
jmeter -n -t "../tests/TID/TID_440_5_pipelines_by_priority_after_lower_priority_takes_all_resources.jmx" -l "results/TID_440_5_pipelines_by_priority_after_lower_priority_takes_all_resources.jtl" -e -o "results/dashboards/TID_440_5_pipelines_by_priority_after_lower_priority_takes_all_resources"
jmeter -n -t "../tests/TID/TID_440_6_different_priority_same_algorithm.jmx" -l "results/TID_440_6_different_priority_same_algorithm.jtl" -e -o "results/dashboards/TID_440_6_different_priority_same_algorithm"
# jmeter -n -t "../tests/TID/TID_440_6_use_all_resources_and_check_stopping_for_workers.jmx" -l "results/TID_440_6_use_all_resources_and_check_stopping_for_workers.jtl" -e -o "results/dashboards/TID_440_6_use_all_resources_and_check_stopping_for_workers"
jmeter -n -t "../tests/TID/TID_440_7_same_priority_same_algorithm.jmx" -l "results/TID_440_7_same_priority_same_algorithm.jtl" -e -o "results/dashboards/TID_440_7_same_priority_same_algorithm"
jmeter -n -t "../tests/TID/TID_440_8_starvationTest.jmx" -l "results/TID_440_8_starvationTest.jtl" -e -o "results/dashboards/TID_440_8_starvationTest"
# jmeter -n -t "../tests/TID/TID_450_1_pipeline_multy_trigger.jmx" -l "results/TID_450_1_pipeline_multy_trigger.jtl" -e -o "results/dashboards/TID_450_1_pipeline_multy_trigger"
# jmeter -n -t "../tests/TID/TID_450_2_pipeline_multy_trigger_array.jmx" -l "results/TID_450_2_pipeline_multy_trigger_array.jtl" -e -o "results/dashboards/TID_450_2_pipeline_multy_trigger_array"
# jmeter -n -t "../tests/TID/TID_450_pipeline_trigger.jmx" -l "results/TID_450_pipeline_trigger.jtl" -e -o "results/dashboards/TID_450_pipeline_trigger"
jmeter -n -t "../tests/TID/TID_460_algo_statuses.jmx" -l "results/TID_460_algo_statuses.jtl" -e -o "results/dashboards/TID_460_algo_statuses"
jmeter -n -t "../tests/TID/TID_470_dismiss_resources.jmx" -l "results/TID_470_dismiss_resources.jtl" -e -o "results/dashboards/TID_470_dismiss_resources"
jmeter -n -t "../tests/TID/TID_480_ttl_test.jmx" -l "results/TID_480_ttl_test.jtl" -e -o "results/dashboards/TID_480_ttl_test"
jmeter -n -t "../tests/TID/TID_490_override_pipeline_options.jmx" -l "results/TID_490_override_pipeline_options.jtl" -e -o "results/dashboards/TID_490_override_pipeline_options"
jmeter -n -t "../tests/TID/TID_500_not_existing_algo_name_in_pipeline.jmx" -l "results/TID_500_not_existing_algo_name_in_pipeline.jtl" -e -o "results/dashboards/TID_500_not_existing_algo_name_in_pipeline"
jmeter -n -t "../tests/TID/TID_50_1_stop_pipeline_that_didnt_start.jmx" -l "results/TID_50_1_stop_pipeline_that_didnt_start.jtl" -e -o "results/dashboards/TID_50_1_stop_pipeline_that_didnt_start"
jmeter -n -t "../tests/TID/TID_50_cancel_pipeline.jmx" -l "results/TID_50_cancel_pipeline.jtl" -e -o "results/dashboards/TID_50_cancel_pipeline"
jmeter -n -t "../tests/TID/TID_510_no_input_in_pipeline_descriptor.jmx" -l "results/TID_510_no_input_in_pipeline_descriptor.jtl" -e -o "results/dashboards/TID_510_no_input_in_pipeline_descriptor"
jmeter -n -t "../tests/TID/TID_51_run_pipelines_in_a_queue.jmx" -l "results/TID_51_run_pipelines_in_a_queue.jtl" -e -o "results/dashboards/TID_51_run_pipelines_in_a_queue"
jmeter -n -t "../tests/TID/TID_520_different_chars_in_names_of_algo_and_pipelines.jmx" -l "results/TID_520_different_chars_in_names_of_algo_and_pipelines.jtl" -e -o "results/dashboards/TID_520_different_chars_in_names_of_algo_and_pipelines"
jmeter -n -t "../tests/TID/TID_530_delete_algorithms_test.jmx" -l "results/TID_530_delete_algorithms_test.jtl" -e -o "results/dashboards/TID_530_delete_algorithms_test"
jmeter -n -t "../tests/TID/TID_540_big_batch.jmx" -l "results/TID_540_big_batch.jtl" -e -o "results/dashboards/TID_540_big_batch"
jmeter -n -t "../tests/TID/TID_550_empty_array_for_batch.jmx" -l "results/TID_550_empty_array_for_batch.jtl" -e -o "results/dashboards/TID_550_empty_array_for_batch"
jmeter -n -t "../tests/TID/TID_560_one_worker_start.jmx" -l "results/TID_560_one_worker_start.jtl" -e -o "results/dashboards/TID_560_one_worker_start"
jmeter -n -t "../tests/TID/TID_100_long_running_pipelines_and_algo.jmx" -l "results/TID_100_long_running_pipelines_and_algo.jtl" -e -o "results/dashboards/TID_100_long_running_pipelines_and_algo"

python getResults.py results/




