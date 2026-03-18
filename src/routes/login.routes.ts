import { Router } from "express";
import { login, verifyToken } from "../controllers/login.controller";

export const loginRoutes = Router();

loginRoutes.post('/', login);
loginRoutes.post('/verify-token', verifyToken);

export default loginRoutes;