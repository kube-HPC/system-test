#!/bin/bash

jmeter=/home/eitang/WorkStuff/TestManager/apache-jmeter-3.3/bin/jmeter

rm -rf results/dashboards/test1/*
rm "results/create2 pipelines and edit one.jtl"
$jmeter -n -t "../tests/done tests/create2 pipelines and edit one.jmx" -l "results/create2 pipelines and edit one.jtl" -e -o "results/dashboards/test1"
