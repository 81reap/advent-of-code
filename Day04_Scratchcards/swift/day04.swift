#!/usr/bin/swift
import Foundation

extension String {
  func firstMatch(of re: NSRegularExpression) -> String? {
    let range = NSRange(startIndex..<endIndex, in: self)
    guard let match = re.firstMatch(in: self, options: [], range: range) else { return nil }
    return Range(match.range, in: self).flatMap { String(self[$0]) }
  }

  func allMatches(of re: NSRegularExpression) -> [String] {
  	let nsrange = NSRange(startIndex..<endIndex, in: self)
  	let matches = re.matches(in: self, options: [], range: nsrange)
  	let list_of_matches: [String] = matches.compactMap { match in 
  		guard let range = Range(match.range(at: 0), in: self) else { return nil }
  		return String(self[range])
  	}
  	return list_of_matches
  }
}

let file = URL(fileURLWithPath: "../input.txt")
let text = try! String(contentsOf: file)
let lines: [String] = text.components(separatedBy: "\n")

var part1_out: Int = 0
var part2_out: Int = 0

let re_numbers = try! NSRegularExpression(pattern: "[0-9]+")

var card_copies_won = [[Int]](repeating: [Int](repeating: 1, count: 2), count: lines.count)
for (i, line) in lines.enumerated() {
	let numbers = line.components(separatedBy: ":")[1].components(separatedBy: "|")
	let winning_numbers = numbers[0].allMatches(of: re_numbers)
	let my_numbers = numbers[1].allMatches(of: re_numbers)

	let num_matches = Set(winning_numbers).intersection(Set(my_numbers)).count

	if 0 != num_matches {
		part1_out += NSDecimalNumber(decimal: pow(2, num_matches-1)).intValue
	}

	card_copies_won[i][1] = num_matches
	part2_out += card_copies_won[i][0]
	for j in i+1..<min(i+1+num_matches, card_copies_won.count) {
		card_copies_won[j][0] += card_copies_won[i][0]
	}
}

print("part 1: ", part1_out)
print("part 2: ", part2_out)
