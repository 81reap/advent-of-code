package main

import (
    "bufio"
    "fmt"
    "os"
)

func guard(e error) {
    if e != nil {
        panic(e)
    }
}

func main() {
    file, err := os.Open("../example.input.txt")
    guard(err)
    fmt.println(file)
    defer file.Close()
}