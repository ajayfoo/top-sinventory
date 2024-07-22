import { Router } from "express";
import { renderLoginPage, login } from "../controllers/login.js";

const router = Router();

router.get("/", renderLoginPage);

router.post("/", login);

export default router;
