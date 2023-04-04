import express from 'express';
import expressAsyncHandler from 'express-async-handler';
import Product from '../../models/productModel.js';
import { isAuth, isSeller } from '../../utils.js';

const productCreateRouter = express.Router()

productCreateRouter.post(
    '/create',
    isAuth,
    expressAsyncHandler( async(req,res) => {
        const {name,slug,image,brand,category,description,price,countInStock,createdBy,rating,numReviews} = req.body;

        const product = new Product({
            name:name,
            slug:name,
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

productCreateRouter.get(
    '/:id',
    isAuth,
    expressAsyncHandler( async(req,res) => {
        const data = await Product.findOne({createdBy:req.params.createdBy});
        if(data){
            res.send(data);
        } else {
            res.status(404).send({message: "Product Not Found"});
        }
    })
)

productCreateRouter.put(
    '/:id',
    isAuth,
    isSeller,
    expressAsyncHandler( async(req,res) => {
        try{
            const product = await Product.findById(req.params.id);
            if(product){
                product.name = req.body.name || product.name;
                product.category = req.body.category || product.category;
                product.description = req.body.description || product.description;
                product.price = req.body.price || product.price;
                product.countInStock = req.body.countInStock || product.countInStock;
                const updateProduct = await product.save();
                res.status(201).send({message:"Product updated successfull", product:updateProduct})
            } else {
                res.status(401).send({message:"product not found"})
            }
        } catch(err){
            res.status(401).send(err)
        }
        
    })
)

export default productCreateRouter;