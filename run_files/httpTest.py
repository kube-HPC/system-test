# import requests
# import json
#
# r = requests.get('https://10.32.10.11/hkube/monitor-server/versions.json', auth=('kube', 'ubadmin'), verify=False)
# js = json.loads(r.content)
#
# print (js['systemVersion'])
import csv


def read_from_csvVersion():
    with open('../testConfigFiles/ipConfigs.csv', 'r') as f:
        reader = csv.reader(f)
        # for row in reader:
        #     print (row[0])
        lis = list(reader)
        return lis[1][0]


read_from_csvVersion()
