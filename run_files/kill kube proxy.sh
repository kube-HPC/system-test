#!/bin/bash

pid=`ps ax | grep -i 'kubectl' | grep -v grep | awk '{print $1}'`

kill -9 $pid
