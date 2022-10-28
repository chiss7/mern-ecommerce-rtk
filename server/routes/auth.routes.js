import { Router } from "express";
import { Auth } from "../controllers/auth.controllers.js";
import { auth, isAdmin } from "../middlewares/auth.js";

const router = Router();

router.post("/register", Auth.register);
router.post("/login", Auth.login);
router.put("/profile", auth, Auth.updateUser);
router.get("/stats", isAdmin, Auth.getStats);

export default router;
