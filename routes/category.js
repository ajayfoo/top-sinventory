import { Router } from "express";
import {
  renderCreateForm,
  create,
  renderUpdateForm,
  update,
  renderConfirmDeletePage,
  remove,
} from "../controllers/category.js";

const router = Router();

router.get("/create", renderCreateForm);
router.post("/", create);
router.get("/update", renderUpdateForm);
router.post("/update", update);
router.get("/delete", renderConfirmDeletePage);
router.post("/deleteWithInstruments", remove);

export default router;
