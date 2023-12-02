import e, { NextFunction, Request, Response } from "express";
import { adminLogin, createAdmin } from "../../services/admin/adminuser";
import { generateAccessTokenAdmin } from "../../utils/jwt";
import { UserAdmin } from "../../schema/type";

export const create_admin = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { firstName, lastName, email, password, phone } = req.body;
    const create = await createAdmin(
      firstName,
      lastName,
      email,
      password,
      phone
    );

    res.status(201).json({
      status: true,
      message: "Succesfully get product detail",
      statusCode: "OK",
      response: create,
    });
  } catch (error) {
    console.log({
      error: error,
      from: "Admin User Controller",
    });
    next(error);
  }
};

export const login_admin = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      throw {
        status: 400,
        message: "username/password is required",
      };
    }
    const result = (await adminLogin(email, password)) as UserAdmin;

    if (result && "message" in result) {
      throw result;
    }
    
    const access_token = generateAccessTokenAdmin(result);

    res.status(200).json({
      status: true,
      message: "Succesfully get product detail",
      statusCode: "OK",
      access_token,
    });
  } catch (error) {
    console.log({
      error,
      from: "Admin User Controller",
    });
    next(error);
  }
};
