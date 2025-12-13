import { Effect, Schema } from "effect";
import { InputSchema } from "@/types";

const parse = (raw: string) =>
	Schema.decodeUnknown(InputSchema)(
		raw
			.split("\n")
			.map((line) => line.split(",").map((item) => Number(item.trim()))),
	);

export class InputParser extends Effect.Service<InputParser>()("InputParser", {
	sync: () => ({
		parse,
	}),
}) {}
