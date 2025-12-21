import { clientDB, database } from "../db/database";
import { Manufacturer } from "../types/Manufacturer";
import { Product } from "../types/Product";

export async function getProducts() {
    try {
        await clientDB.connect();
        const products = await database.collection("Products").find().toArray();
        await clientDB.close();
        return products;
    } catch (error) {
        await clientDB.close();
        console.error(error);
        throw new Error("Error al obtener los productos");
    }
}

export async function getProductsByManufacturerId(manufacturerId: string) {
    try {
        await clientDB.connect();
        const products = await database.collection("Products").find({ manufacturerId: manufacturerId }).toArray();
        await clientDB.close();
        return products;
    } catch (error) {
        await clientDB.close();
        console.error(error);
        throw new Error("Error al obtener los productos");
    }
}

export async function insertProduct(product: Product) {
    try {
        await clientDB.connect();
        product.createdAt = Date.now();
        const result = await database.collection("Products").insertOne(product);
        await clientDB.close();
        return result;
    } catch (error) {
        await clientDB.close();
        console.error(error);
        throw new Error("Error al crear el producto");
    }
}

export async function updateProduct(productId: Product['_id'], product: Product) {
    try {
        await clientDB.connect();
        product.updatedAt = Date.now();
        const result = await database.collection("Products").updateOne({ _id: productId }, { $set: product });
        await clientDB.close();
        return result;
    } catch (error) {
        await clientDB.close();
        console.error(error);
        throw new Error("Error al actualizar el producto");
    }
}

export async function deleteProduct(productId: Product['_id']) {
    try {
        await clientDB.connect();
        const result = await database.collection("Products").deleteOne({ _id: productId });
        await clientDB.close();
        return result;
    } catch (error) {
        await clientDB.close();
        console.error(error);
        throw new Error("Error al eliminar el producto");
    }
}