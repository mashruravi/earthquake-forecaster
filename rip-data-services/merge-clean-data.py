import os

all_data = []

os.chdir("..//data-cleaned")
all_files = os.listdir(".")

for i in all_files:
	read_file = open(i)
	all_data.append(read_file.read())

all_data = ''.join(all_data)

write_all_data = open("detailed-data-master.csv", 'w')
write_all_data.write(all_data)

print("Done!!")