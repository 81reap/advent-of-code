import { Context, Data, Effect, Layer } from "effect";

class UnknownOpError extends Data.TaggedError("UnknownOpError")<{
	message: string;
}> {}

const transpose = <T>(matrix: T[][]): T[][] => {
	if (matrix.length === 0 || matrix[0]?.length === 0) return [];

	const rows = matrix.length;
	const cols = matrix[0]!.length;

	const res: T[][] = Array.from({ length: cols }, () => Array(rows));
	matrix.forEach((row, rowIndex) =>
		row.forEach((item, colIndex) => (res[colIndex]![rowIndex] = item)),
	);
	return res;
};

const calculate = (grid: string[][]) =>
	Effect.reduce(transpose(grid), 0, (sum, row, _rowIndex) =>
		Effect.gen(function* () {
			const op = String(row[row.length - 1]).trim();
			const nums: number[] = row
				.splice(0, row.length - 1)
				.map((item) => Number(item));

			if (op === "+")
				return Number(sum) + nums.reduce((numTotal, num) => numTotal + num, 0);
			if (op === "*")
				return Number(sum) + nums.reduce((numTotal, num) => numTotal * num, 1);

			yield* Effect.fail(
				new UnknownOpError({
					message: `Unknown Op ${op} found`,
				}),
			);
			return 0;
		}),
	);

const calculateV2 = (grid: string[][]) =>
	Effect.reduce(transpose(grid), 0, (sum, row, _rowIndex) =>
		Effect.gen(function* () {
			const op = String(row[row.length - 1]).trim();
			const splitNums = row
				.splice(0, row.length - 1)
				.map((item) => item.split(""));
			const nums = transpose(splitNums).map((row) => Number(row.join("")));

			if (op === "+")
				return Number(sum) + nums.reduce((numTotal, num) => numTotal + num, 0);
			if (op === "*")
				return Number(sum) + nums.reduce((numTotal, num) => numTotal * num, 1);

			yield* Effect.fail(
				new UnknownOpError({
					message: `Unknown Op ${op} found`,
				}),
			);
			return 0;
		}),
	);

export class ColumnCalculator extends Context.Tag("ColumnCalculator")<
	ColumnCalculator,
	{
		readonly transpose: typeof transpose;
		readonly calculate: typeof calculate;
		readonly calculateV2: typeof calculateV2;
	}
>() {
	static readonly layer = Layer.succeed(ColumnCalculator, {
		transpose,
		calculate,
		calculateV2,
	});
}
