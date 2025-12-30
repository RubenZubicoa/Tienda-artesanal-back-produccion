import { Router } from "express";
import { login } from "../controllers/login.controller";

export const loginRoutes = Router();

loginRoutes.post('/', login);

export default loginRoutes;