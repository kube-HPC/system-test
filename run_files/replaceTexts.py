import os
import sys
# Read in the file
try:
    base = sys.argv[1]
except:
    print 'have to get baseFolder'

filesToSearch = sys.argv[2]
originText = sys.argv[3]
newText = sys.argv[4]


def replace_in_each(filer, originalText, newTextinsert):
    with open(filer, 'r') as file:
        filedata = file.read()

    # Replace the target string
    filedata = filedata.replace(originalText, newTextinsert)

    # Write the file out again
    with open(filer, 'w') as file:
        file.write(filedata)


for filename in os.listdir(base):
    if filename.__contains__(filesToSearch):
        replace_in_each(base+"/"+filename, originText, newText)
