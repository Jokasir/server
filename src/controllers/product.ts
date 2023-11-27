import { NextFunction, Request, Response } from "express";
import { createProduct, productDetail, productList } from "../services/product";

export const create_product = async (req: Request, res: Response) => {
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
    console.log(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const get_product = async (req: Request, res: Response, next: NextFunction) => {
    try{
    let path_photo = `${req.headers.host}/public`;

        const result = await productList(path_photo)
        res.status(200).json({
            status: true,
            message: "Succesfully get all products",
            statusCode: "OK",
            response: result
        })
    }catch(error){
        console.log(error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};

export const get_productDetail =async (req: Request, res: Response, next: NextFunction) => {
    try {
        const id = req.params.id
    let path_photo = `${req.headers.host}/public`;

        const result = await productDetail(id, path_photo).catch(
          (err) => {            
            throw err;
          })         
        
        res.status(200).json({
            status: true,
            message: "Succesfully get product detail",
            statusCode: "OK",
            response: result
        })
    } catch (error) {
       next(error)
    }
}
