import os

all_Data = []

os.chdir("..//data")
all_Files = os.listdir(".")

for i in all_Files:
	read_File = open(i)
	all_Data.append(read_File.read())

all_Data = ''.join(all_Data)

write_All_Data = open("daily-count-master.csv", 'w')
write_All_Data.write(all_Data)

print("Done!!")