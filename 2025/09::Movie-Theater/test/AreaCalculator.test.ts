import { describe, expect, test } from "bun:test";
import { Effect, pipe } from "effect";
import { AreaCalculator } from "@/AreaCalculator";
import { TestConstants } from "./TestConstants";

describe("getMaxArea()", () => {
	test("README example", () =>
		pipe(
			Effect.gen(function* () {
				const areaCalculator = yield* AreaCalculator;
				expect(
					areaCalculator.getMaxArea(yield* TestConstants.ParsedSampleInput),
				).toBe(50);
			}),
			Effect.provide(AreaCalculator.Default),
			Effect.provide(TestConstants.Default),
			Effect.runPromise,
		));
});

describe("getArea()", () => {
	test("[2,5] & [9,7]", () =>
		pipe(
			Effect.gen(function* () {
				const areaCalculator = yield* AreaCalculator;
				expect(areaCalculator.getArea([2, 5], [9, 7])).toBe(24);
			}),
			Effect.provide(AreaCalculator.Default),
			Effect.runPromise,
		));

	test("[7,1] & [11,7]", () =>
		pipe(
			Effect.gen(function* () {
				const areaCalculator = yield* AreaCalculator;
				expect(areaCalculator.getArea([7, 1], [11, 7])).toBe(35);
			}),
			Effect.provide(AreaCalculator.Default),
			Effect.runPromise,
		));

	test("[7,3] & [2,3]", () =>
		pipe(
			Effect.gen(function* () {
				const areaCalculator = yield* AreaCalculator;
				expect(areaCalculator.getArea([7, 3], [2, 3])).toBe(6);
			}),
			Effect.provide(AreaCalculator.Default),
			Effect.runPromise,
		));

	test("[2,5] & [11,1]", () =>
		pipe(
			Effect.gen(function* () {
				const areaCalculator = yield* AreaCalculator;
				expect(areaCalculator.getArea([2, 5], [11, 1])).toBe(50);
			}),
			Effect.provide(AreaCalculator.Default),
			Effect.runPromise,
		));
});
