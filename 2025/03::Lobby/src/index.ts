import { FileSystem } from "@effect/platform";
import { BunContext, BunRuntime } from "@effect/platform-bun";
import { Console, Effect, Logger, Stream } from "effect";
import { BankJoltageCalc } from "@/BankJoltageCalc";

const program = () =>
	Effect.gen(function* () {
		const fs = yield* FileSystem.FileSystem;
		const bankJoltageCalc = yield* BankJoltageCalc;

		const totalJoltage = yield* fs
			.stream(`${import.meta.dirname}/input.txt`)
			.pipe(
				Stream.decodeText(),
				Stream.splitLines,
				Stream.mapEffect(bankJoltageCalc.getLargestJolt),
				Stream.runSum,
			);

		yield* Console.info(`The password is ${totalJoltage}`);
	});

BunRuntime.runMain(
	program().pipe(
		Effect.provide(Logger.pretty),
		Effect.provide(BankJoltageCalc.layer),
		Effect.provide(BunContext.layer),
		Effect.catchAll((error) => Console.error("Error: ", error)),
	),
);
