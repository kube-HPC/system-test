import os
import sys

try:
    base = sys.argv[1]
except:
    base = '/home/eitang/WorkStuff/TestManager/system-tests/tests/TID'

file_output = open ("all TID.txt","w")

for filename in os.listdir(base):
    if filename.startswith("TID"):
        print filename
        file_output.write(filename+"\n\n")

file_output.close()

