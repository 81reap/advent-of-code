import { describe, expect, test } from "bun:test";
import { Effect, pipe } from "effect";
import { TachyonCalculator } from "@/TachyonCalculator";
import { TestConstants } from "./TestConstants";

describe("TachyonCalculator", () => {
	test("parse", () =>
		pipe(
			Effect.gen(function* () {
				const testConstants = yield* TestConstants;
				const tachyonCalculator = yield* TachyonCalculator;
				expect(
					yield* tachyonCalculator.maxBeamSplit(
						yield* testConstants.ParsedSampleInput,
					),
				).toEqual(21);
			}),
			Effect.provide(TestConstants.layer),
			Effect.provide(TachyonCalculator.layer),
			Effect.runPromise,
		));
});
