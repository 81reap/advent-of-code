import { Context, Layer } from "effect";

// biome-ignore format: manually formatted array
const neighborDeltas = [
	[-1, -1],	[0, -1],	[1, -1],
	[-1, 0],						[1, 0],
	[-1, 1],	[0, 1],		[1, 1],
];

const getAccessiblePaper = (diagram: ReadonlyArray<ReadonlyArray<number>>) => {
	const newDiagram = JSON.parse(JSON.stringify(diagram));
	const numAccessiblePapers = diagram.reduce(
		(total, row, y) =>
			total +
			row.reduce((rowTotal, cell, x) => {
				const numOfNeighbors = neighborDeltas.reduce((acc, [dx, dy]) => {
					if (dx === undefined || dy === undefined)
						throw Error(`Missing { dx: ${dx}, dy: ${dy}}`);
					const cell = diagram[y + dy]?.[x + dx] ?? 0;
					return acc + cell;
				}, 0);

				const isRollOfPaper = Boolean(cell);
				const isEnoughNeighbors = numOfNeighbors < 4;
				if (isRollOfPaper && isEnoughNeighbors) newDiagram[y][x] = 0;
				return rowTotal + Number(isRollOfPaper && isEnoughNeighbors);
			}, 0),
		0,
	);
	return [numAccessiblePapers, newDiagram];
};

const removeAllPapers = (diagram: ReadonlyArray<ReadonlyArray<number>>) => {
	var totalPapersRemoved = 0;
	while (getAccessiblePaper(diagram)[0] > 0) {
		const [numAccessiblePapers, newDiagram] = getAccessiblePaper(diagram);
		totalPapersRemoved = totalPapersRemoved + numAccessiblePapers;
		diagram = newDiagram;
	}
	return [totalPapersRemoved, diagram];
};

const parseDiagramLine = (line: string) =>
	line.split("").map<number>((char) => Number(char === "@"));

export class DiagramManager extends Context.Tag("DiagramManager")<
	DiagramManager,
	{
		readonly parseDiagramLine: typeof parseDiagramLine;
		readonly removeAllPapers: typeof removeAllPapers;
		readonly getAccessiblePaper: typeof getAccessiblePaper;
	}
>() {
	static readonly layer = Layer.succeed(DiagramManager, {
		parseDiagramLine,
		getAccessiblePaper,
		removeAllPapers,
	});
}
