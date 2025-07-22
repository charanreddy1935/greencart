import express from 'express'
import { upload } from '../configs/multer.js';
import authSeller from '../middleware/authSeller.js';
import { addProduct, changeStock, productByid, productList } 
from '../controllers/productController.js';



const productRouter=express.Router();

productRouter.post('/add',upload.array('images'),addProduct)
productRouter.get('/list',productList)
productRouter.get('/:id',productByid)
productRouter.post('/stock',authSeller,changeStock)

export default productRouter;
