file = open('../input.txt')
lines = file.readlines()
engine_schematic = [list(line.strip()) for line in lines]

digits = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9']

width = len(engine_schematic)
height = len(engine_schematic[0])
output = 0

def getNumber(i:int, j:int) -> int:
	left = 0
	for l in reversed(range(0, j)):
		if engine_schematic[i][l] not in digits:
			left = l+1
			break

	right = height
	for r in range(j, height):
		if engine_schematic[i][r] not in digits:
			right = r
			break

	return int(''.join(engine_schematic[i][left:right]))

for i in range(0, width):
	for j in range(0, height):
		if engine_schematic[i][j] == "*" :
			part_numbers = set()
			if engine_schematic[max(i-1, 0)][max(j-1, 0)] in digits :
				part_numbers.add(getNumber(max(i-1, 0), max(j-1, 0)))
			if engine_schematic[max(i-1, 0)][j] in digits :
				part_numbers.add(getNumber(max(i-1, 0), j))
			if engine_schematic[max(i-1, 0)][min(j+1, height)] in digits :
				part_numbers.add(getNumber(max(i-1, 0), min(j+1, height)))
			if engine_schematic[i][max(j-1, 0)] in digits :
				part_numbers.add(getNumber(i, max(j-1, 0)))
			if engine_schematic[i][j] in digits :
				part_numbers.add(getNumber(i, j))
			if engine_schematic[i][min(j+1, height)] in digits :
				part_numbers.add(getNumber(i, min(j+1, height)))
			if engine_schematic[min(i+1, width)][max(j-1, 0)] in digits :
				part_numbers.add(getNumber(min(i+1, width), max(j-1, 0)))
			if engine_schematic[min(i+1, width)][j] in digits :
				part_numbers.add(getNumber(min(i+1, width), j))
			if engine_schematic[min(i+1, width)][min(j+1, height)] in digits :
				part_numbers.add(getNumber(min(i+1, width), min(j+1, height)))
			
			if len(part_numbers) == 2 :
				output = output + (part_numbers.pop() * part_numbers.pop())

print(output)
