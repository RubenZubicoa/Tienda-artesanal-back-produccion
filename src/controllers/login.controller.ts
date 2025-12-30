import { Request, Response } from "express";
import { login as loginModel } from "../models/login.model";

export async function login(req: Request<{}, {}, { email: string, password: string }>, res: Response) {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(400).json({ message: "Email y contraseña son requeridos" });
    }
    try {
        const user = await loginModel(email, password);
        if (!user) {
            return res.status(401).json({ message: "Contraseña incorrecta" });
        }
        res.status(200).json(user);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error al iniciar sesión", error: error });
    }
}