import { describe, expect, test } from "bun:test";
import { Effect, pipe } from "effect";
import { ColumnCalculator } from "@/ColumnCaclulator";
import { InputParser } from "@/InputParser";
import { TestConstants } from "./TestConstants";

describe("ColumnCalculator", () => {
	test("transpose", () =>
		pipe(
			Effect.gen(function* () {
				const columnCalculator = yield* ColumnCalculator;
				expect(
					columnCalculator.transpose([
						[1, 2, 3, 4],
						[5, 6, 7, 8],
						[9, 10, 11, 12],
					]),
				).toEqual([
					[1, 5, 9],
					[2, 6, 10],
					[3, 7, 11],
					[4, 8, 12],
				]);
			}),
			Effect.provide(ColumnCalculator.layer),
			Effect.runPromise,
		));

	test("calculate", () =>
		pipe(
			Effect.gen(function* () {
				const testConstants = yield* TestConstants;
				const inputParser = yield* InputParser;
				const raw = yield* inputParser.parse(testConstants.SampleInput);
				const columnCalculator = yield* ColumnCalculator;
				expect(yield* columnCalculator.calculate(raw)).toBe(4277556);
			}),
			Effect.provide(TestConstants.layer),
			Effect.provide(InputParser.layer),
			Effect.provide(ColumnCalculator.layer),
			Effect.runPromise,
		));

	test("calculateV2", () =>
		pipe(
			Effect.gen(function* () {
				const testConstants = yield* TestConstants;
				const inputParser = yield* InputParser;
				const raw = yield* inputParser.parse(testConstants.SampleInput);
				const columnCalculator = yield* ColumnCalculator;
				expect(yield* columnCalculator.calculateV2(raw)).toBe(3263827);
			}),
			Effect.provide(TestConstants.layer),
			Effect.provide(InputParser.layer),
			Effect.provide(ColumnCalculator.layer),
			Effect.runPromise,
		));
});
