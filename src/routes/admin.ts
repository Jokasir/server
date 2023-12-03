//file routes/admin.ts
import express from "express";
import { create_admin, login_admin } from "../controllers/admin/user";
import authMiddleware from "../middleware/authMiddleware";
import { create_store } from "../controllers/admin/store";
import authorizedUser from "../middleware/authorizedUser";

const router = express.Router();

router.post("/admin-user", create_admin);
router.post("/admin-login", login_admin);

router.use(authMiddleware as any);

router.post("/admin-store",authorizedUser as any, create_store as any);

export default router;
