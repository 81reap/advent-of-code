import { describe, expect, test } from "bun:test";
import { Effect } from "effect";
import { ColumnCalculator } from "@/ColumnCaclulator";
import { InputParser } from "@/InputParser";
import { EX_INPUT } from "./InputParser.test";

describe("ColumnCalculator", () => {
	test("calculate", () =>
		Effect.runPromise(
			Effect.gen(function* () {
				const inputParser = yield* InputParser;
				const raw = yield* inputParser.parse(EX_INPUT);
				const columnCalculator = yield* ColumnCalculator;
				expect(yield* columnCalculator.calculate(raw)).toBe(4277556);
			}).pipe(
				Effect.provide(InputParser.layer),
				Effect.provide(ColumnCalculator.layer),
			),
		));
});
