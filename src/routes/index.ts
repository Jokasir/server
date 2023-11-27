import express, {Request, Response} from "express";
import { create_product, get_product, get_productDetail } from "../controllers/product";
import { uploadFile } from "../middleware/multer";

const router = express.Router();

router.get('/', (req: Request, res: Response)=>{
    res.status(200).json({message: "Server Up"})
})

// * Product
router.get('/product', get_product)
router.get('/product/:id', get_productDetail)
router.post('/product', uploadFile("public/uploads/product"), create_product)

export default router
