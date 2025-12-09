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

	test("getAccessiblePaper", () =>
		Effect.runPromise(
			Effect.gen(function* () {
				const diagramManager = yield* DiagramManager;
				expect(diagramManager.getAccessiblePaper(EX_PARSED_DIAGRAM)).toBe(13);
			}).pipe(Effect.provide(DiagramManager.layer)),
		));
});
