import * as jwt from 'jsonwebtoken';
import { User } from '../schema/type';

const JWT_KEY = process.env.JWT_KEY as string

export const generateAccessTokenAdmin = (user: User) => {
const {id, email, role} = user

return jwt.sign({ id, email, role }, JWT_KEY)
}

export const verifyAccessTokenAdmin = (access_token: string) => {
    return jwt.verify(access_token, JWT_KEY)
}