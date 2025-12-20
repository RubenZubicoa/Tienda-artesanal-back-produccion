import { Request, Response } from "express";
import { database } from "../db/database";
import { isManufacturer, Manufacturer } from "../types/Manufacturer";
import { insertManufacturer, getManufacturers as getManufacturersModel, updateManufacturer as updateManufacturerModel, deleteManufacturer as deleteManufacturerModel } from "../models/manufacturer.model";
import { ObjectId } from "mongodb";

export async function getManufacturers(req: Request, res: Response) {
  try {
    const manufacturers = await getManufacturersModel();
    res.status(200).json(manufacturers);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al obtener los artesanos", error: error });
  }
}

export async function createManufacturer(
  req: Request<{}, {}, Manufacturer>,
  res: Response
) {
  const manufacturer: Manufacturer = req.body;
  if (!isManufacturer(manufacturer)) {
    return res.status(400).json({ message: "Datos de artesano inválidos" });
  }
  try {
    const result = await insertManufacturer(manufacturer);
    res.status(201).json(result);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al crear el artesano", error: error });
  }
}

export async function updateManufacturer(req: Request<{ id: string }, {}, Manufacturer>, res: Response) {
  const manufacturerId = new ObjectId(req.params.id);
  const manufacturer: Manufacturer = req.body;
  if (!isManufacturer(manufacturer)) {
    return res.status(400).json({ message: "Datos de artesano inválidos" });
  }
  try {
    const result = await updateManufacturerModel(manufacturerId, manufacturer);
    res.status(200).json(result);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al actualizar el artesano", error: error });
  }
}

export async function deleteManufacturer(req: Request<{ id: string }>, res: Response) {
  const manufacturerId = req.params.id;
  try {
    const result = await deleteManufacturerModel(new ObjectId(manufacturerId));
    res.status(200).json(result);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al eliminar el artesano", error: error });
  }
}