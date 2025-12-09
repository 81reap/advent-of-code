import { describe, expect, test } from "bun:test";
import { Effect } from "effect";
import { DiagramManager } from "@/DiagramManager";

const EX_DIAGRAM = [
	"..@@.@@@@.",
	"@@@.@.@.@@",
	"@@@@@.@.@@",
	"@.@@@@..@.",
	"@@.@@@@.@@",
	".@@@@@@@.@",
	".@.@.@.@@@",
	"@.@@@.@@@@",
	".@@@@@@@@.",
	"@.@.@@@.@.",
];
const EX_PARSED_DIAGRAM = [
	[0, 0, 1, 1, 0, 1, 1, 1, 1, 0],
	[1, 1, 1, 0, 1, 0, 1, 0, 1, 1],
	[1, 1, 1, 1, 1, 0, 1, 0, 1, 1],
	[1, 0, 1, 1, 1, 1, 0, 0, 1, 0],
	[1, 1, 0, 1, 1, 1, 1, 0, 1, 1],
	[0, 1, 1, 1, 1, 1, 1, 1, 0, 1],
	[0, 1, 0, 1, 0, 1, 0, 1, 1, 1],
	[1, 0, 1, 1, 1, 0, 1, 1, 1, 1],
	[0, 1, 1, 1, 1, 1, 1, 1, 1, 0],
	[1, 0, 1, 0, 1, 1, 1, 0, 1, 0],
];

describe("AccessiblePaperFinder should pass README example", () => {
	test("parseDiagram", () =>
		Effect.runPromise(
			Effect.gen(function* () {
				const diagramManager = yield* DiagramManager;
				expect(EX_DIAGRAM.map(diagramManager.parseDiagramLine)).toEqual(
					EX_PARSED_DIAGRAM,
				);
			}).pipe(Effect.provide(DiagramManager.layer)),
		));

	test("getAccessiblePaper removes 13 rolls", () =>
		Effect.runPromise(
			Effect.gen(function* () {
				const diagramManager = yield* DiagramManager;
				expect(diagramManager.getAccessiblePaper(EX_PARSED_DIAGRAM)).toEqual([
					13,
					[
						[0, 0, 0, 0, 0, 0, 0, 1, 0, 0],
						[0, 1, 1, 0, 1, 0, 1, 0, 1, 1],
						[1, 1, 1, 1, 1, 0, 0, 0, 1, 1],
						[1, 0, 1, 1, 1, 1, 0, 0, 1, 0],
						[0, 1, 0, 1, 1, 1, 1, 0, 1, 0],
						[0, 1, 1, 1, 1, 1, 1, 1, 0, 1],
						[0, 1, 0, 1, 0, 1, 0, 1, 1, 1],
						[0, 0, 1, 1, 1, 0, 1, 1, 1, 1],
						[0, 1, 1, 1, 1, 1, 1, 1, 1, 0],
						[0, 0, 0, 0, 1, 1, 1, 0, 0, 0],
					],
				]);
			}).pipe(Effect.provide(DiagramManager.layer)),
		));

	test("getAccessiblePaper removes 12 rolls", () =>
		Effect.runPromise(
			Effect.gen(function* () {
				const diagramManager = yield* DiagramManager;
				expect(
					diagramManager.getAccessiblePaper([
						[0, 0, 0, 0, 0, 0, 0, 1, 0, 0],
						[0, 1, 1, 0, 1, 0, 1, 0, 1, 1],
						[1, 1, 1, 1, 1, 0, 0, 0, 1, 1],
						[1, 0, 1, 1, 1, 1, 0, 0, 1, 0],
						[0, 1, 0, 1, 1, 1, 1, 0, 1, 0],
						[0, 1, 1, 1, 1, 1, 1, 1, 0, 1],
						[0, 1, 0, 1, 0, 1, 0, 1, 1, 1],
						[0, 0, 1, 1, 1, 0, 1, 1, 1, 1],
						[0, 1, 1, 1, 1, 1, 1, 1, 1, 0],
						[0, 0, 0, 0, 1, 1, 1, 0, 0, 0],
					]),
				).toEqual([
					12,
					[
						[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
						[0, 1, 1, 0, 0, 0, 0, 0, 1, 0],
						[0, 1, 1, 1, 1, 0, 0, 0, 1, 1],
						[0, 0, 1, 1, 1, 1, 0, 0, 0, 0],
						[0, 1, 0, 1, 1, 1, 1, 0, 0, 0],
						[0, 0, 1, 1, 1, 1, 1, 1, 0, 0],
						[0, 0, 0, 1, 0, 1, 0, 1, 1, 1],
						[0, 0, 1, 1, 1, 0, 1, 1, 1, 1],
						[0, 0, 1, 1, 1, 1, 1, 1, 1, 0],
						[0, 0, 0, 0, 1, 1, 1, 0, 0, 0],
					],
				]);
			}).pipe(Effect.provide(DiagramManager.layer)),
		));

	test("getAccessiblePaper removes 7 rolls", () =>
		Effect.runPromise(
			Effect.gen(function* () {
				const diagramManager = yield* DiagramManager;
				expect(
					diagramManager.getAccessiblePaper([
						[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
						[0, 1, 1, 0, 0, 0, 0, 0, 1, 0],
						[0, 1, 1, 1, 1, 0, 0, 0, 1, 1],
						[0, 0, 1, 1, 1, 1, 0, 0, 0, 0],
						[0, 1, 0, 1, 1, 1, 1, 0, 0, 0],
						[0, 0, 1, 1, 1, 1, 1, 1, 0, 0],
						[0, 0, 0, 1, 0, 1, 0, 1, 1, 1],
						[0, 0, 1, 1, 1, 0, 1, 1, 1, 1],
						[0, 0, 1, 1, 1, 1, 1, 1, 1, 0],
						[0, 0, 0, 0, 1, 1, 1, 0, 0, 0],
					]),
				).toEqual([
					7,
					[
						[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
						[0, 0, 1, 0, 0, 0, 0, 0, 0, 0],
						[0, 1, 1, 1, 1, 0, 0, 0, 0, 0],
						[0, 0, 1, 1, 1, 1, 0, 0, 0, 0],
						[0, 0, 0, 1, 1, 1, 1, 0, 0, 0],
						[0, 0, 1, 1, 1, 1, 1, 1, 0, 0],
						[0, 0, 0, 1, 0, 1, 0, 1, 1, 0],
						[0, 0, 1, 1, 1, 0, 1, 1, 1, 1],
						[0, 0, 0, 1, 1, 1, 1, 1, 1, 0],
						[0, 0, 0, 0, 1, 1, 1, 0, 0, 0],
					],
				]);
			}).pipe(Effect.provide(DiagramManager.layer)),
		));

	test("getAccessiblePaper removes 5 rolls", () =>
		Effect.runPromise(
			Effect.gen(function* () {
				const diagramManager = yield* DiagramManager;
				expect(
					diagramManager.getAccessiblePaper([
						[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
						[0, 0, 1, 0, 0, 0, 0, 0, 0, 0],
						[0, 1, 1, 1, 1, 0, 0, 0, 0, 0],
						[0, 0, 1, 1, 1, 1, 0, 0, 0, 0],
						[0, 0, 0, 1, 1, 1, 1, 0, 0, 0],
						[0, 0, 1, 1, 1, 1, 1, 1, 0, 0],
						[0, 0, 0, 1, 0, 1, 0, 1, 1, 0],
						[0, 0, 1, 1, 1, 0, 1, 1, 1, 1],
						[0, 0, 0, 1, 1, 1, 1, 1, 1, 0],
						[0, 0, 0, 0, 1, 1, 1, 0, 0, 0],
					]),
				).toEqual([
					5,
					[
						[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
						[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
						[0, 0, 1, 1, 1, 0, 0, 0, 0, 0],
						[0, 0, 1, 1, 1, 1, 0, 0, 0, 0],
						[0, 0, 0, 1, 1, 1, 1, 0, 0, 0],
						[0, 0, 0, 1, 1, 1, 1, 1, 0, 0],
						[0, 0, 0, 1, 0, 1, 0, 1, 1, 0],
						[0, 0, 0, 1, 1, 0, 1, 1, 1, 0],
						[0, 0, 0, 1, 1, 1, 1, 1, 1, 0],
						[0, 0, 0, 0, 1, 1, 1, 0, 0, 0],
					],
				]);
			}).pipe(Effect.provide(DiagramManager.layer)),
		));

	test("getAccessiblePaper removes 2 rolls", () =>
		Effect.runPromise(
			Effect.gen(function* () {
				const diagramManager = yield* DiagramManager;
				expect(
					diagramManager.getAccessiblePaper([
						[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
						[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
						[0, 0, 1, 1, 1, 0, 0, 0, 0, 0],
						[0, 0, 1, 1, 1, 1, 0, 0, 0, 0],
						[0, 0, 0, 1, 1, 1, 1, 0, 0, 0],
						[0, 0, 0, 1, 1, 1, 1, 1, 0, 0],
						[0, 0, 0, 1, 0, 1, 0, 1, 1, 0],
						[0, 0, 0, 1, 1, 0, 1, 1, 1, 0],
						[0, 0, 0, 1, 1, 1, 1, 1, 1, 0],
						[0, 0, 0, 0, 1, 1, 1, 0, 0, 0],
					]),
				).toEqual([
					2,
					[
						[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
						[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
						[0, 0, 0, 1, 1, 0, 0, 0, 0, 0],
						[0, 0, 1, 1, 1, 1, 0, 0, 0, 0],
						[0, 0, 0, 1, 1, 1, 1, 0, 0, 0],
						[0, 0, 0, 1, 1, 1, 1, 1, 0, 0],
						[0, 0, 0, 1, 0, 1, 0, 1, 1, 0],
						[0, 0, 0, 1, 1, 0, 1, 1, 1, 0],
						[0, 0, 0, 1, 1, 1, 1, 1, 0, 0],
						[0, 0, 0, 0, 1, 1, 1, 0, 0, 0],
					],
				]);
			}).pipe(Effect.provide(DiagramManager.layer)),
		));

	test("removeAllPapers", () =>
		Effect.runPromise(
			Effect.gen(function* () {
				const diagramManager = yield* DiagramManager;
				expect(diagramManager.removeAllPapers(EX_PARSED_DIAGRAM)).toEqual([
					43,
					[
						[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
						[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
						[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
						[0, 0, 0, 0, 1, 1, 0, 0, 0, 0],
						[0, 0, 0, 1, 1, 1, 1, 0, 0, 0],
						[0, 0, 0, 1, 1, 1, 1, 1, 0, 0],
						[0, 0, 0, 1, 0, 1, 0, 1, 1, 0],
						[0, 0, 0, 1, 1, 0, 1, 1, 1, 0],
						[0, 0, 0, 1, 1, 1, 1, 1, 0, 0],
						[0, 0, 0, 0, 1, 1, 1, 0, 0, 0],
					],
				]);
			}).pipe(Effect.provide(DiagramManager.layer)),
		));
});
