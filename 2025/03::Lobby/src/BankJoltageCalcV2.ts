import { Context, Effect, Layer } from "effect";

const DIGITS_TO_KEEP = 12;

const getLargestJolt = (bank: string): Effect.Effect<number, never> =>
	Effect.gen(function* () {
		if (bank.length <= DIGITS_TO_KEEP) return Number(bank);

		const res: string[] = [];

		for (let i = 0; i < bank.length; i++) {
			while (
				res.length > 0 &&
				res[res.length - 1]! < bank[i]! &&
				res.length - 1 + (bank.length - i) >= DIGITS_TO_KEEP
			) {
				res.pop();
			}

			if (res.length < DIGITS_TO_KEEP) {
				res.push(bank[i] as string);
			}
		}

		return Number(res.join(""));
	});

export class BankJoltageCalcV2 extends Context.Tag("BankJoltageCalcV2")<
	BankJoltageCalcV2,
	{
		readonly getLargestJolt: typeof getLargestJolt;
	}
>() {
	static readonly layer = Layer.succeed(BankJoltageCalcV2, {
		getLargestJolt,
	});
}
