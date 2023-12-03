import { storeSchema } from "../../schema";
import { db } from "../../utils/db.server";
import { z } from "zod";

export const createStore = async(
    name: any,
    province: any,
    city: any,
    address: any,
    phone: any,
    adminId: any
) => {
    return new Promise(async(resolve, reject) => {
        try {
            const validatedData = storeSchema.parse({
                name, province, city, address, phone
            })
            const result = await db.stores.create({
                data: {
                    ...validatedData,
                    adminID: Number(adminId)
                }
            })
            resolve(result)
        } catch (error) {
            if (error instanceof z.ZodError) {
                console.error({
                  errors: error.errors[0].message,
                  from: "Store services",
                });
                reject({
                  status: 400,
                  message: error.errors[0].message,
                });
              } else {
                console.error({
                  errors: error,
                  from: "Store services",
                });
                reject(error);
              }          
        }
    })
}