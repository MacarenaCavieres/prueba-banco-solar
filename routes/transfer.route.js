import { Router } from "express";
import { transMethod } from "../controllers/transfer.controller.js";

const router = Router();

router.get("/", transMethod.getAllTrans);
router.post("/", transMethod.postOneTrans);

export default router;
