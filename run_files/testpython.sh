
jmeter=/home/eitang/WorkStuff/TestManager/apache-jmeter-3.3/bin/jmeter


rm -rf results/dashboards/*
rm results/*.jtl

$jmeter -n -t "../tests/done tests/TID_10_1_Define_the_Pipe_Line_input.jmx" -l "results/TID_10_1_Define_the_Pipe_Line_input.jtl" -e -o "results/dashboards/dashTID_10_1_Define_the_Pipe_Line_inputboardFile"
$jmeter -n -t "../tests/done tests/TID_10_2_Define_the_Pipe_Line_input.jmx" -l "results/TID_10_2_Define_the_Pipe_Line_input.jtl" -e -o "results/dashboards/TID_10_2_Define_the_Pipe_Line_input"


python getResults.py results/