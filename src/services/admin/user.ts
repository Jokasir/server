import { db } from "../../utils/db.server";
import { adminUserSchema } from "../../schema";
import { z } from "zod";
import * as bcrypt from "bcrypt";
import { error } from "console";

export const createAdmin = async (
  firstName: any,
  lastName: any,
  email: any,
  password: any,
  phone: any,
  role: any
) => {
  return new Promise(async (resolve, reject) => {
    try {
      const validatedData = adminUserSchema.parse({
        firstName,
        lastName,
        email,
        phone,
        role,
      });
      if (password.length >= 6) {
        const hashPassword = await bcrypt.hash(password, 10);
        const create = db.users.create({
          data: {
            ...validatedData,
            password: hashPassword,
            status: true,
          },
        });
        resolve(create);
      } else {
        throw {
          status: 400,
          message: "Password is required at least six character",
        };
      }
    } catch (error) {
      if (error instanceof z.ZodError) {
        console.error({
          errors: error.errors[0].message,
          from: "Admin User Services",
        });
        reject({
          status: 400,
          message: error.errors[0].message,
        });
      } else {
        console.log({
          error: error,
          from: "Admin User Service",
        });
        reject(error);
      }
    }
  });
};

export const adminLogin = async (email: any, password: any) => {
  return new Promise(async (resolve, reject) => {
    try {
      const verifyEmail = await db.users.findFirst({
        where: { email: email },
        select: {
          id: true,
          firstName: true,
          lastName: true,
          email: true,
          password: true,
          phone: true,
          role: true,
          status: true,
        },
      });
      console.log(verifyEmail);

      if (verifyEmail) {
        const verifyPass = bcrypt.compareSync(password, verifyEmail.password);

        if (verifyPass) {
          resolve(verifyEmail);
          return;
        }
      }

      throw { status: 400, message: "invalid email/password" };
    } catch (error) {
      console.log({
        error: error,
        from: "Admin User Service",
      });
      resolve(error);
    }
  });
};

export const getUserById = async (id: any) => {
  return new Promise(async (resolve, reject) => {
    try {
      const result = await db.users.findUnique({
        where: {id: Number(id)},
      });
      if (result) {
        resolve(result);
      } else {
        throw {
          status: 404,
          message: "User doesn't exist",
        };
      }
    } catch (error) {
      console.log({
        error,
        from: "User Service",
      });
      reject(error);
    }
  });
};
