#!/bin/bash

jmeter=/home/eitang/WorkStuff/TestManager/apache-jmeter-3.3/bin/jmeter


$jmeter -n -t "../tests/done tests/done_request with webhook simpleFlow.jmx" -l "results.jtl"
$jmeter -n -t "../tests/done tests/done_get results with wrong id REST.jmx" -l "results2.jtl"



