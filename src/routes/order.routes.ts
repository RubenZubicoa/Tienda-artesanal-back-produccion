import { Router } from "express";
import { createOrder, deleteOrder, getOrders, getOrdersByManufacturerId, getOrderById, updateOrder, getOrdersByEmail, getOrdersByFilters } from "../controllers/order.controller";

export const orderRoutes = Router();

orderRoutes.get('/', getOrders);
orderRoutes.post('/criteria', getOrdersByFilters);
orderRoutes.get('/:id', getOrderById);
orderRoutes.get('/manufacturer/:id', getOrdersByManufacturerId);
orderRoutes.get('/email/:email', getOrdersByEmail);
orderRoutes.post('/', createOrder);
orderRoutes.put('/:id', updateOrder);
orderRoutes.delete('/:id', deleteOrder);

export default orderRoutes;