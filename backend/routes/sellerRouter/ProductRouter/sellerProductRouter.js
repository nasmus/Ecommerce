import express from 'express';
import expressAsyncHandler from 'express-async-handler';
import Product from '../../../models/productModel.js';
import { isAuth,isSeller} from '../../../utils.js';

 const sellerProductRouter = express.Router()

sellerProductRouter.get(
    '/:id',
    isAuth,
    isSeller,
    expressAsyncHandler( async(req,res) => {
        const singleProduct = await Product.findById(req.params.id);
        if(singleProduct){
            res.send(singleProduct)
        } else {
            res.status(404).send({message:"product Not Found"})
        }
    })
)
sellerProductRouter.get(
    '/product/:id',
    isAuth,
    isSeller,
    expressAsyncHandler( async(req,res) => {
        //const data = await Product.find({createdBy:req.user._id}).count();
        const userId = req.user._id;
        const countproduct = await Product.count({createdBy:userId})
        if(countproduct){
            res.send(countproduct);
        } else {
            res.status(404).send({message: "Product Not Found"});
        }
    })
)
export default sellerProductRouter;