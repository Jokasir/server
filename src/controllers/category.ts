import { NextFunction, Request, Response } from "express";
import { categoryDetail, cateogryList, createCategory } from "../services/category";

export const create_category = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { name } = req.body;

    const newCategory = await createCategory(name);

    res.status(201).json({
      status: true,
      message: "Succesfully create new category",
      statusCode: "OK",
      response: newCategory,
    });
  } catch (error) {
    console.log({
      errors: error,
      from: "category controller",
    });
    next(error);
  }
};

export const get_category = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const result = await cateogryList();
    res.status(200).json({
      status: true,
      message: "Succesfully get all cateogries",
      statusCode: "OK",
      response: result,
    });
  } catch (error) {
    console.log({
      error: error,
      from: "category controller",
    });
    next(error);
  }
};

export const get_categoryDetail = async(
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
        const id = req.params.id;
        let path_photo = `${req.headers.host}/public`;

        const result = await categoryDetail(id, path_photo)
        res.status(200).json({
            status: true,
            message: "Succesfully get category detail",
            statusCode: "OK",
            response: result
        })
    } catch (error) {
        console.log(error);
        
        next(error)
    }
  }