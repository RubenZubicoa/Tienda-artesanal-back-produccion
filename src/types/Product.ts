import { ObjectId } from "mongodb";

export type Product = {
    _id?: ObjectId;
    manufacturerId: string;
    name: string;
    description?: string;
    price: number;
    stock: number;
    category: string;
    images: string[];
    createdAt?: number;
    updatedAt?: number;
}

export function isProduct(product: unknown): product is Product {
    return (
        product !== undefined &&
        product !== null &&
        typeof product === "object" &&
        "manufacturerId" in product &&
        "name" in product &&
        "description" in product &&
        "price" in product &&
        "stock" in product &&
        "category" in product &&
        "images" in product &&
        Array.isArray(product.images)
    );
}