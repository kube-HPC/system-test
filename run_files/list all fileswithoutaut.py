import os
import sys

# try:
#     base = sys.argv[1]
# except:
#     base = '/home/eitang/WorkStuff/TestManager/system-tests/tests/TID'

# file_output = open("all TID not automated.txt", "w")
#
# for filename in os.listdir(base):
#     if filename.startswith("TID"):
#         print (filename)
#         file_output.write(filename+"\n\n")
#
# file_output.close()


for filename in os.listdir():
    if filename.__contains__("indeviduals"):
        file_output = open(filename, "r")
        st = file_output.read()
        arr = st.split("\n")

        print (arr[10])


