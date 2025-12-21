import { ObjectId } from "mongodb";

export type Category = {
    _id?: ObjectId;
    name: string;
}

export function isCategory(category: unknown): category is Category {
    return (
        category !== undefined &&
        category !== null &&
        typeof category === "object" &&
        "name" in category
    );
}