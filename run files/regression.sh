#!/bin/bash
#!/usr/bin/env python

jmeter=/home/eitang/WorkStuff/TestManager/apache-jmeter-3.3/bin/jmeter

rm -rf results/dashboards/*
rm results/*.jtl



$jmeter -n -t "../tests/done tests/done_request with webhook simpleFlow.jmx" -l "results/request with webhook simpleFlow.jtl" -e -o "results/dashboards/request with webhook simpleFlow"
$jmeter -n -t "../tests/done tests/done_get results with wrong id REST.jmx" -l "results/get results with wrong id REST.jtl" -e -o "results/dashboards/get results with wrong id REST"
$jmeter -n -t "../tests/done tests/create2 pipelines and edit one.jmx" -l "results/create2 pipelines and edit one.jtl" -e -o "results/dashboards/create2 pipelines and edit one"
$jmeter -n -t "../tests/done tests/done_cancel a request already done REST.jmx" -l "results/done_cancel a request already done REST.jtl" -e -o "results/dashboards/done_cancel a request already done REST"
$jmeter -n -t "../tests/done tests/done_create request REST.jmx" -l "results/done_create request REST.jtl" -e -o "results/dashboards/done_create request REST"
$jmeter -n -t "../tests/done tests/done_create request wait batch.jmx" -l "results/done_create request wait batch.jtl" -e -o "results/dashboards/done_create request wait batch"
$jmeter -n -t "../tests/done tests/done_create request wait REST.jmx" -l "results/done_create request wait REST.jtl" -e -o "results/dashboards/done_create request wait REST"

python getResults.py results/