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
        return user;
    } catch (error) {
        console.error(error);
        throw new Error("Error al iniciar sesión");
    }
}

