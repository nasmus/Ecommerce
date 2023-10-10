import express from 'express';
import Category from '../../../models/category.js';
import expressAsyncHandler from 'express-async-handler';

const getCategoryRouter = express.Router();

getCategoryRouter.get(
    '/get_all_category',
    expressAsyncHandler( async(req,res) =>{
        const category = await Category.find({})
        if(category){
            res.status(200).send(category)
        } else(
            res.status(400).send({message:"product not found"})
        )
    })
    
)

export default getCategoryRouter;