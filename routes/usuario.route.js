import { userMethod } from "../controllers/usuario.controller.js";
import { Router } from "express";

const router = Router();

router.get("/", userMethod.getAllUsers);
router.get("/:id", userMethod.getOneUser);
router.post("/", userMethod.postOneUser);
router.delete("/:id", userMethod.deleteOneUser);
router.put("/:id", userMethod.putOneUser);

export default router;
