import { Request, Response, NextFunction } from "express";
import { CustomRequest, User } from "../schema/type";
import { getUserById } from "../services/admin/user";

export default async(req: CustomRequest, res: Response, next: NextFunction) => {
    try {
        const {id} = req.user
        const verifyUser = await getUserById(id) as User

        if(verifyUser.role === "Manager") {
            next()
        } else {
            throw {
                status: 401,
                message: "Unauthorized Role"
            }
        }
    } catch (error) {        
        next(error)
    }
}