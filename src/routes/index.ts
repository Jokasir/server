import express, {Request, Response} from "express";
import { create_product, get_product, get_productDetail, update_product, update_statusProduct } from "../controllers/product";
import { uploadFile } from "../middleware/multer";
import { create_category, get_category, get_categoryDetail } from "../controllers/category";
import admin from "./admin"

const router = express.Router();

router.use('/admin',admin)

// * Product
router.get('/product', get_product)
router.post('/product', uploadFile("public/uploads/product"), create_product)
router.get('/product/:id', get_productDetail)
router.put('/product/:id', uploadFile("public/uploads/product"), update_product)
router.patch('/product/:id', update_statusProduct)

// * Category
router.post('/category', create_category)
router.get('/category', get_category)
router.get('/category/:id', get_categoryDetail)

export default router
