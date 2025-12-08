import { FileSystem } from "@effect/platform";
import { BunContext, BunRuntime } from "@effect/platform-bun";
import { Console, Effect, Schema } from "effect";
import { getSillyNumbersInRange } from "@/SillyNumbersCache";

const Range = Schema.TemplateLiteralParser(
	Schema.NumberFromString,
	Schema.Literal("-"),
	Schema.NumberFromString,
);
const readFile = () =>
	Effect.gen(function* () {
		const fs = yield* FileSystem.FileSystem;
		const conent = yield* fs.readFileString("input.txt", "utf8");
		return yield* Schema.decodeUnknown(Schema.Array(Range))(conent.split(","));
	});

const program = () =>
	Effect.gen(function* () {
		const ranges = yield* readFile();
		var sum = 0;
		for (const [min, _, max] of ranges) {
			const invalidIds = yield* getSillyNumbersInRange(min, max);
			sum = sum + invalidIds.reduce((acc, item) => acc + item, 0);
		}
		yield* Console.info(`The password is ${sum}`);
		return sum;
	});

BunRuntime.runMain(
	program().pipe(
		Effect.provide(BunContext.layer),
		Effect.catchAll((error) => Console.error("Error: ", error)),
	),
);
