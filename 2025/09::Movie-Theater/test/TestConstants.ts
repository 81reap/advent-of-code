import { Effect, Schema } from "effect";
import { InputSchema } from "@/types";

const SampleInput = `7,1
11,1
11,7
9,7
9,5
2,5
2,3
7,3`;

// biome-ignore format: string spacing matters here
const ParsedSampleInput = Schema.decodeUnknown(InputSchema)([
  [ 7, 1 ],
  [ 11, 1 ],
  [ 11, 7 ],
  [ 9, 7 ],
  [ 9, 5 ],
  [ 2, 5 ],
  [ 2, 3 ],
  [ 7, 3 ],
])

export class TestConstants extends Effect.Service<TestConstants>()(
	"TestConstants",
	{
		succeed: {
			SampleInput,
			ParsedSampleInput,
		},
		accessors: true,
	},
) {}
