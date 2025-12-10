import { Context, Effect, Layer, Schema } from "effect";

export const InputSchema = Schema.Array(
	Schema.Array(
		Schema.Union(Schema.Literal("S"), Schema.Literal("."), Schema.Literal("^")),
	),
);

const parse = (raw: string) =>
	Effect.gen(function* () {
		return Schema.decodeUnknown(InputSchema)(
			raw.split("\n").map((line) => line.split("")),
		);
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
