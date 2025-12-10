import { Context, Effect, Layer } from "effect";

const calculate = (grid: (string | number)[][]) =>
	Effect.gen(function* () {
		var total = 0;
		for (let i = 0; i < (grid[0] ?? []).length; i++) {
			const numbers: number[] = [];
			for (let j = 0; j < grid.length; j++) {
				if (Number(grid[j]?.[i])) numbers.push(Number(grid[j]?.[i]));
				if (grid[j]?.[i] === "+")
					total = total + numbers.reduce((sum, num) => sum + num);
				if (grid[j]?.[i] === "*")
					total = total + numbers.reduce((sum, num) => sum * num);
			}
		}
		return total;
	});

export class ColumnCalculator extends Context.Tag("ColumnCalculator")<
	ColumnCalculator,
	{
		readonly calculate: typeof calculate;
	}
>() {
	static readonly layer = Layer.succeed(ColumnCalculator, { calculate });
}
