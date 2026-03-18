import { generateToken, verifyToken as verifyTokenJWT } from "../libs/jwt";
import { User } from "../types/User";
import { comparePassword } from "../utils/password-utils";
import { getUserByEmail } from "./user.model";

export async function login(email: string, password: string) {
    try {
        const user = await getUserByEmail(email);
        if (!user) {
            return null;
        }
        const isPasswordValid = await comparePassword(password, user.password);
        if (!isPasswordValid) {
            return null;
        }
        const token = generateToken(user as User);
        return { user, token };
    } catch (error) {
        console.error(error);
        throw new Error("Error al iniciar sesión");
    }
}

export async function verifyToken(token: string) {
    try {
        const user = verifyTokenJWT(token);
        return user;
    } catch (error) {
        console.error(error);
        throw new Error("Error al verificar el token");
    }
}

