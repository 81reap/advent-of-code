import { FileSystem } from "@effect/platform";
import { BunContext, BunRuntime } from "@effect/platform-bun";
import { Console, Effect, Logger } from "effect";
import { InputParser } from "@/InputParser";
import { TachyonCalculator } from "@/TachyonCalculator";

const program = () =>
	Effect.gen(function* () {
		const fs = yield* FileSystem.FileSystem;
		const raw = yield* fs.readFileString("src/input.txt", "utf8");

		const inputParser = yield* InputParser;
		const parsedInput = yield* inputParser.parse(raw);

		const tachyonCalculator = yield* TachyonCalculator;

		yield* Console.log(
			`[Part 1] Beam split ${yield* tachyonCalculator.maxBeamSplit(parsedInput)} times`,
		);
		yield* Console.log(
			`[Part 2] Beam split ${tachyonCalculator.maxBeamSplitV2(parsedInput)} times`,
		);
	});

BunRuntime.runMain(
	program().pipe(
		Effect.provide(Logger.pretty),
		Effect.provide(InputParser.layer),
		Effect.provide(TachyonCalculator.layer),
		Effect.provide(BunContext.layer),
		Effect.catchAll((error) => Console.error("Error: ", error)),
	),
);
