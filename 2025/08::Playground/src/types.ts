import { Schema } from "effect";

export const Point = Schema.Tuple(Schema.Number, Schema.Number, Schema.Number);
export const InputSchema = Schema.NonEmptyArrayEnsure(Point);
