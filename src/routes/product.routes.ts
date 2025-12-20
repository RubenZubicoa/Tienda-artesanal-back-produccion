import { Router } from "express";
import { getProducts, createProduct, deleteProduct, updateProduct } from "../controllers/product.controller";

export const productRoutes = Router();

productRoutes.get('/', getProducts);

productRoutes.post('/', createProduct);

productRoutes.put('/:id', updateProduct);

productRoutes.delete('/:id', deleteProduct);

export default productRoutes;