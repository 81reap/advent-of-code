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

    r, err := regexp.Compile("\\d")
    guard(err)

    output_number := 0

    fscanner := bufio.NewScanner(file)
    for fscanner.Scan() {
        line := fscanner.Text()
        digits := r.FindAllString(line, -1)
        number, err := strconv.Atoi(digits[0] + digits[len(digits)-1])
        guard(err)

        output_number += number
    }
    fmt.Println(output_number)
}