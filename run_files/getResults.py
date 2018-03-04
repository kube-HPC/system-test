import csv
import os
import sys
import datetime


try:
    base = sys.argv[1]
except IndexError:
    base = '/home/eitang/WorkStuff/TestManager/system-tests/run_files/results/'


def find_element_pos(filepos, element_text, status):
    r = csv.reader(open(filepos, 'r'))
    lines = list(r)
    found = False
    # print (lines)
    now_time = datetime.datetime.now()
    now_date = now_time.strftime("%d-%m-%Y")
    now_time = now_time.strftime("%H:%M:%S")
    for line in lines:
        if line[2] == element_text:
            found = True
            line[0] = now_date
            line[1] = now_time
            line[3] = status
    if not found:
        lines.append([now_date, now_time, element_text, status])

    writer = csv.writer(open(filepos, 'w'))
    writer.writerows(lines)


def read_from_jtl(filename):
    with open (base+filename, 'r') as f:
        reader = csv.reader(f)
        fail = False
        for row in reader:
            if row[7] == "false":
                # print row[8]
                fail = True
    return fail


def write_to_csv(testname, status):
    now_time = datetime.datetime.now()
    now_date = now_time.strftime("%d-%m-%Y")
    now_time = now_time.strftime("%H:%M:%S")
    with open('results.csv', 'a') as results:
        fieldnames = ['date', 'time', 'test name', 'status']
        writer = csv.DictWriter(results, fieldnames=fieldnames)

        # writer.writeheader()
        writer.writerow({'date': now_date, 'time': now_time, "test name": testname, "status": status})

    # if fail:
    #     print 'test was failed'
    # else:
    #     print 'PASS'



succsess= True
names=[]
for filename in os.listdir(base):
    if filename.endswith(".jtl"):
        now = read_from_jtl(filename)
        if now==True:
            names.append(filename)
            write_to_csv(filename, "fail")
            find_element_pos("results1.csv", filename, "fail")
            succsess=False
        else:
            write_to_csv(filename, "pass")
            find_element_pos("results1.csv", filename, "pass")

        # print (filename)

print '*************'
if succsess==False:
    print "failed"
    for name in names:
        print name

else:
    print "all PASS"
print '*************'