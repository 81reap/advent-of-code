import { afterAll, afterEach, describe, expect, test } from "bun:test";
import { Effect } from "effect";
import { cache, getSillyNumbersInRange, resetCache } from "@/SillyNumbersCache";

describe("Basic SillyNumberCache tests", () => {
	afterEach(() => Effect.runPromise(resetCache()));

	test("SillyNumber should be Cached", () =>
		Effect.runPromise(
			Effect.gen(function* () {
				expect(yield* getSillyNumbersInRange(0, 11)).toEqual([11]);
				expect(cache).toEqual([
					undefined,
					[],
					[11, 22, 33, 44, 55, 66, 77, 88, 99],
				]);
			}),
		));

	test("Cache should reset", () =>
		Effect.runPromise(
			Effect.gen(function* () {
				yield* getSillyNumbersInRange(2, 2);
				yield* resetCache();
				expect(cache).toBeEmpty();
			}),
		));
});

describe("Passes README example", () => {
	afterAll(() => Effect.runPromise(resetCache()));

	test("11-22", () =>
		Effect.runPromise(
			Effect.gen(function* () {
				expect(yield* getSillyNumbersInRange(11, 22)).toEqual([11, 22]);
			}),
		));

	test("95-115", () =>
		Effect.runPromise(
			Effect.gen(function* () {
				expect(yield* getSillyNumbersInRange(95, 115)).toEqual([99, 111]);
			}),
		));

	test("998-1012", () =>
		Effect.runPromise(
			Effect.gen(function* () {
				expect(yield* getSillyNumbersInRange(998, 1012)).toEqual([999, 1010]);
			}),
		));

	test("1188511880-1188511890", () =>
		Effect.runPromise(
			Effect.gen(function* () {
				expect(yield* getSillyNumbersInRange(1188511880, 1188511890)).toEqual([
					1188511885,
				]);
			}),
		));

	test("222220-222224", () =>
		Effect.runPromise(
			Effect.gen(function* () {
				expect(yield* getSillyNumbersInRange(222220, 222224)).toEqual([222222]);
			}),
		));

	test("1698522-1698528", () =>
		Effect.runPromise(
			Effect.gen(function* () {
				expect(yield* getSillyNumbersInRange(1698522, 1698528)).toEqual([]);
			}),
		));

	test("446443-446449", () =>
		Effect.runPromise(
			Effect.gen(function* () {
				expect(yield* getSillyNumbersInRange(446443, 446449)).toEqual([446446]);
			}),
		));

	test("38593856-38593862", () =>
		Effect.runPromise(
			Effect.gen(function* () {
				expect(yield* getSillyNumbersInRange(38593856, 38593862)).toEqual([
					38593859,
				]);
			}),
		));

	test("565653-565659", () =>
		Effect.runPromise(
			Effect.gen(function* () {
				expect(yield* getSillyNumbersInRange(565653, 565659)).toEqual([565656]);
			}),
		));

	test("824824821-824824827", () =>
		Effect.runPromise(
			Effect.gen(function* () {
				expect(yield* getSillyNumbersInRange(824824821, 824824827)).toEqual([
					824824824,
				]);
			}),
		));

	test("2121212118-2121212124", () =>
		Effect.runPromise(
			Effect.gen(function* () {
				expect(yield* getSillyNumbersInRange(2121212118, 2121212124)).toEqual([
					2121212121,
				]);
			}),
		));
});
