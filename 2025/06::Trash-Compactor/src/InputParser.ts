import { Context, Data, Effect, Layer } from "effect";

class ParseError extends Data.TaggedError("ParseError")<{
	error: Error | unknown;
	message: string;
}> {}

const parse = (raw: string) =>
	Effect.try({
		try: () => {
			const lines = raw.split("\n");

			const cuts: number[] = [];
			lines[lines.length - 1]!.split("").forEach((char, i) => {
				if (char === "+" || char === "*") {
					cuts.push(i);
				}
			}, []);

			const parsed: string[][] = Array.from({ length: lines.length }, () => []);
			cuts.map((cut, i) => {
				lines.forEach((line, lineIndex) =>
					cuts[i + 1]
						? parsed[lineIndex]?.push(line.slice(cut, cuts[i + 1]! - 1))
            : parsed[lineIndex]?.push(line.slice(cut)),
				);
			});
			return parsed;
		},
		catch: (e) =>
			new ParseError({
				error: e,
				message: "Uncaught Exception when parsing input string",
			}),
	});

export class InputParser extends Context.Tag("InputParser")<
	InputParser,
	{
		readonly parse: typeof parse;
	}
>() {
	static readonly layer = Layer.succeed(InputParser, {
		parse,
	});
}
