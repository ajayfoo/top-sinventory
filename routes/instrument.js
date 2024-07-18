import { Router } from "express";
import {
  create,
  remove,
  removeMultiple,
  render,
  renderCreateForm,
  renderUpdateForm,
  update,
} from "../controllers/instrument.js";

const router = Router();

router.get("/", renderCreateForm);
router.post("/create", create);
router.get("/:id", render);
router.get("/:id/update", renderUpdateForm);
router.post("/:id/update", update);
router.post("/:id/delete", remove);
router.post("/deleteMultiple", removeMultiple);

export default router;
