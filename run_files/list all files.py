import os
import sys

try:
    base = sys.argv[1]
except:
    base = '/home/eitang/WorkStuff/TestManager/system-tests/tests/TID'

file_output = open ("all TID.txt","w")
files = []
for filename in os.listdir(base):
    if filename.startswith("TID"):
        files.append(filename)
        # print (filename)
        file_output.write(filename+"\n\n")

files.sort()

for a in files:
    print(a)


file_output.close()

