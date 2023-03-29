import express from 'express';
import expressAsyncHandler from 'express-async-handler';
import Product from '../../models/productModel.js';
import { isAuth } from '../../utils.js';

const productCreateRouter = express.Router()

productCreateRouter.post(
    '/create',
    isAuth,
    expressAsyncHandler( async(req,res) => {
        const {name,slug,image,brand,category,description,price,countInStock,createdBy,rating,numReviews} = req.body;

        const product = new Product({
            name:name,
            slug:slug,
            image,
            brand,
            category,
            description,
            price,
            countInStock,
            rating,
            numReviews,
            createdBy: req.user._id
        });
        product.save(((error,product) => {
            if(error){
                res.status(400).send({message: "product is not create"})
            }
            if(product){
                res.status(200).send({message: "product is create successfully"})
            }
        }));
    })
)

export default productCreateRouter;