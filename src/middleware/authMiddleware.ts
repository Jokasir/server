//file authMiddleware.ts
import { Request, Response, NextFunction } from "express";
import { verifyAccessTokenAdmin } from "../utils/jwt";
import { getUserById } from "../services/admin/user";
import { CustomRequest } from "../schema/type";

export default async (req: CustomRequest, res: Response, next: NextFunction) => {
  try {
    const { access_token } = req.headers as { access_token?: string };

    if (!access_token) {
      throw { status: 401, message: "Unauthorized" };
    }

    const payload: any = verifyAccessTokenAdmin(access_token);
    const data = await getUserById(payload.id);

    if (!data) {
      throw { status: 401, message: "Unauthorized" };
    }
    
req["user"] = {
  id: payload.id,
  email: payload.email,
  role: payload.role
};
    next();
  } catch (err) {
    next(err);
  }
};
