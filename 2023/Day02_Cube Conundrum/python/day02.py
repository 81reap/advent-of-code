import re

file = open('../input.txt')
lines = file.readlines()

max_output = 0
min_output = 0
max_green = 13
max_blue = 14
max_red = 12

for game in lines :
	rounds = game.split(";")
	impossible = False

	min_green = 0
	min_blue = 0
	min_red = 0

	for game_round in rounds :
		green = int(next(iter(re.findall("[0-9]+(?=\s+green)", game_round)), 0))
		blue = int(next(iter(re.findall("[0-9]+(?=\s+blue)", game_round)), 0))
		red = int(next(iter(re.findall("[0-9]+(?=\s+red)", game_round)), 0))

		if green > max_green or blue > max_blue or red > max_red :
			impossible = True

		min_green = green if green > min_green else min_green
		min_blue = blue if blue > min_blue else min_blue
		min_red = red if red > min_red else min_red

	game_id = int(re.findall("(?<=Game\s)[0-9]+", game)[0])
	if not impossible:
		max_output = max_output + game_id

	min_output = min_output + (min_green*min_blue*min_red)

print("max: ", max_output)
print("min: ", min_output)