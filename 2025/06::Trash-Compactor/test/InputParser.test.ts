import { describe, expect, test } from "bun:test";
import { Effect, pipe } from "effect";
import { InputParser } from "@/InputParser";
import { TestConstants } from "./TestConstants";

describe("InputParser", () => {
	test("parse", () =>
		pipe(
			Effect.gen(function* () {
				const testConstants = yield* TestConstants;
				const inputParser = yield* InputParser;
				expect(yield* inputParser.parse(testConstants.SampleInput)).toEqual([
					["123", "328", " 51", "64 "],
					[" 45", "64 ", "387", "23 "],
					["  6", "98 ", "215", "314"],
					["*  ", "+  ", "*  ", "+  "],
				]);
			}),
			Effect.provide(TestConstants.layer),
			Effect.provide(InputParser.layer),
			Effect.runPromise,
		));
});
