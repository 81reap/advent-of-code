import { Console, Effect } from "effect";
import { FileSystem } from "@effect/platform";
import { BunContext, BunRuntime } from "@effect/platform-bun";
import { DialCounter } from "@/dailCounter";

const readFileByLines = (
  filePath: string
) => Effect.gen(function* () {
  const fs = yield* FileSystem.FileSystem;
  const content = yield* fs.readFileString(filePath, "utf8");
  return content.split(/\r?\n/);
});

const program = () => Effect.gen(function* () {
  const lines = yield* readFileByLines("input.txt")
  const dail = new DialCounter(50, 100);
  var zeros = 0;
  for (const line of lines) {
    const number = Number(line.slice(1))
    'L' === line[0] ? dail.decrement(number) : dail.increment(number);
    if (0 === dail.getCount()) zeros++
  }
  yield* Console.info(`The password is ${zeros}`);
})

BunRuntime.runMain(program().pipe(
  Effect.provide(BunContext.layer),
  Effect.catchAll((error) => Console.error("Error: ", error))
))