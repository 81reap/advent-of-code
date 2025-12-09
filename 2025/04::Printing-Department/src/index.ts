import { FileSystem } from "@effect/platform";
import { BunContext, BunRuntime } from "@effect/platform-bun";
import { Chunk, Console, Effect, Logger, Schema, Stream } from "effect";
import { DiagramManager } from "@/DiagramManager";

const program = () =>
	Effect.gen(function* () {
		const fs = yield* FileSystem.FileSystem;
		const diagramManager = yield* DiagramManager;

		const diagram = yield* Schema.decodeUnknown(
			Schema.Array(Schema.Array(Schema.Number)),
		)(
			yield* fs.stream("input.txt").pipe(
				Stream.decodeText(),
				Stream.splitLines,
				Stream.map(diagramManager.parseDiagramLine),
				Stream.runCollect,
				Effect.map((chunk) => Chunk.toArray(chunk)),
			),
		);

		const accessibleRolls = diagramManager.getAccessiblePaper(diagram);
		yield* Console.info(`The password is ${accessibleRolls}`);
	});

BunRuntime.runMain(
	program().pipe(
		Effect.provide(Logger.pretty),
		Effect.provide(DiagramManager.layer),
		Effect.provide(BunContext.layer),
		Effect.catchAll((error) => Console.error("Error: ", error)),
	),
);
