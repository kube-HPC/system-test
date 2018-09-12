import csv
import math


class Csvrow:
    def __init__(self, serial, alg1size, alg1batch, alg1priority, alg2size, alg2batch, alg2priority, time, time_to_run,
                 overhead):
        self.serial = serial
        self.alg1size = alg1size
        self.alg1batch = alg1batch
        self.alg1priority = alg1priority
        self.alg2size = alg2size
        self.alg2batch = alg2batch
        self.alg2priority = alg2priority
        self.time = time
        self.time_to_run = time_to_run
        self.overhead = overhead


tiny = 20
small = 12
medium = 6
large = 3


def calc(alg1, size1, alg2, size2, time):
    if alg1 == alg2:
        return (math.ceil((size1 + size2) / alg1)) * time / 1000
    else:
        return (math.ceil(size1 / alg1) + math.ceil(size2 / alg2)) * time / 1000


def algosize(text):
    if text == 'smallalg':
        return small
    elif text == 'mediumalg':
        return medium
    elif text == 'tinyalg':
        return tiny
    else:
        return large


times = []
csvs = []
with open('../testConfigFiles/resourceAllocation.csv', mode='r') as csv_file:
    csv_reader = csv.DictReader(csv_file)
    for row in csv_reader:
        serial = int(row['serial_number'])
        alg1a = float(algosize(row['algorithm1_size']))
        alg1 = row['algorithm1_size']
        size1a = float(row['batch_1_size'])
        alg1priority = float(row['priority_1'])
        alg2a = float(algosize(row['algorithm2_size']))
        alg2 = row ['algorithm2_size']
        size2a = float(row['batch_2_size'])
        alg2priority = float(row['priority_2'])
        time1 = float(row['time'])
        overhead = float(row['overhead_time'])
        # row['time_to_run'] = calc(alg1a, size1a, alg2a, size2a, time1)
        result = calc(alg1a, size1a, alg2a, size2a, time1)
        # print result
        Csvrow
        c = Csvrow(serial, alg1, size1a, alg1priority, alg2, size2a, alg2priority, time1, result, overhead)
        csvs.append(c)
        times.append(result)

        # print alg2a
with open('../testConfigFiles/resourceAllocation.csv', mode='w') as csv_file:
    fieldnames = ['serial_number', 'algorithm1_size', 'batch_1_size', 'priority_1', 'algorithm2_size', 'batch_2_size',
                  'priority_2', 'time', 'time_to_run', 'overhead_time']

    writer = csv.DictWriter(csv_file, fieldnames=fieldnames)
    writer.writeheader()
    for r in csvs:
        writer.writerow({'serial_number': r.serial, 'algorithm1_size': r.alg1size, 'batch_1_size': r.alg1batch,
                         'priority_1': r.alg1priority,
                         'algorithm2_size': r.alg2size, 'batch_2_size': r.alg2batch, 'priority_2': r.alg2priority,
                         'time': r.time,
                         'time_to_run': r.time_to_run, 'overhead_time': r.overhead})

