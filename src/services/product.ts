import { db } from "../utils/db.server";
import { unlink } from "fs";
import { z } from "zod";
import { productSchema } from "../schema";

export const productList = async (path_photo: string) => {
  return new Promise(async (resolve, reject) => {
    try {
      const result = await db.products.findMany({
        where: { status: true },
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
      const validatedData = productSchema.parse({
        name,
        price: Number(price),
        description,
        categoryId: categoryId ? Number(categoryId) : null,
        photo: photo !== null ? photo : null,
      });

      const create = await db.products.create({
        data: {
          ...validatedData,
          status: true,
        },
      });

      resolve(create);
    } catch (error: any) {
      if (error instanceof z.ZodError) {
        console.log("zod error: ", error.errors);

        console.error({
          errors: error.errors[0].message,
          from: "product services",
        });
        reject({
          status: 400,
          message: error.errors[0].message,
        });
      } else {
        console.error({
          errors: error,
          from: "product services",
        });
        reject(error);
      }
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
            url_photo: `${path_photo}/${result.photo}`,
          };
        } else {
          transformResult = {
            ...result,
            url_photo: null,
          };
        }
        resolve(transformResult);
      } else {
        throw { status: 404, message: `Product with id ${id} not found` };
      }
    } catch (error) {
      reject(error);
    }
  });
};

export const updateProduct = async (
  name: any,
  price: any,
  description: any,
  categoryId: any,
  photo: string | null,
  source: string | null,
  id: any
) => {
  return new Promise(async (resolve, reject) => {
    try {
      const validatedData = productSchema.parse({
        name,
        price: Number(price),
        description,
        categoryId: categoryId ? Number(categoryId) : null,
        photo: photo !== null ? photo : null,
      });

      const getProduct = await db.products.findUnique({
        where: { id: Number(id) },
      });
      let result;

      if (getProduct) {
        if (photo) {
          unlink(`${source}/${getProduct.photo}`, (err) => {
            if (err) {
              console.log({
                message: "GAGAL DELETE FILE !",
                error: err,
              });
            }
          });

          result = await db.products.update({
            where: { id: Number(id) },
            data: {
              ...validatedData,
              status: true,
            },
          });
        } else {
          result = await db.products.update({
            where: { id: Number(id) },
            data: {
              ...validatedData,
              status: true,
            },
          });
        }
        resolve(result);
      } else {
        throw { status: 404, message: `Product with id ${id} not found` };
      }
    } catch (error) {
      if (error instanceof z.ZodError) {
        console.log("zod error: ", error.errors);

        console.error({
          errors: error.errors[0].message,
          from: "product services",
        });
        reject({
          status: 400,
          message: error.errors[0].message,
        });
      } else {
        console.error({
          errors: error,
          from: "product services",
        });
        reject(error);
      }
    }
  });
};

export const updateStatusProduct = async (id: number) => {
  return new Promise(async (resolve, reject) => {
    try {
      const getProduct = await db.products.findUnique({
        where: { id },
      });
      if (getProduct) {
        let result;
        if (getProduct.status) {
          result = await db.products.update({
            where: { id },
            data: {
              status: false,
            },
          });
        } else {
          result = await db.products.update({
            where: { id },
            data: {
              status: true,
            },
          });
        }
        resolve(result);
      } else {
        throw { status: 404, message: `Product with id ${id} not found` };
      }
    } catch (error: any) {
      console.log({
        error: error,
        from: "Service Product",
      });
      reject(error);
    }
  });
};
