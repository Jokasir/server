import express from "express";
import { create_admin, login_admin } from "../controllers/admin/adminuser";

const router = express.Router();

router.post("/admin-user", create_admin);
router.post("/admin-login", login_admin);

export default router;
