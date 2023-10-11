import express from 'express';
import Category from '../../../models/category.js';
import expressAsyncHandler from 'express-async-handler';

const getCategoryRouter = express.Router();

function createAddCategories(categories, parentId=null) {
    const categoryList =[];
    let category;
    if(parentId == null){
        category= categories.filter(cat => cat.parentId == undefined)
    } else {
        category = categories.filter(cat => cat.parentId == parentId);
    }
    for( let cate of category){
        categoryList.push({
            _id: cate._id,
            name: cate.name,
            slug: cate.slug,
            parentId: cate.parentId,
            type:cate.type,
            children: createAddCategories(categories, cate._id)
        })
    }
    return categoryList;
}

getCategoryRouter.get(
    '/get_all_category',
    expressAsyncHandler( async(req,res) =>{
        const category = await Category.find({})
        if(category){
            const categoryList = createAddCategories(category)
            res.status(200).json({categoryList})
        } else(
            res.status(400).send({message:"product not found"})
        )
    })
    
)

export default getCategoryRouter;