use std::fs::File;
use std::io::{BufRead, BufReader};
use regex::Regex;

fn main() -> Result<(), std::io::Error> {
    let file = File::open("../input.txt")?;
    let reader = BufReader::new(&file);
    let re = Regex::new(r"\d").unwrap();

    let mut output_number = 0;
    
    for line in reader.lines() {
        let line = line?;
        let digits: Vec<&str> = re.find_iter(&line)
            .map(|mat| mat.as_str())
            .collect();
        let number = format!("{}{}", digits[0], digits[digits.len()-1]);
        output_number = output_number + number.parse::<i32>().unwrap();
        //println!("{}, {:?}, {}", line, digits, number);
    }

    println!("{}", output_number);
    drop(file);
    Ok(())
}
