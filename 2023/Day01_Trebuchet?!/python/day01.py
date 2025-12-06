import re

file = open('../input.txt')
lines = file.readlines()

ouput_number = 0
digits_to_int = {
	"one": 1, "1": 1,
	"two": 2, "2": 2,
	"three": 3, "3": 3,
	"four": 4, "4": 4,
	"five": 5, "5": 5,
	"six": 6, "6": 6,
	"seven": 7, "7": 7,
	"eight": 8, "8": 8,
	"nine": 9, "9": 9
}

for line in lines:
	digits = re.findall("(?=(one|two|three|four|five|six|seven|eight|nine|[1-9]))", line)
	parsed_digits = [digits_to_int[num] for num in digits]
	number = str(parsed_digits[0]) + str(parsed_digits[-1])
	#print(line, parsed_digits, number)
	ouput_number = ouput_number + int(number)

print(ouput_number)