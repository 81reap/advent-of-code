import { describe, expect, test } from "bun:test";
import { Effect } from "effect";
import { InputParser } from "@/InputParser";

export const EX_INPUT = `123 328  51 64
  45 64  387 23
    6 98  215 314
  *   +   *   +  `;

describe("InputParser", () => {
	test("parse", () =>
		Effect.runPromise(
			Effect.gen(function* () {
				const inputParser = yield* InputParser;
				expect(yield* inputParser.parse(EX_INPUT)).toEqual([
					[123, 328, 51, 64],
					[45, 64, 387, 23],
					[6, 98, 215, 314],
					["*", "+", "*", "+"],
				]);
			}).pipe(Effect.provide(InputParser.layer)),
		));
});
