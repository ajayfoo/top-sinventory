import { Router } from "express";
import {
  renderCreateForm,
  create,
  renderUpdateForm,
  update,
  remove,
  removeWithInstruments,
} from "../controllers/category.js";

const router = Router();

router.get("/create", renderCreateForm);
router.post("/", create);
router.get("/update", renderUpdateForm);
router.post("/update", update);
router.post("/delete", remove);
router.post("/deleteWithInstruments", removeWithInstruments);

export default router;
