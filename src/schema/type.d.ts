//file type.d.ts
export type User = {
  id: string;
  firstName: String;
  lastName: String;
  email: string;
  password: String;
  phone: String;
  status: Boolean;
  role: String;
};

import { Request } from "express";

declare namespace Express {
  interface Request {
    user?: {
      id: string;
      email: string;
      role: string;
    };
  }
}

export interface CustomRequest extends Request {
  user: {
    id: string;
    email: string;
    role: string;
  };
}