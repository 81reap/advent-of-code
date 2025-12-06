#!/usr/bin/swift
import Foundation

extension String {
  func firstMatch(of re: NSRegularExpression) -> String? {
    let range = NSRange(startIndex..<endIndex, in: self)
    guard let match = re.firstMatch(in: self, options: [], range: range) else { return nil }
    return Range(match.range, in: self).flatMap { String(self[$0]) }
  }
}

let file = URL(fileURLWithPath: "../input.txt")
let text = try! String(contentsOf: file)
let lines: [String] = text.components(separatedBy: "\n")

var max_output: Int = 0
var min_output: Int = 0
let max_green = 13
let max_blue = 14
let max_red = 12

let re_green = try! NSRegularExpression(pattern: "[0-9]+(?=\\s+green)")
let re_blue = try! NSRegularExpression(pattern: "[0-9]+(?=\\s+blue)")
let re_red = try! NSRegularExpression(pattern: "[0-9]+(?=\\s+red)")
let re_game_id = try! NSRegularExpression(pattern: "(?<=Game\\s)[0-9]+")

for game in lines {
	let rounds: [String] = game.components(separatedBy: ";")
	var impossible: Bool = false

	var min_green: Int = 0
	var min_blue: Int = 0
	var min_red: Int = 0

	for game_round in rounds {
		let green = Int(game_round.firstMatch(of: re_green) ?? "0")!
		let blue = Int(game_round.firstMatch(of: re_blue) ?? "0")!
		let red = Int(game_round.firstMatch(of: re_red) ?? "0")!

		if green > max_green || blue > max_blue || red > max_red {
			impossible = true
		}

		if green > min_green {
			min_green = green
		}
		if blue > min_blue {
			min_blue = blue
		}
		if red > min_red {
			min_red = red
		}
	}

	let game_id = Int(game.firstMatch(of: re_game_id)!)!
	if !impossible {
		max_output += game_id
	}

	min_output += (min_green*min_blue*min_red)
}

print("max: ", max_output)
print("min: ", min_output)
