import { Router } from "express";
import multer from "../libs/multer";
import { addProductImages } from "../controllers/product-images.controller";

const productImagesRoutes = Router();

productImagesRoutes.post('/', multer.array('images'), addProductImages);

export default productImagesRoutes;