import { FileSystem, Path } from "@effect/platform";
import { BunContext, BunRuntime } from "@effect/platform-bun";
import { Console, Effect, Logger } from "effect";
import { InputParser } from "@/InputParser";
import { AreaCalculator } from "./AreaCalculator";

const program = () =>
	Effect.gen(function* () {
		const path = yield* Path.Path;
		const fs = yield* FileSystem.FileSystem;
		const raw = yield* fs.readFileString(path.join("src", "input.txt"), "utf8");

		const inputParser = yield* InputParser;
		const parsedInput = yield* inputParser.parse(raw);

		const areaCalculator = yield* AreaCalculator;
		yield* Console.log(
			`[Part 1] Largest area ${areaCalculator.getMaxArea(parsedInput)}`,
		);
	});

BunRuntime.runMain(
	program().pipe(
		Effect.provide(Logger.pretty),
		Effect.provide(InputParser.Default),
		Effect.provide(AreaCalculator.Default),
		Effect.provide(BunContext.layer),
		Effect.catchAll((error) => Console.error("Error: ", error)),
	),
);
