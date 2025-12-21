import { Request, Response } from "express";
import { getCategories as getCategoriesModel, createCategory as createCategoryModel, updateCategory as updateCategoryModel, deleteCategory as deleteCategoryModel } from "../models/category.model";
import { Category, isCategory } from "../types/Category";
import { ObjectId } from "mongodb";

export async function getCategories(req: Request, res: Response) {
    try {
        const categories = await getCategoriesModel();
        res.status(200).json(categories);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error al obtener las categorías", error: error });
    }
}

export async function createCategory(req: Request<{}, {}, Category>, res: Response) {
    const category: Category = req.body;
    if (!isCategory(category)) {
        return res.status(400).json({ message: "Datos de categoría inválidos" });
    }
    try {
        const result = await createCategoryModel(category);
        res.status(201).json(result);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error al crear la categoría", error: error });
    }
}

export async function updateCategory(req: Request<{ id: string }, {}, Category>, res: Response) {
    const categoryId = new ObjectId(req.params.id);
    const category: Category = req.body;
    if (!isCategory(category)) {
        return res.status(400).json({ message: "Datos de categoría inválidos" });
    }
    try {
        const result = await updateCategoryModel(categoryId, category);
        res.status(200).json(result);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error al actualizar la categoría", error: error });
    }
}

export async function deleteCategory(req: Request<{ id: string }>, res: Response) {
    const categoryId = new ObjectId(req.params.id);
    try {
        const result = await deleteCategoryModel(categoryId);
        res.status(200).json(result);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error al eliminar la categoría", error: error });
    }
}