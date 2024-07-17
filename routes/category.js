import { Router } from "express";
import { renderCreateForm, create } from "../controllers/category.js";

const router = Router();

router.get("/create", renderCreateForm);
router.post("/", create);

export default router;
