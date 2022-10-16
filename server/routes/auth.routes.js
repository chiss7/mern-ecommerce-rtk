import { Router } from "express";
import { Auth } from "../controllers/auth.controllers.js";

const router = Router();

router.post('/register', Auth.register);
router.post('/login', Auth.login);

export default router;