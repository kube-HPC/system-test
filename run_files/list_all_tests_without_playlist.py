import os
import sys

try:
    flag_file = sys.argv[1]
except IndexError:
    flag_file = 0
try:
    base_tid = sys.argv[2]
except IndexError:
    base_tid = '/home/eitang/WorkStuff/TestManager/system-tests/tests/TID'

try:
    base_files = sys.argv[3]
except IndexError:
    base_files = '/home/eitang/WorkStuff/TestManager/system-tests/run_files'


def list_all_automated_tests():
    list_of_tests = []
    for filename in os.listdir(base_files):
        if filename.__contains__("indeviduals"):
            file_output = open(filename, "r")
            st = file_output.read()
            arr = st.split("\n")
            for a in arr:
                if a.startswith('jmeter'):
                    arr2 = a.split(' ')
                    arr3 = arr2[3].split('/')
                    try:
                        list_of_tests.append(arr3[3][:-1])
                    except IndexError:
                        print ("********cant find index 3 in array", arr3, " file ", filename)
    return list_of_tests


def list_all_tests():
    files = []
    for filename in os.listdir(base_tid):
        if filename.endswith('.jmx'):
            files.append(filename)
    return files


def not_found_tests(all_tests, listed_tests):
    arr = []
    for a in all_tests:
        if a not in listed_tests:
            arr.append(a)
            print (a[:-4])
    return arr


arr = not_found_tests(list_all_tests(), list_all_automated_tests())
arr.sort()

if flag_file:
    file_output = open("not_in_playlist_tests.txt", "w")
    for filename in arr:
        file_output.write(filename + "\n\n")
