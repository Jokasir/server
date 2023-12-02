import { db } from "../utils/db.server";
import { z } from "zod";
import { categorySchema } from "../schema";

export const createCategory =async (name:any) => {
    return new Promise (async(resolve, reject) => {
        try {
            const validatedData = categorySchema.parse({
                name
            })

            const create = await db.categories.create({
                data: {
                    ...validatedData,
                    status: true
                }
            })
            resolve(create)
        } catch (error) {
            if(error instanceof z.ZodError) {
                console.log({
                    error: error.errors,
                    from: "category service"
                });
                reject({
                    status: 400,
                    message: error.errors[0].message
                })
            } else {
                console.error({
                  errors: error,
                  from: "category services",
                });
                reject(error);
              }
        }
    })
}

export const cateogryList = async () => {
    return new Promise(async(resolve, reject) => {
        try {
            const result = await db.categories.findMany({
                where: {status: true},
                select: {
                    id: true,
                    name: true,
                    products: true
                }
            })
            resolve(result)
        } catch (error) {
            console.log({
                error: error,
                from: "category service"
            });
            reject(error)
        }
    })
}

export const categoryDetail = async(id: any, path_photo: string) => {
    return new Promise(async(resolve, reject)=> {
        try {
            const result = await db.categories.findUnique({
                where: {id: Number(id)},
                select: {
                    id: true,
                    name: true,
                    products: true
                }
            })
            if(result){
                const productsWithUrl = result.products.map((product) => ({
                    ...product,
                    url_photo: product.photo ? `${path_photo}/${product.photo}` : null,
                  }));
          
                  const transformResult = {
                    ...result,
                    products: productsWithUrl,
                  };
                
                resolve(transformResult)
            } else {
                throw {status: 404,
                message: `Category with id ${id} not found`}
            }
        } catch (error) {
            reject(error)            
        }
    })
}