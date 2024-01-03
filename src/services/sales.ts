import { db } from "../utils/db.server";

export const createSales = async (
  cashier: any,
  amount: any,
  storeId: any,
  details: any
) => {
  return new Promise(async (resolve, reject) => {
    try {
      const newSales = await db.sales.create({
        data: {
          cashier,
          amount: Number(amount),
          details,
          storeId: Number(storeId),
        },
      });
      resolve(newSales);
    } catch (error) {
      console.error({
        errors: error,
        from: "product services",
      });
      reject(error)
    }
  });
};
