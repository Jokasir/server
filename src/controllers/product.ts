import { NextFunction, Request, Response } from "express";
import {
  createProduct,
  productDetail,
  productList,
  updateProduct,
  updateStatusProduct,
} from "../services/product";

export const create_product = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { name, price, description, categoryId } = req.body;


    let photo: string | null = null;
    if (req.file?.hasOwnProperty("filename")) {
      photo = `${req.file.filename}`;
    }

    const newProduct = await createProduct(
      name,
      price,
      description,
      categoryId,
      photo
    );
    res.status(201).json({
      status: true,
      message: "Succesfully create new product",
      statusCode: "OK",
      response: newProduct,
    });
  } catch (error) {
    console.log({
      errors: error,
      from: "product controller",
    });
    next(error);
  }
};

export const get_product = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    let path_photo = `${req.headers.host}/public`;

    const result = await productList(path_photo);
    res.status(200).json({
      status: true,
      message: "Succesfully get all products",
      statusCode: "OK",
      response: result,
    });
  } catch (error) {
    console.log({
      error: error,
      from: "product controller"
    });
    next(error);
  }
};

export const get_productDetail = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const id = req.params.id;
    let path_photo = `${req.headers.host}/public`;

    const result = await productDetail(id, path_photo).catch((err) => {
      throw err;
    });

    res.status(200).json({
      status: true,
      message: "Succesfully get product detail",
      statusCode: "OK",
      response: result,
    });
  } catch (error) {
    next(error);
  }
};

export const update_product = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { name, price, description, categoryId } = req.body;
    const { id } = req.params;
    let photo: string | null = null;
    let source: string | null = null;

    if (
      req.file?.hasOwnProperty("filename") &&
      req.file?.hasOwnProperty("path")
    ) {
      let { filename, destination } = req.file;
      photo = `${filename}`;
      source = destination;
      console.log({
        message: "CHECK DATA REQUEST FILE !",
        data: req.file,
      });
    }

    const result = await updateProduct(
      name,
      price,
      description,
      categoryId,
      photo,
      source,
      id
    ).catch((err) => {
      throw err;
    });

    res.status(200).json({
      status: true,
      message: `Succesfully update product with id ${id}`,
      statusCode: "OK",
      response: result,
    });
  } catch (error) {
    console.log({
      errors: error,
      from: "product controller",
    });
    next(error);
  }
};

export const update_statusProduct = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;

    const result = await updateStatusProduct(Number(id)).catch((err) => {
      throw err;
    });

    res.status(200).json({
      status: true,
      message: `Succesfully update status product with id ${id}`,
      statusCode: "OK",
      response: result,
    });
  } catch (error) {
    console.log({
      errors: error,
      from: "product controller",
    });
    next(error);
  }
};
