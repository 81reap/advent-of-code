package main

import (
    "bufio"
    "fmt"
    "os"
    "regexp"
    "strconv"
)

func guard(e error) {
    if e != nil {
        panic(e)
    }
}

func main() {
    file, err := os.Open("../input.txt")
    guard(err)
    defer file.Close()

    r, err := regexp.Compile("one|1|two|2|three|3|four|4|five|5|six|6|seven|7|eight|8|nine|9")
    guard(err)

    digits_to_int := map[string]string{
        "one": "1", "1": "1",
        "two": "2", "2": "2",
        "three": "3", "3": "3",
        "four": "4", "4": "4",
        "five": "5", "5": "5",
        "six": "6", "6": "6",
        "seven": "7", "7": "7",
        "eight": "8", "8": "8",
        "nine": "9", "9": "9",
    }

    output_number := 0

    fscanner := bufio.NewScanner(file)
    for fscanner.Scan() {
        line := fscanner.Text()
        first := digits_to_int[r.FindString(line)]
        
        var last string = ""
        var i int = len(line)-1
        for last == "" {
            last = digits_to_int[r.FindString(line[i:])]
            i -= 1
        }

        number, err := strconv.Atoi(first+last)
        guard(err)

        output_number += number
    }
    fmt.Println(output_number)
}