import { NextFunction, Request, Response } from "express";
import { createSales } from "../services/sales";


export const create_sales = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const {cashier, amount, storeId, details } = req.body

        const newSales = await createSales(cashier, amount, storeId, details)

        res.status(201).json({
            status: true,
      message: "Succesfully create new sales invoice",
      statusCode: "OK",
      response: newSales
        })
    } catch (error) {
        console.log({
            errors: error,
            from: "product controller",
          });
          next(error);
    }
}