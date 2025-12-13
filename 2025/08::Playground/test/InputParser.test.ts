import { describe, expect, test } from "bun:test";
import { TestConstants } from "@test/TestConstants";
import { Effect, pipe } from "effect";
import { InputParser } from "@/InputParser";

describe("InputParser", () => {
	describe("parse()", () => {
		test("Happy Path", () =>
			pipe(
				Effect.gen(function* () {
					const inputParser = yield* InputParser;
					expect(
						yield* inputParser.parse(yield* TestConstants.SampleInput),
					).toEqual(yield* TestConstants.ParsedSampleInput);
				}),
				Effect.provide(TestConstants.Default),
				Effect.provide(InputParser.Default),
				Effect.runPromise,
			));

		test("Throws ParseError", () =>
			pipe(
				Effect.gen(function* () {
					const inputParser = yield* InputParser;
					yield* inputParser.parse("BAD_INPUT");
					Effect.fail("Test Failed");
				}),
				Effect.catchTag("ParseError", (error) =>
					Effect.succeed(`Caught ${error}`),
				),
				Effect.provide(TestConstants.Default),
				Effect.provide(InputParser.Default),
				Effect.runPromise,
			));
	});
});
