import { Request, Response } from "express";
import { getProducts as getProductsModel, insertProduct as insertProductModel, updateProduct as updateProductModel, deleteProduct as deleteProductModel } from "../models/product.model";
import { Product } from "../types/Product";
import { ObjectId } from "mongodb";

export async function getProducts(req: Request, res: Response) {
    try {
        const products = await getProductsModel();
        res.status(200).json(products);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error al obtener los productos", error: error });
    }
}

export async function createProduct(req: Request<{}, {}, Product>, res: Response) {
    try {
        const product = await insertProductModel(req.body);
        res.status(201).json(product);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error al crear el producto", error: error });
    }
}

export async function updateProduct(req: Request<{ id: string }, {}, Product>, res: Response) {
    const productId = new ObjectId(req.params.id);
    const product: Product = req.body;
    try {
        const result = await updateProductModel(productId, product);
        res.status(200).json(result);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error al actualizar el producto", error: error });
    }
}

export async function deleteProduct(req: Request<{ id: string }>, res: Response) {
    const productId = req.params.id;
    try {
        const result = await deleteProductModel(new ObjectId(productId));
        res.status(200).json(result);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error al eliminar el producto", error: error });
    }
}