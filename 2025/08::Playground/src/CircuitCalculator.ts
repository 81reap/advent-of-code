import { Effect, Graph, pipe } from "effect";
import type { InputSchema, Point } from "@/types";

const distance = (from: typeof Point.Type, to: typeof Point.Type) =>
	pipe(
		from.reduce((agg, value, index) => agg + (value - to[index]!) ** 2, 0),
		(tmp) => Math.sqrt(tmp),
	);

const topKShortestDistances = (
	junctionBoxes: typeof InputSchema.Type,
	k: number,
) => {
	const distances: {
		distance: number;
		from: typeof Point.Type;
		to: typeof Point.Type;
	}[] = [];

	junctionBoxes.forEach((pointFrom, indexFrom) => {
		junctionBoxes.slice(indexFrom + 1).forEach((pointTo) => {
			distances.push({
				distance: distance(pointFrom, pointTo),
				from: pointFrom,
				to: pointTo,
			});
		});
	});
	return distances.sort((a, b) => a.distance - b.distance).splice(0, k);
};

const largestCircuit = (
	junctionBoxes: typeof InputSchema.Type,
	maxCables: number,
) => {
	const distances = topKShortestDistances(junctionBoxes, maxCables);

	const graph = Graph.undirected<typeof Point.Type, number>((mutable) => {
		junctionBoxes.forEach((point) => void Graph.addNode(mutable, point));
		distances.forEach((edge) => {
			const [from, to] = Graph.findNodes(
				mutable,
				(node) => node === edge.from || node === edge.to,
			);
			Graph.addEdge(mutable, from!, to!, edge.distance);
		});
	});

	// connected components == edges (ie: cables)
	return Graph.connectedComponents(graph)
		.map((tree) => tree.length)
		.sort((a, b) => b - a)
		.slice(0, 3)
		.reduce((agg, treeHeight) => agg * treeHeight, 1);
};

export class CircuitCalculator extends Effect.Service<CircuitCalculator>()(
	"CircuitCalculator",
	{
		sync: () => ({
			distance,
			topKShortestDistances,
			largestCircuit,
		}),
	},
) {}
