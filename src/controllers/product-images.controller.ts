import { Request, Response } from "express";
import { AddProductImages, isAddProductImages } from "../types/ProductImages";
import { addProductImages as addProductImagesModel } from "../models/product-images.model";
import { uploadToCloudinary } from "../libs/cloudinary";

export async function addProductImages(req: Request, res: Response) {
    const productId = req.body.productId;
    const images = req.files as Express.Multer.File[];
    const productImages: AddProductImages = { productId, images: [] };
    if (!isAddProductImages(productImages)) {
        return res.status(400).json({ message: "Datos de imágenes de producto inválidos" });
    }
    try {
        const imagesUrls = [];
        for await (const image of images) {
            const imageUrl = await uploadToCloudinary(image);
            if (!imageUrl) {
                return res.status(400).json({ message: "Error al subir la imagen del producto" });
            }
            imagesUrls.push(imageUrl);
        }
        productImages.images = imagesUrls;
        productImages.productId = productId;
        const result = await addProductImagesModel(productImages);
        res.status(201).json(result);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error al agregar las imágenes del producto", error: error });
    }
}   