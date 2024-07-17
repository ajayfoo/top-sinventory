import { Router } from "express";
import indexController from "../controllers/index.js";
const router = Router();

/* GET home page. */
router.get("/", indexController.renderIndex);

export default router;
