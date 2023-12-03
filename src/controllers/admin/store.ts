import { NextFunction, Request, Response } from "express";
import { CustomRequest } from "../../schema/type";
import { createStore } from "../../services/admin/store";

export const create_store = async (
  req: CustomRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const { name, province, city, address, phone } = req.body;
    const { id } = req.user;

    const result = await createStore(name, province, city, address, phone, id)

    res.status(201).json({
        status: true,
        message: "Succesfully create new store",
        statusCode: "OK",
        response: result
    })
  } catch (error) {
    console.log({
        error, from: "Store Controller"
    });
    next(error)
  }
};
