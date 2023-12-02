import express, {Request, Response} from "express";
import { create_product, get_product, get_productDetail, update_product, update_statusProduct } from "../controllers/product";
import { uploadFile } from "../middleware/multer";

const router = express.Router();

router.get('/', (req: Request, res: Response)=>{
    res.status(200).json({message: "Server Up"})
})

// * Product
router.get('/product', get_product)
router.post('/product', uploadFile("public/uploads/product"), create_product)
router.get('/product/:id', get_productDetail)
router.put('/product/:id', uploadFile("public/uploads/product"), update_product)
router.patch('/product/:id', update_statusProduct)

export default router
