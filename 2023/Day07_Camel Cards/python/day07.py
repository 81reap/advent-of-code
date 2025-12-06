import re

class Hand():
	def __init__(self, hand, joker):
		self.hand = hand
		self.joker = joker
		self.str = self.getStrength(hand)
		self.cards = self.getCards(hand)

	def __lt__(self, other):
		if self.__class__ is other.__class__:
			if self.str == other.str :
				for i in range(0, len(self.cards)):
					if self.cards[i] != other.cards[i] :
						return self.cards[i] < other.cards[i]
			return self.str < other.str
		return NotImplemented

	def __repr__(self):
		return self.hand + " " + str(self.str)

	def getCards(self, hand):
		cards = []
		for card in hand:
			if "A" == card :
				cards.append(14)
			if "K" == card :
				cards.append(13)
			if "Q" == card :
				cards.append(12)
			if "J" == card :
				if self.joker :
					cards.append(1)
				else :
					cards.append(11)
			if "T" == card :
				cards.append(10)
			if "9" == card :
				cards.append(9)
			if "8" == card :
				cards.append(8)
			if "7" == card :
				cards.append(7)
			if "6" == card :
				cards.append(6)
			if "5" == card :
				cards.append(5)
			if "4" == card :
				cards.append(4)
			if "3" == card :
				cards.append(3)
			if "2" == card :
				cards.append(2)
		return cards

	def getStrength(self, hand):
		cards = {}
		for card in hand:
			if card in cards.keys():
				cards[card] = cards[card] + 1
			else :
				cards[card] = 1
		counts = list(cards.values())

		joker = cards.get("J")
		if self.joker and joker is not None :
			counts.remove(joker)
			if 5 == joker or 4 == joker:
				return 7 #.FiveOfAKind
			if 3 == joker :
				if 2 in counts:
					return 7 #.FiveOfAKind
				return 6 #.FourOfAKind
			if 2 == joker :
				if 3 in counts:
					return 7 #.FiveOfAKind
				if 2 in counts:
					return 6 #.FourOfAKind
				return 4 #.ThreeOfAKind
			if 1 == joker :
				if 4 in counts:
					return 7 #.FiveOfAKind
				if 3 in counts:
					return 6 #.FourOfAKind
				if 2 in counts:
					counts.remove(2)
					if 2 in counts:
						return 5 #.FullHouse
					return 4 #.ThreeOfAKind
				return 2 #.OnePair

		counts = list(cards.values())
		if 5 in counts :
			return 7 #.FiveOfAKind
		if 4 in counts :
			return 6 #.FourOfAKind
		if 2 in counts and 3 in counts :
			return 5 #.FullHouse
		if 3 in counts :
			return 4 #.ThreeOfAKind
		if 2 in counts :
			counts.remove(2)
			if 2 in counts :
				return 3 #.TwoPair
			return 2 #.OnePair
		return 1 #.HighCard

		if self.joker and joker is not None:
				for i in range(0, joker+1):
					if (5-i) in counts :
						return 7

if "__main__" == __name__:
	file = open('../input.txt')
	lines = file.readlines()

	games_part1 = []
	games_part2 = []
	
	for line in lines:
		parsed_line = line.strip().split(" ")
		games_part1.append([Hand(parsed_line[0], False), int(parsed_line[1])])
		games_part2.append([Hand(parsed_line[0], True), int(parsed_line[1])])

	total_part1 = 0
	games_part1 = sorted(games_part1, key=lambda x:x[0])
	for i, game in enumerate(games_part1) :
		total_part1 = total_part1 + game[1]*(i+1)
	print("part 1", total_part1)

	total_part2 = 0
	games_part2 = sorted(games_part2, key=lambda x:x[0])
	for i, game in enumerate(games_part2) :
		total_part2 = total_part2 + game[1]*(i+1)
	print("part 2", total_part2)
