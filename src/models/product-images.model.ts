import { clientDB, database } from "../db/database";
import { AddProductImages } from "../types/ProductImages";

export async function addProductImages(productImages: AddProductImages) {
    try {
        await clientDB.connect();
        const result = await database.collection("ProductImages").insertOne(productImages);
        await clientDB.close();
        return result;
    } catch (error) {
        await clientDB.close();
        console.error(error);
        throw new Error("Error al agregar las imágenes del producto");
    }
}