import re

def part1 (lines):
	times = re.findall("[0-9]+", lines[0])
	distances = re.findall("[0-9]+", lines[1])

	ways_to_win = 1
	for i in range(0, len(times)):
		valid = 0

		T = int(times[i])
		d = int(distances[i])
		for h in range(0, T+1):
			if h * (T-h) > d :
				valid = valid + 1

		ways_to_win = ways_to_win * valid
	print("part 1", ways_to_win)

def part2 (lines):
	time = re.findall("[0-9]+", lines[0].replace(" ", ""))
	distance = re.findall("[0-9]+", lines[1].replace(" ", ""))

	valid = 0

	T = int(time[0])
	d = int(distance[0])
	for h in range(0, T+1):
		if h * (T-h) > d :
			valid = valid + 1

	print("part 2", valid)

# essentially we are solving this
# h = hold time [min::0, max::T]
# T = total race time
# d = record distance
# h * (T-h) > d

if "__main__" == __name__:
	file = open('../input.txt')
	lines = file.readlines()
	
	part1(lines)
	part2(lines)

