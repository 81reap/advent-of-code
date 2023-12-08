import re
import math

def part1(instr, lr_map):
	steps = 0
	curr_node = "AAA"
	while "ZZZ" != curr_node:
		step = instr[steps % len(instr)]
		if step == "R":
			curr_node = lr_map[curr_node][1]
		if step == "L":
			curr_node = lr_map[curr_node][0] 
		steps = steps + 1
	return steps

def part2(instr, lr_map):
	nodes = lr_map.keys()
	lcm = None
	for n in nodes:
		if "A" == n[-1]:
			curr_node = n 
			steps = 0
			while "Z" != curr_node[-1]:
				step = instr[steps % len(instr)]
				if step == "R":
					curr_node = lr_map[curr_node][1]
				if step == "L":
					curr_node = lr_map[curr_node][0] 
				steps = steps + 1

			if lcm == None:
				lcm = steps
			else :
				lcm = math.lcm(steps, lcm)
	return lcm

if "__main__" == __name__:
	file = open('../input.txt')
	lines = file.readlines()

	instr = re.findall("L|R", lines[0])

	lr_map = {}
	for node in lines[2:] :
		nodes = re.findall("[A-Z0-9]+", node)
		lr_map[nodes[0]] = (nodes[1], nodes[2])

	print("part 1", part1(instr, lr_map))
	print("part 2", part2(instr, lr_map))
