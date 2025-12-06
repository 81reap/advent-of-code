import re
import math
import numpy

file = open('../input.txt')
lines = file.readlines()

part1_output = 0
part2_output = 0

card_copies_won = numpy.ones((len(lines), 2))
for i, line in enumerate(lines):
	numbers = line.split(":")[1].split("|")
	winning_numbers = re.findall("[0-9]+", numbers[0])
	my_numbers = re.findall("[0-9]+", numbers[1])
	
	num_matches = len(set(winning_numbers)&set(my_numbers))

	if 0 != num_matches:
		part1_output = part1_output + math.pow(2, num_matches-1)

	card_copies_won[i][1] = num_matches
	part2_output = part2_output + card_copies_won[i][0]
	for j in range(i+1, min(i+1+num_matches, len(card_copies_won))):
		card_copies_won[j][0] = card_copies_won[j][0] + card_copies_won[i][0]

print("Part 1", int(part1_output))
print("Part 2", int(part2_output))
