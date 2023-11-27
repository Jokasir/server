import { NextFunction, Request, Response } from "express";

export default function errorHandler(
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) {
    let status = 500
    let message = "Internal Sever Error"

    if(err.status && err.message) {
        status = err.status
        message = err.message
    }
  res.status(status).json({
    status: false,
    message: message,
    statusCode: "FAILED",
  });
}
