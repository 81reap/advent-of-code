import { describe, expect, test } from "bun:test";
import { Effect } from "effect";
import { BankJoltageCalcV2 } from "@/BankJoltageCalcV2";

describe("Basic BankJoltageCalc tests", () => {
	test("22", () =>
		Effect.runPromise(
			Effect.gen(function* () {
				const bankJoltageCalc = yield* BankJoltageCalcV2;
				expect(yield* bankJoltageCalc.getLargestJolt("22")).toBe(22);
			}).pipe(Effect.provide(BankJoltageCalcV2.layer)),
		));

	test("123456789012", () =>
		Effect.runPromise(
			Effect.gen(function* () {
				const bankJoltageCalc = yield* BankJoltageCalcV2;
				expect(yield* bankJoltageCalc.getLargestJolt("123456789012")).toBe(
					123456789012,
				);
			}).pipe(Effect.provide(BankJoltageCalcV2.layer)),
		));
});

describe("BankJoltageCalc should pass README example", () => {
	test("987654321111111", () =>
		Effect.runPromise(
			Effect.gen(function* () {
				const bankJoltageCalc = yield* BankJoltageCalcV2;
				expect(yield* bankJoltageCalc.getLargestJolt("987654321111111")).toBe(
					987654321111,
				);
			}).pipe(Effect.provide(BankJoltageCalcV2.layer)),
		));

	test("811111111111119", () =>
		Effect.runPromise(
			Effect.gen(function* () {
				const bankJoltageCalc = yield* BankJoltageCalcV2;
				expect(yield* bankJoltageCalc.getLargestJolt("811111111111119")).toBe(
					811111111119,
				);
			}).pipe(Effect.provide(BankJoltageCalcV2.layer)),
		));

	test("234234234234278", () =>
		Effect.runPromise(
			Effect.gen(function* () {
				const bankJoltageCalc = yield* BankJoltageCalcV2;
				expect(yield* bankJoltageCalc.getLargestJolt("234234234234278")).toBe(
					434234234278,
				);
			}).pipe(Effect.provide(BankJoltageCalcV2.layer)),
		));

	test("818181911112111", () =>
		Effect.runPromise(
			Effect.gen(function* () {
				const bankJoltageCalc = yield* BankJoltageCalcV2;
				expect(yield* bankJoltageCalc.getLargestJolt("818181911112111")).toBe(
					888911112111,
				);
			}).pipe(Effect.provide(BankJoltageCalcV2.layer)),
		));
});
