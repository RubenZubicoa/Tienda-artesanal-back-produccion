import { Request, Response } from "express";
import { AddProductImages, isAddProductImages } from "../types/ProductImages";
import { updateProductImages as updateProductImagesModel } from "../models/product-images.model";
import { uploadToCloudinary } from "../libs/cloudinary";

export async function addProductImages(req: Request, res: Response) {
    const productId = req.body.productId;
    const oldImages: string = req.body.oldImages;
    const images = req.files as Express.Multer.File[];
    try {
        const imagesUrls = [...JSON.parse(oldImages)];
        for await (const image of images) {
            const imageUrl = await uploadToCloudinary(image);
            if (!imageUrl) {
                return res.status(400).json({ message: "Error al subir la imagen del producto" });
            }
            imagesUrls.push(imageUrl);
        }
        const result = await updateProductImagesModel(productId, imagesUrls);
        res.status(201).json(result);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error al agregar las imágenes del producto", error: error });
    }
}   