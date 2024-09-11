import { Router } from "express";
const router = Router();
import * as controller from "../controllers/product.controller";
import {
  validateGetProduct,
  validatePostProduct,
} from "../middlewares/validators/product.validator";

router.get("/", controller.getAll);
router.post("/", validatePostProduct, controller.create);
router.get("/:id", validateGetProduct, controller.getById);
router.put(
  "/:id",
  [validateGetProduct, validatePostProduct],
  controller.update
);
router.delete("/:id", validateGetProduct, controller.remove);

export default router;
