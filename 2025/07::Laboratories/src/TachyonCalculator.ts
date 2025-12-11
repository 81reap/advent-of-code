import { Context, Effect, Layer } from "effect";
import type { InputSchema } from "@/InputParser";

type Point = { x: number; y: number };

const maxBeamSplit = (input: typeof InputSchema.Type) =>
	Effect.gen(function* () {
		const cols: Set<number> = new Set();
		const splitters: Set<{ x: number; y: number }> = new Set();
		input.forEach((row, rowIndex) => {
			if (rowIndex === 0) return cols.add(row.indexOf("S"));
			Array.from(cols).forEach((colIndex) => {
				if (input[rowIndex]?.[colIndex] === "^") {
					splitters.add({ x: rowIndex, y: colIndex });
					cols.delete(colIndex);
					cols.add(colIndex + 1);
					cols.add(colIndex - 1);
				}
			});
		});
		return Array.from(splitters).length;
	});

var cache = new Map<string, number>();
const pointKey = (p: Point) => `${p.x},${p.y}`;
const resetCache = () => {
	cache = new Map<string, number>();
};

const recursiveBeamSplit = (
	input: typeof InputSchema.Type,
	start: Point,
): number => {
	if (cache.get(pointKey(start))) return cache.get(pointKey(start)) ?? 0;
	for (let i = start.x; i < input.length; i++) {
		if (input[i]![start.y] === "^") {
			const ret =
				1 +
				recursiveBeamSplit(input, { x: i, y: start.y + 1 }) +
				recursiveBeamSplit(input, { x: i, y: start.y - 1 });
			cache.set(pointKey(start), ret);
			return ret;
		}
	}
	cache.set(pointKey(start), 0);
	return 0;
};

const maxBeamSplitV2 = (input: typeof InputSchema.Type) => {
	resetCache();
	return 1 + recursiveBeamSplit(input, { x: 0, y: input[0]!.indexOf("S") });
};

export class TachyonCalculator extends Context.Tag("TachyonCalculator")<
	TachyonCalculator,
	{
		readonly maxBeamSplit: typeof maxBeamSplit;
		readonly maxBeamSplitV2: typeof maxBeamSplitV2;
	}
>() {
	static readonly layer = Layer.succeed(TachyonCalculator, {
		maxBeamSplit,
		maxBeamSplitV2,
	});
}
