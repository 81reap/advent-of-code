package main

import (
    "bufio"
    "fmt"
    "os"
    "regexp"
    "strconv"
    "strings"
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

    max_output := 0
    min_output := 0

    max_green := 13
    max_blue := 14
    max_red := 12

    re_green, err := regexp.Compile("[0-9]+ green")
    guard(err)
    re_blue, err := regexp.Compile("[0-9]+ blue")
    guard(err)
    re_red, err := regexp.Compile("[0-9]+ red")
    guard(err)
    re_game_id, err := regexp.Compile("Game [0-9]+")

    fscanner := bufio.NewScanner(file)
    for fscanner.Scan() {
        game := fscanner.Text()
        rounds := strings.Split(game, ";")
        impossible := false

        min_green := 0
        min_blue := 0
        min_red := 0

        for _, game_round := range rounds {
            // don't check for errors here as "" throws an error
            // on error the value will default to 0 which is correct
            green, _ := strconv.Atoi(strings.ReplaceAll(re_green.FindString(game_round), " green", ""))
            blue, _ := strconv.Atoi(strings.ReplaceAll(re_blue.FindString(game_round), " blue", ""))
            red, _ := strconv.Atoi(strings.ReplaceAll(re_red.FindString(game_round), " red", ""))

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

        game_id, err := strconv.Atoi(strings.ReplaceAll(re_game_id.FindString(game), "Game ", ""))
        guard(err)
        if !impossible {
            max_output = max_output + game_id
        }
        min_output = min_output + (min_green*min_blue*min_red)
    }

    fmt.Println("max: ", max_output)
    fmt.Println("min: ", min_output)
}