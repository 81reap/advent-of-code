import { Context, Data, Effect, Layer } from "effect";

class ParseError extends Data.TaggedError("ParseError")<{
	error: Error | unknown;
	message: string;
}> {}

const parse = (raw: string) =>
	Effect.try({
		try: () =>
			raw.split("\n").map((line) =>
				line
					.trim()
					.split(/\s+/)
					.map((item) => (Number(item) ? Number(item) : String(item))),
			),
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
