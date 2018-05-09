import csv
import os
import sys
import datetime
import requests
import json

from requests.packages.urllib3.exceptions import InsecureRequestWarning
requests.packages.urllib3.disable_warnings(InsecureRequestWarning)

all_results = 'all results.csv'
latest_results = 'latest results.csv'


try:
    base = sys.argv[1]
except IndexError:
    base = '/home/eitang/WorkStuff/TestManager/system-tests/run_files/results/'


def get_system_version():
    url = 'https://10.32.10.11/hkube/monitor-server/versions.json'
    r = requests.get(url, auth=('kube', 'ubadmin'), verify=False)
    js = r.json()
    return js['systemVersion']


def find_element_pos(filepos, element_text, status, version):
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
        lines.append([now_date, now_time, element_text, status, version])

    writer = csv.writer(open(filepos, 'w'))
    writer.writerows(lines)


def read_from_jtl(filename):
    with open(base+filename, 'r') as f:
        reader = csv.reader(f)
        fail = False
        for row in reader:
            if row[7] == "false":
                # print row[8]
                fail = True
    return fail

def read_from_csvVersion():
    with open('../testConfigFiles/ipConfigs.csv', 'r') as f:
        reader = csv.reader(f)
        # for row in reader:
        #     print (row[0])
        lis = list(reader)
        return lis[1][0]


def write_to_csv(testname, status, version):
    now_time = datetime.datetime.now()
    now_date = now_time.strftime("%d-%m-%Y")
    now_time = now_time.strftime("%H:%M:%S")
    with open(all_results, 'a') as results:
        fieldnames = ['date', 'time', 'test name', 'status', 'version']
        writer = csv.DictWriter(results, fieldnames=fieldnames)

        # writer.writeheader()
        writer.writerow({'date': now_date, 'time': now_time, "test name": testname, "status": status,
                         'version': version})

    # if fail:
    #     print 'test was failed'
    # else:
    #     print 'PASS'


ver = get_system_version()

succsess = True
names = []
for filename in os.listdir(base):
    if filename.endswith(".jtl"):
        now = read_from_jtl(filename)
        if now:
            names.append(filename)
            write_to_csv(filename, "fail", ver)
            find_element_pos(latest_results, filename, "fail", ver)
            succsess = False
        else:
            write_to_csv(filename, "pass", ver)
            find_element_pos(latest_results, filename, "pass", ver)

        # print (filename)

print ('*************')
if succsess == False:
    print ("failed")
    for name in names:
        print (name)

else:
    print ("all PASS")
print ('*************')
