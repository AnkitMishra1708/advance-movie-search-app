import { Router } from "express";
import { chatWithAI } from "../controllers/chat.controller.js";

const router = Router();

router.post("/chatWithAi", chatWithAI);

export default router;