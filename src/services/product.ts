import { body } from "express-validator";
import { db } from "../utils/db.server";

export const productList = async (path_photo: string) => {
  return new Promise(async (resolve, reject) => {
    try {
      const result = await db.products.findMany({
        select: {
          id: true,
          name: true,
          price: true,
          description: true,
          category: true,
          photo: true,
        },
      });
      const transformResult = result.map((d, k) => {
        const { ...body } = d;
        if (d.photo) {
          return {
            no: k + 1,
            url_photo: `${path_photo}/${d.photo}`,
            ...body,
          };
        } else {
          return {
            no: k + 1,
            url_photo: null,
            ...body,
          };
        }
      });
      resolve(transformResult);
    } catch (error) {
      reject(error);
    }
  });
};

export const createProduct = async (
  name: any,
  price: any,
  description: any,
  categoryId: any | null,
  photo: string | null
) => {
  return new Promise(async (resolve, reject) => {
    try {
      const create = await db.products.create({
        data: {
          name,
          price: Number(price),
          description,
          categoryId,
          photo,
        },
      });
      resolve(create);
    } catch (error) {
      console.log(error);
      reject(error);
    }
  });
};

export const productDetail = async (id: string, path_photo: string) => {
  return new Promise(async (resolve, reject) => {
    try {
      const result = await db.products.findUnique({
        where: { id: Number(id) },
      });
      let transformResult;
      if (result) {
        if (result.photo) {
          transformResult = {
            ...result,
            url_photo: path_photo + result.photo,
          };
        } else {
          transformResult = {
            ...result,
            url_photo: null,
          };
        }
        resolve(transformResult);
      } else {
        throw {status: 404, message: `Product with id ${id} not found`};
      }
    } catch (error) {
      reject(error);
    }
  });
};
