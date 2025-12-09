import { Context, Effect, Layer } from "effect";

const getLargestJolt = (bank: string): Effect.Effect<number, never> =>
	Effect.gen(function* () {
		if (bank.length <= 2) return Number(bank);

		const leftDigit = bank[0] as string;

		const largestRightDigit = bank
			.slice(1)
			.split("")
			.map((item) => Number(item))
			.reduce((largest, item) => (item > largest ? item : largest));

		return Math.max(
			Number(leftDigit + largestRightDigit),
			yield* getLargestJolt(bank.slice(1)),
		);
	});

export class BankJoltageCalc extends Context.Tag("BankJoltageCalc")<
	BankJoltageCalc,
	{
		readonly getLargestJolt: typeof getLargestJolt;
	}
>() {
	static readonly layer = Layer.succeed(BankJoltageCalc, {
		getLargestJolt,
	});
}
