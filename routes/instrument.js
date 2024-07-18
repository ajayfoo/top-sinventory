import { Router } from "express";
import {
  remove,
  render,
  renderUpdateForm,
  update,
} from "../controllers/instrument.js";

const router = Router();

router.get("/:id", render);
router.get("/:id/update", renderUpdateForm);
router.post("/:id/update", update);
router.post("/:id/delete", remove);

export default router;
