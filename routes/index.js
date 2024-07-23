import { Router } from "express";
import { renderFilterResults, renderIndex } from "../controllers/index.js";
import { logout } from "../controllers/login.js";
const router = Router();

/* GET home page. */
router.get("/", renderIndex);
router.get("/filter", renderFilterResults);
router.post("/logout", logout);

export default router;
