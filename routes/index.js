import { Router } from "express";
import { renderFilterResults, renderIndex } from "../controllers/index.js";
import { instruments, categories } from "../test/sampleData.js";
const router = Router();

/* GET home page. */
router.get("/", renderIndex);
router.post("/", renderFilterResults);

export default router;
