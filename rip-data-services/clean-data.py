import os

os.chdir("..//data")
os.mkdir("..//data-cleaned")
all_files = os.listdir(".")


start_year = 1979

for i in range(0,38):
	os.chdir("..//data")
	read_file = open(all_files[i])

	null_removed = []
	undefined_removed = []
	all_Data = []
	
	for line in read_file:
		nullRemoved = line.replace('null',' ')
		null_removed.append(nullRemoved)

	for item in null_removed:
		undefinedRemoved = item.replace('undefined',' ')
		undefined_removed.append(undefinedRemoved)

	all_Data = ''.join(undefined_removed)
	os.chdir("../data-cleaned")
	write_All_Data = open("detailed-data-"+str(start_year)+"-removeNull.csv", 'w')
	write_All_Data.write(all_Data)
	start_year = start_year+1

print("DONE!!")