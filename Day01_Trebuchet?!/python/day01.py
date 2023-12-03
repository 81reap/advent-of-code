import re

file = open('../input.txt')
lines = file.readlines()

ouput_number = 0

for line in lines:
	digits = re.findall("\d", line)
	number = '' + digits[0] + digits[-1]

	ouput_number = ouput_number + int(number)

print(ouput_number)