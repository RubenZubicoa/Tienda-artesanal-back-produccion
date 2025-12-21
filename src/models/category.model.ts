import { clientDB, database } from "../db/database";
import { Category } from "../types/Category";

export async function getCategories() {
    try {
        await clientDB.connect();
        const categories = await database.collection("Categories").find().toArray();
        await clientDB.close();
        return categories;
    } catch (error) {
        await clientDB.close();
        console.error(error);
        throw new Error("Error al obtener las categorías");
    }
}

export async function createCategory(category: Category) {
    try {
        await clientDB.connect();
        const result = await database.collection("Categories").insertOne(category);
        await clientDB.close();
        return result;
    } catch (error) {
        await clientDB.close();
        console.error(error);
        throw new Error("Error al crear la categoría");
    }
}

export async function updateCategory(categoryId: Category['_id'], category: Category) {
    try {
        await clientDB.connect();
        const result = await database.collection("Categories").updateOne({ _id: categoryId }, { $set: category });
        await clientDB.close();
        return result;
    } catch (error) {
        await clientDB.close();
        console.error(error);
        throw new Error("Error al actualizar la categoría");
    }
}

export async function deleteCategory(categoryId: Category['_id']) {
    try {
        await clientDB.connect();
        const result = await database.collection("Categories").updateOne({ _id: categoryId }, { $set: { isDeleted: true } });
        await clientDB.close();
        return result;
    } catch (error) {
        await clientDB.close();
        console.error(error);
        throw new Error("Error al eliminar la categoría");
    }
}