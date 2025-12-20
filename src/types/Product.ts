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
    createdAt: number;
    updatedAt?: number;
}