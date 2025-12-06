use std::fs::File;
use std::io::{BufRead, BufReader};
use std::collections::HashMap;
use regex::Regex;

fn main() -> Result<(), std::io::Error> {
    let file = File::open("../input.txt")?;
    let reader = BufReader::new(&file);
    let re = Regex::new(r"one|two|three|four|five|six|seven|eight|nine|[1-9]").unwrap();

    let digits_to_int = HashMap::from([
        ("one", "1"), ("1", "1"),
        ("two", "2"), ("2", "2"),
        ("three", "3"), ("3", "3"),
        ("four", "4"), ("4", "4"),
        ("five", "5"), ("5", "5"),
        ("six", "6"), ("6", "6"),
        ("seven", "7"), ("7", "7"),
        ("eight", "8"), ("8", "8"),
        ("nine", "9"), ("9", "9"),
    ]);

    let mut output_number = 0;
    
    for line in reader.lines() {
        let line = line?;
        let first = digits_to_int.get(re.find(&line).unwrap().as_str()).unwrap();

        let mut last = String::new();
        let mut index = line.len();
        while last.is_empty() {
            index -= 1;
            let search_string = &line[index..];
            if let Some(digits) = re.find(search_string) {
                if let Some(&digit) = digits_to_int.get(digits.as_str()) {
                    last = digit.to_string()
                }
            }
        }

        let number = format!("{}{}", first, last);
        output_number = output_number + number.parse::<i32>().unwrap();
        //println!("{}, {}, {}", line, first, last);
    }

    println!("{}", output_number);
    drop(file);
    Ok(())
}
