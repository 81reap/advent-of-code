import { FileSystem, Path } from "@effect/platform";
import { BunContext, BunRuntime } from "@effect/platform-bun";
import { Console, Effect, Logger } from "effect";
import { InputParser } from "@/InputParser";
import { CircuitCalculator } from "./CircuitCalculator";

const program = () =>
	Effect.gen(function* () {
		const path = yield* Path.Path;
		const fs = yield* FileSystem.FileSystem;
		const raw = yield* fs.readFileString(path.join("src", "input.txt"), "utf8");

		const inputParser = yield* InputParser;
		const parsedInput = yield* inputParser.parse(raw);

		const circuitCalculator = yield* CircuitCalculator;
		yield* Console.log(
			`[Part 1] Beam split ${circuitCalculator.largestCircuit(parsedInput, 1000)} times`,
		);
	});

BunRuntime.runMain(
	program().pipe(
		Effect.provide(Logger.pretty),
		Effect.provide(InputParser.Default),
		Effect.provide(CircuitCalculator.Default),
		Effect.provide(BunContext.layer),
		Effect.catchAll((error) => Console.error("Error: ", error)),
	),
);
