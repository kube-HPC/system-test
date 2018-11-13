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


jmeter -n -t "../tests/TID/TID_170_10_percent_overhead.jmx" -l "results/TID_170_10_percent_overhead.jtl" -e -o "results/dashboards/TID_170_10_percent_overhead"




python getResults.py results/
