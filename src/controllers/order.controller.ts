import { Request, Response } from "express";
import { getOrders as getOrdersModel, getOrdersByManufacturerId as getOrdersByManufacturerIdModel, getOrderById as getOrderByIdModel, insertOrder as insertOrderModel, updateOrder as updateOrderModel, deleteOrder as deleteOrderModel, getOrdersByEmail as getOrdersByEmailModel, getOrdersByFilters as getOrdersByFiltersModel } from "../models/order.model";
import { AddOrder, isAddOrder, Order, OrderFilters } from "../types/Order";
import { ObjectId } from "mongodb";
import { sendEmail } from "../libs/nodemailer";
import { getManufacturerById as getManufacturerByIdModel } from "../models/manufacturer.model";
import { getProductById as getProductByIdModel } from "../models/product.model";
import { Manufacturer } from "../types/Manufacturer";

export async function getOrders(req: Request, res: Response) {
    try {
        const orders = await getOrdersModel();
        res.status(200).json(orders);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error al obtener las ordenes", error: error });
    }
}

export async function getOrdersByFilters(req: Request<{}, {}, OrderFilters>, res: Response) {
    const filters: OrderFilters = req.body;
    try {
        const orders = await getOrdersByFiltersModel(filters);
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
        await sendEmailOrderCreated(order);
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


async function sendEmailOrderCreated(order: AddOrder) {
    const manufacturer = await getManufacturerByIdModel(order.manufacturerId);

    if (manufacturer) {
        await sendEmail(manufacturer.email, "Pedido creado", createMailBodyOfManufacturer(order));
        await sendEmail(order.email, "Nuevo pedido", createMailBodyOfClient(manufacturer));
    }
}

function createMailBodyOfClient(manufacturer: Manufacturer) {
    const body = `<b>Pedido creado correctamente</b><br><br>
    <b>Nombre del artesano:</b> ${manufacturer.name}<br><br>
    <b>Email del artesano:</b> ${manufacturer.email}<br><br>
    <b>Teléfono del artesano:</b> ${manufacturer.phone}<br><br>
    <p>El pedido se ha creado correctamente, el artesano se pondra en contacto contigo para coordinar la entrega.<p/>
    <p>Gracias por tu compra!</p>
    <p>Puedes ver los detalles de tu pedido en la seccion de "Mis Pedidos" de tu perfil.</p>
    `
    return body;
}

function createMailBodyOfManufacturer(order: AddOrder) {
    const body = `<b>Pedido creado correctamente</b><br><br>
    <b>Nombre del cliente:</b> ${order.username}<br><br>
    <b>Email del cliente:</b> ${order.email}<br><br>
    <b>Teléfono del cliente:</b> ${order.phone}<br><br>
    <p>Gracias por tu compra!</p>
    <p>Puedes ver los detalles de tu pedido en la seccion de "Pedidos" de la aplicación.</p>
    `
    return body;
}