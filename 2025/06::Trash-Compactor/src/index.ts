import { FileSystem } from "@effect/platform";
import { BunContext, BunRuntime } from "@effect/platform-bun";
import { Console, Effect, Logger } from "effect";
import { ColumnCalculator } from "@/ColumnCaclulator";
import { InputParser } from "@/InputParser";

const program = () =>
	Effect.gen(function* () {
		const fs = yield* FileSystem.FileSystem;
		const raw = yield* fs.readFileString("src/input.txt", "utf8");

		const inputParser = yield* InputParser;
		const parsedInput = yield* inputParser.parse(raw);

		const columnCalculator = yield* ColumnCalculator;

		const grandTotal = yield* columnCalculator.calculate(parsedInput);
		yield* Console.log(`[Part 1] Grand total ${grandTotal}`);

		const fixedGrandTotal = yield* columnCalculator.calculateV2(parsedInput);
		yield* Console.log(`[Part 2] Grand total ${fixedGrandTotal}`);
	});

BunRuntime.runMain(
	program().pipe(
		Effect.provide(Logger.pretty),
		Effect.provide(InputParser.layer),
		Effect.provide(ColumnCalculator.layer),
		Effect.provide(BunContext.layer),
		Effect.catchAll((error) => Console.error("Error: ", error)),
	),
);
