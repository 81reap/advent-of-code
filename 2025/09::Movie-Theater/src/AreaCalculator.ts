import { Effect } from "effect";
import type { InputSchema, Point } from "@/types";

const getArea = (pointA: typeof Point.Type, pointB: typeof Point.Type) => {
	const width = Math.abs(pointA[0] - pointB[0]) + 1;
	const height = Math.abs(pointA[1] - pointB[1]) + 1;
	return width * height;
};

const getMaxArea = (points: typeof InputSchema.Type) => {
	return points.reduce(
		(maxArea, pointA, index) =>
			Math.max(
				maxArea,
				points
					.slice(index + 1)
					.reduce(
						(subMaxArea, pointB) =>
							Math.max(subMaxArea, getArea(pointA, pointB)),
						0,
					),
			),
		0,
	);
};

export class AreaCalculator extends Effect.Service<AreaCalculator>()(
	"AreaCalculator",
	{
		sync: () => ({
			getArea,
			getMaxArea,
		}),
	},
) {}
