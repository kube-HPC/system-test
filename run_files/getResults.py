import csv
import os
import sys


try:
    base = sys.argv[1]
except:
    base = '/home/eitang/WorkStuff/TestManager/system-tests/run files/results/'


def read_from_jtl (filename):
    with open (base+filename, 'r') as f:
        reader = csv.reader(f)
        fail = False
        for row in reader:
            if row[7] == "false":
                # print row[8]
                fail = True

    # if fail:
    #     print 'test was failed'
    # else:
    #     print 'PASS'
    return fail


succsess= True
names=[]
for filename in os.listdir(base):
    if filename.endswith(".jtl"):
        now= read_from_jtl(filename)
        if now==True:
            names.append(filename)
            succsess=False

        # print (filename)

print '*************'
if succsess==False:
    print "failed"
    for name in names:
        print name
else:
    print "all PASS"
print '*************'