import { Router } from "express";
import { renderIndex } from "../controllers/index.js";
const router = Router();

/* GET home page. */
router.get("/", renderIndex);

export default router;
