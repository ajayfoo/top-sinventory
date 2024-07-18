import { Router } from "express";
import { renderFilterResults, renderIndex } from "../controllers/index.js";
const router = Router();

/* GET home page. */
router.get("/", renderIndex);
router.get("/filter", renderFilterResults);

export default router;
