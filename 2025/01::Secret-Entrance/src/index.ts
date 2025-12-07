import { Console, Effect, Schema } from "effect";
import { FileSystem } from "@effect/platform";
import { BunContext, BunRuntime } from "@effect/platform-bun";
import { DialCounter } from "@/dialCounter";

const Line = Schema.TemplateLiteralParser(
  Schema.Literal("L", "R"),
  Schema.NumberFromString
);

const readFileByLines = (
  filePath: string
) => Effect.gen(function* () {
  const fs = yield* FileSystem.FileSystem;
  const content = yield* fs.readFileString(filePath, "utf8");
  return yield* Schema.decodeUnknown(
    Schema.Array(Line)
  )(content.split("\n"));
});

const program = () => Effect.gen(function* () {
  const steps = yield* readFileByLines("input.txt")
  const dail = new DialCounter(50, 100);
  var zeros = 0;
  for (const [op, number] of steps) {
    zeros = 'L' === op ? 
      zeros + dail.decrement(number) : 
      zeros + dail.increment(number);
  }
  yield* Console.info(`The password is ${zeros}`);
})

BunRuntime.runMain(program().pipe(
  Effect.provide(BunContext.layer),
  Effect.catchAll((error) => Console.error("Error: ", error))
))