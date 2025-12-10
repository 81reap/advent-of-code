import { Context, Layer } from "effect";

// biome-ignore format: string spacing matters here
const SampleInput = 
`123 328  51 64 
 45 64  387 23 
  6 98  215 314
*   +   *   +  `;

export class TestConstants extends Context.Tag("TestConstants")<
	TestConstants,
	{
		readonly SampleInput: typeof SampleInput;
	}
>() {
	static readonly layer = Layer.succeed(TestConstants, {
		SampleInput,
	});
}
