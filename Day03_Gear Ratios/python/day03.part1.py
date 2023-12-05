import numpy

file = open('../input.txt')
lines = file.readlines()
engine_schematic = [list(line.strip()) for line in lines]

not_symbols = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '.']

# create an map of all valid engine part spots on the schematic
width = len(engine_schematic)
height = len(engine_schematic[0])
include = numpy.zeros((width, height), dtype=bool)
for i in range(0, width):
	for j in range(0, height):
		if engine_schematic[i][j] not in not_symbols :
			# set the surrounding values to true as well
			include[max(i-1, 0)][max(j-1, 0)] = True
			include[max(i-1, 0)][j] = True
			include[max(i-1, 0)][min(j+1, height)] = True
			include[i][max(j-1, 0)] = True
			include[i][j] = True
			include[i][min(j+1, height)] = True
			include[min(i+1, width)][max(j-1, 0)] = True
			include[min(i+1, width)][j] = True
			include[min(i+1, width)][min(j+1, height)] = True

output = 0
tmp_num = ""
tmp_valid = False
for i in range(0, width):
	for j in range(0, height):
		if engine_schematic[i][j] in not_symbols and engine_schematic[i][j] != "." :
			tmp_num = tmp_num + engine_schematic[i][j]
			tmp_valid = include[i][j] or tmp_valid
		else :
			if tmp_num != "" and tmp_valid:
				output = output + int(tmp_num)
			tmp_num = ""
			tmp_valid = False
	if tmp_num != "" and tmp_valid:
		output = output + int(tmp_num)
	tmp_num = ""
	tmp_valid = False

print(output)