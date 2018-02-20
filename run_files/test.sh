#!/bin/bash
#!/usr/bin/env python

jmeter=/home/eitang/WorkStuff/TestManager/apache-jmeter-3.3/bin/jmeter

rm -rf results/dashboards/*
rm results/*.jtl

$jmeter -n -t "../tests/done tests/done_cancel a request already done REST.jmx" -l "results/test11.jtl" -e -o "results/dashboards/test11"
$jmeter -n -t "../tests/done tests/done_get results with wrong id REST.jmx" -l "results/test112.jtl" -e -o "results/dashboards/test112"

python getResults.py results/