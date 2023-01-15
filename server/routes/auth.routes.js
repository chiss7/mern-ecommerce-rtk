import { Router } from "express";
import { Auth } from "../controllers/auth.controllers.js";
import { auth, isAdmin } from "../middlewares/auth.js";

const router = Router();

router.get("/", isAdmin, Auth.getUsers);
router.delete("/:id", isAdmin, Auth.deleteUser);
router.get("/stats", isAdmin, Auth.getStats);
router.get("/:id", isAdmin, Auth.getUserById);
router.patch("/profile", auth, Auth.updateUser);
router.patch("/:id", isAdmin, Auth.updateUser);
router.post("/register", Auth.register);
router.post("/login", Auth.login);

export default router;
