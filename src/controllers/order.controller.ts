import { Request, Response } from "express";
import { getOrders as getOrdersModel, getOrdersByManufacturerId as getOrdersByManufacturerIdModel, getOrderById as getOrderByIdModel, insertOrder as insertOrderModel, updateOrder as updateOrderModel, deleteOrder as deleteOrderModel, getOrdersByEmail as getOrdersByEmailModel } from "../models/order.model";
import { AddOrder, isAddOrder, isOrder, Order } from "../types/Order";
import { ObjectId } from "mongodb";

export async function getOrders(req: Request, res: Response) {
    try {
        const orders = await getOrdersModel();
        res.status(200).json(orders);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error al obtener las ordenes", error: error });
    }
}

export async function getOrdersByManufacturerId(req: Request<{ id: string }>, res: Response) {
    const manufacturerId = req.params.id;
    try {
        const orders = await getOrdersByManufacturerIdModel(manufacturerId);
        res.status(200).json(orders);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error al obtener las ordenes", error: error });
    }
}

export async function getOrdersByEmail(req: Request<{ email: string }>, res: Response) {
    const email = req.params.email;
    try {
        const orders = await getOrdersByEmailModel(email);
        res.status(200).json(orders);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error al obtener las ordenes", error: error });
    }
}

export async function getOrderById(req: Request<{ id: string }>, res: Response) {
    const orderId = new ObjectId(req.params.id);
    try {
        const order = await getOrderByIdModel(orderId);
        res.status(200).json(order);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error al obtener la orden", error: error });
    }
}

export async function createOrder(req: Request<{}, {}, AddOrder>, res: Response) {
    const order: AddOrder = req.body;
    if (!isAddOrder(order)) {
        return res.status(400).json({ message: "Datos de orden inválidos" });
    }
    try {
        const result = await insertOrderModel(order);
        res.status(201).json(result);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error al crear la orden", error: error });
    }
}

export async function updateOrder(req: Request<{ id: string }, {}, Order>, res: Response) {
    const orderId = new ObjectId(req.params.id);
    const order: Order = req.body;
    
    try {
        const result = await updateOrderModel(orderId, order);
        res.status(200).json(result);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error al actualizar la orden", error: error });
    }
}

export async function deleteOrder(req: Request<{ id: string }>, res: Response) {
    const orderId = new ObjectId(req.params.id);
    
    try {
        const result = await deleteOrderModel(orderId);
        res.status(200).json(result);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error al eliminar la orden", error: error });
    }
}