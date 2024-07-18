import { Router } from "express";
import {
  renderCreateForm,
  create,
  renderUpdateForm,
  update,
} from "../controllers/category.js";

const router = Router();

router.get("/create", renderCreateForm);
router.post("/", create);
router.get("/update", renderUpdateForm);
router.post("/update", update);

export default router;
