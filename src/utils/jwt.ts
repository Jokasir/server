import * as jwt from 'jsonwebtoken';
import { UserAdmin } from '../schema/type';

const JWT_KEY = process.env.JWT_KEY as string

export const generateAccessTokenAdmin = (user: UserAdmin) => {
const {id, email} = user
console.log("cek id", id, "email: ", email, "user: ", user, "<<<<<<");

return jwt.sign({ id, email }, JWT_KEY)
}

export const verifyAccessTokenAdmin = (access_token: string) => {
    return jwt.verify(access_token, JWT_KEY)
}