import { describe, expect, test } from "bun:test";
import { Effect } from "effect";
import { BankJoltageCalc } from "@/BankJoltageCalc";

describe("Basic BankJoltageCalc tests", () => {
	test("bank.len = 2 should return itself", () =>
		Effect.runPromise(
			Effect.gen(function* () {
				const bankJoltageCalc = yield* BankJoltageCalc;
				expect(yield* bankJoltageCalc.getLargestJolt("23")).toBe(23);
			}).pipe(Effect.provide(BankJoltageCalc.layer)),
		));
});

describe("BankJoltageCalc should pass README example", () => {
	test("987654321111111", () =>
		Effect.runPromise(
			Effect.gen(function* () {
				const bankJoltageCalc = yield* BankJoltageCalc;
				expect(yield* bankJoltageCalc.getLargestJolt("987654321111111")).toBe(
					98,
				);
			}).pipe(Effect.provide(BankJoltageCalc.layer)),
		));

	test("811111111111119", () =>
		Effect.runPromise(
			Effect.gen(function* () {
				const bankJoltageCalc = yield* BankJoltageCalc;
				expect(yield* bankJoltageCalc.getLargestJolt("811111111111119")).toBe(
					89,
				);
			}).pipe(Effect.provide(BankJoltageCalc.layer)),
		));

	test("234234234234278", () =>
		Effect.runPromise(
			Effect.gen(function* () {
				const bankJoltageCalc = yield* BankJoltageCalc;
				expect(yield* bankJoltageCalc.getLargestJolt("234234234234278")).toBe(
					78,
				);
			}).pipe(Effect.provide(BankJoltageCalc.layer)),
		));

	test("818181911112111", () =>
		Effect.runPromise(
			Effect.gen(function* () {
				const bankJoltageCalc = yield* BankJoltageCalc;
				expect(yield* bankJoltageCalc.getLargestJolt("818181911112111")).toBe(
					92,
				);
			}).pipe(Effect.provide(BankJoltageCalc.layer)),
		));
});
