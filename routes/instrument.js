import { Router } from "express";
import { render, renderUpdateForm, update } from "../controllers/instrument.js";

const router = Router();

router.get("/:id", render);
router.get("/:id/update", renderUpdateForm);
router.post("/:id/update", update);

export default router;
