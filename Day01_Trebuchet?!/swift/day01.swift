#!/usr/bin/swift
import Foundation

let file: URL = URL(fileURLWithPath: "../input.txt")
let text: String = try! String(contentsOf: file)
let lines: [String] = text.components(separatedBy: "\n")

var output_number: Int = 0
let digits_to_int: [String: String] = [
    "one": "1", "1": "1",
    "two": "2", "2": "2",
    "three": "3", "3": "3",
    "four": "4", "4": "4",
    "five": "5", "5": "5",
    "six": "6", "6": "6",
    "seven": "7", "7": "7",
    "eight": "8", "8": "8",
    "nine": "9", "9": "9"
]

let re = try! NSRegularExpression(pattern: "(?=(one|two|three|four|five|six|seven|eight|nine|[1-9]))")

for line in lines {
    let nsRange = NSRange(line.startIndex..<line.endIndex, in: line)
    let matches = re.matches(in: line, options: [], range: nsRange)

    let digits: [String] = matches.compactMap { match in
        guard let range = Range(match.range(at: 1), in: line) else { return nil }
        return digits_to_int[String(line[range])]
    }

    let number: String = "\(digits.first!)\(digits.last!)"
    //print(line, digits, number)
    output_number += Int(number)!
}
print(output_number)