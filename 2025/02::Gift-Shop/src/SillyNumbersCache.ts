import { Console, Effect } from "effect";

type SillyNumberCache = number[][];
export var cache: SillyNumberCache = [];

export const resetCache = () =>
	Effect.gen(function* () {
		cache = [];
		yield* Console.debug("Cache Reset");
	});

/* RULES
 1. any ID which is made only of some sequence of digits repeated twice. So, 55 (5 twice), 6464 (64 twice), and 123123 (123 twice)
 2. None of the numbers have leading zeroes; 0101 isn't an ID
 3. ID is invalid if it is made only of some sequence of digits repeated at least twice. So, 12341234 (1234 two times), 123123123 (123 three times), 1212121212 (12 five times), and 1111111 (1 seven times) are all invalid IDs.
 eg ::
const oracle = [
  [], // none in 1 digits
  [11, 22, 33, 44, 55, 66, 77, 88, 99], // 00 doesn't count due to leading 0s
  [111, 222, 333, 444, 555, 666, 777, 888, 999], // now included cuz of rule 3
  [1010, ..., 1111, ..., 2222, ...] ...
] */
export const getSillyNumbersInRange = (min: number, max: number) =>
	Effect.gen(function* () {
		var res = [];
		const minDigits = min.toString().length;
		const maxDigits = max.toString().length;

		for (let digits = minDigits; digits <= maxDigits; digits++) {
			if (cache[digits] === undefined) {
				yield* Console.debug(`Cache Miss [digits: ${digits}]`);

				const newRow = new Set<number>();
				for (let blockLen = 1; blockLen <= Math.floor(digits / 2); blockLen++) {
					if (digits % blockLen !== 0) continue;
					if (digits / blockLen < 2) continue;

					const start = 10 ** (blockLen - 1);
					const end = 10 ** blockLen - 1;
					for (let block = start; block <= end; block++) {
						newRow.add(Number(String(block).repeat(digits / blockLen)));
					}
				}
				cache[digits] = Array.from(newRow).sort((a, b) => a - b);
			}

			res.push(cache[digits] as number[]);
		}

		res = res
			.flat()
			.filter(Boolean)
			.sort((a, b) => a - b);

		const startIndex = res.findIndex((item) => item >= min);
		const endIndex = res.findLastIndex((item) => item <= max) + 1;
		return res.slice(startIndex, endIndex);
	});
