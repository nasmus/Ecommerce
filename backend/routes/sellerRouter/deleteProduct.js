import express from 'express';
import expressAsyncHandler from 'express-async-handler';
import Product from '../../models/productModel.js';
import { isAuth } from '../../utils.js';

const deleteProduct = express.Router();

deleteProduct.delete(
    '/:id',
    isAuth,
    expressAsyncHandler(async(req,res) => {
        
        const data = await Product.findByIdAndRemove(req.params.id);
        if(data){
            res.send({message:"product delete properly"})
        } else res.status(404).send({message:"product not delete"})
    })
)

export default deleteProduct;