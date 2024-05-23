import { userMethod } from "../controllers/usuario.controller.js";
import { Router } from "express";

const router = Router();

router.get("/", userMethod.getAllUsers);
router.post("/", userMethod.postOneUser);

export default router;
