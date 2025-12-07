

import { Console, Effect } from "effect"

type SillyNumberCache = number[][]
export var cache: SillyNumberCache = []

export const resetCache = () => Effect.gen(function*(){
  cache = [];
  yield* Console.debug('Cache Reset')
})

/* RULES
 1. any ID which is made only of some sequence of digits repeated twice. So, 55 (5 twice), 6464 (64 twice), and 123123 (123 twice)
 2. None of the numbers have leading zeroes; 0101 isn't an ID
 eg ::
const oracle = [
  [], // none in 1 digits
  [11, 22, 33, 44, 55, 66, 77, 88, 99], // 00 doesn't count due to leading 0s
  [], // none in 3 digits
  [1010, ..., 1111, ..., 2222, ...] ...
] */
export const getSillyNumbersInRange = (
  min: number,
  max: number
) => Effect.gen(function* () {
  var res = []
  const minDigits = min.toString().length;
  const maxDigits = max.toString().length;

  for (let i = minDigits; i <= maxDigits; i ++) {
    if ( 0 !== i % 2 ) cache[i] = []

    if ( cache[i] === undefined ) {
      yield* Console.debug(`Cache Miss [digits: ${i}]`)
      const newRow: number[] = [];
      const startNum = 10 ** (i / 2 - 1) ;
      const endNum = 10 ** (i / 2) - 1 ;
      for (let num = startNum; num <= endNum; num++) {
        newRow.push(Number(String(num) + String(num)))
      }
      cache[i] = newRow.sort((a, b) => a - b)
    }

    res.push(cache[i] as number[])
  }

  res = res
    .flat()
    .filter(Boolean)
    .sort((a, b) => a - b);

  const startIndex = res.findIndex(item => item >= min)
  const endIndex = res.findLastIndex(item => item <= max) + 1
  return res.slice(startIndex, endIndex);
})
