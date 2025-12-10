import { Context, Effect, Layer } from "effect";
import type { InputSchema } from "@/InputParser";

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

export class TachyonCalculator extends Context.Tag("TachyonCalculator")<
	TachyonCalculator,
	{
		readonly maxBeamSplit: typeof maxBeamSplit;
	}
>() {
	static readonly layer = Layer.succeed(TachyonCalculator, {
		maxBeamSplit,
	});
}
