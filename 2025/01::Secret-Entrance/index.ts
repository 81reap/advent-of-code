import { Effect } from "effect";

const program = Effect.gen(function* () {
  yield* Effect.logInfo("Hello from Effect on Bun!")
})

Effect.runPromise(program)