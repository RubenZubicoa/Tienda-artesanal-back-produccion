import { ObjectId } from "mongodb";
import { Product } from "./Product";

export type Order = {
    _id?: ObjectId;
    username: string;
    address: string;
    phone: string;
    email: string;
    products: {
        productId: Product['_id'];
        quantity: number;
        price: number;
    }[];
    total: number;
    status: string;
    createdAt: number;
    updatedAt?: number;
}

export function isOrder(order: unknown): order is Order {
    return (
        order !== undefined &&
        order !== null &&
        typeof order === "object" &&
        "username" in order &&
        "address" in order &&
        "phone" in order &&
        "email" in order &&
        "products" in order &&
        "total" in order &&
        "status" in order
    );
}