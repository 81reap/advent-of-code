import { describe, expect, test } from "bun:test";
import { Effect, pipe } from "effect";
import { CircuitCalculator } from "@/CircuitCalculator";
import { TestConstants } from "./TestConstants";

describe("CircuitCalculator", () => {
	describe("largestCircuit()", () => {
		test("README Example", () =>
			pipe(
				Effect.gen(function* () {
					const circuitCalculator = yield* CircuitCalculator;
					expect(
						circuitCalculator.largestCircuit(
							yield* TestConstants.ParsedSampleInput,
							10,
						),
					).toBe(40);
				}),
				Effect.provide(CircuitCalculator.Default),
				Effect.provide(TestConstants.Default),
				Effect.runPromise,
			));
	});

	describe("topKShortestDistances()", () => {
		test("Happy Path", () => {
			pipe(
				Effect.gen(function* () {
					const circuitCalculator = yield* CircuitCalculator;

					expect(
						circuitCalculator.topKShortestDistances(
							yield* TestConstants.ParsedSampleInput,
							10,
						),
					).toEqual([
						{
							distance: 316.90219311326956,
							from: [162, 817, 812],
							to: [425, 690, 689],
						},
						{
							distance: 321.560258738545,
							from: [162, 817, 812],
							to: [431, 825, 988],
						},
						{
							distance: 322.36935338211043,
							from: [906, 360, 560],
							to: [805, 96, 715],
						},
						{
							distance: 328.11888089532425,
							from: [431, 825, 988],
							to: [425, 690, 689],
						},
						{
							distance: 333.6555109690233,
							from: [862, 61, 35],
							to: [984, 92, 344],
						},
						{
							distance: 338.33858780813046,
							from: [52, 470, 668],
							to: [117, 168, 530],
						},
						{
							distance: 344.3893145845266,
							from: [819, 987, 18],
							to: [941, 993, 340],
						},
						{
							distance: 347.59890678769403,
							from: [906, 360, 560],
							to: [739, 650, 466],
						},
						{
							distance: 350.786259708102,
							from: [346, 949, 466],
							to: [425, 690, 689],
						},
						{
							distance: 352.936254867646,
							from: [906, 360, 560],
							to: [984, 92, 344],
						},
					]);
				}),
				Effect.provide(CircuitCalculator.Default),
			);
		});
	});

	describe("distance()", () => {
		test("(1,1,1) -> (0,0,0)", () =>
			pipe(
				Effect.gen(function* () {
					const circuitCalculator = yield* CircuitCalculator;
					expect(circuitCalculator.distance([1, 1, 1], [0, 0, 0])).toBe(
						Math.sqrt(3),
					);
				}),
				Effect.provide(CircuitCalculator.Default),
				Effect.runPromise,
			));

		test("(0,0,0) -> (1,1,1)", () =>
			pipe(
				Effect.gen(function* () {
					const circuitCalculator = yield* CircuitCalculator;
					expect(circuitCalculator.distance([0, 0, 0], [1, 1, 1])).toBe(
						Math.sqrt(3),
					);
				}),
				Effect.provide(CircuitCalculator.Default),
				Effect.runPromise,
			));

		test("(162,817,812) -> (425,690,689)", () =>
			pipe(
				Effect.gen(function* () {
					const circuitCalculator = yield* CircuitCalculator;
					expect(
						circuitCalculator.distance([162, 817, 812], [425, 690, 689]),
					).toBe(Math.sqrt(100427));
				}),
				Effect.provide(CircuitCalculator.Default),
				Effect.runPromise,
			));
	});
});
