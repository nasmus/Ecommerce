import express from "express";
import expressAsyncHandler from "express-async-handler";
import Order from '../../../models/orderModel.js';
import { isAuth, isSeller } from "../../../utils.js";
import * as mongoose from 'mongoose';
const ObjectId = mongoose.Types.ObjectId;

const sellerOrderRouter = express.Router();

sellerOrderRouter.get(
    '/allorder',
    isAuth,
    isSeller,
    expressAsyncHandler( async(req,res) => {
        const userId = req.user._id;
        const order = await Order.find({"orderItems.seller": userId},{"orderItems":{$elemMatch:{"orderItems.seller":userId}}});
        //const order = await Order.find({"orderItems.seller":userId},{"orderItems": 1});
        if(order){
            res.status(200).send(order)
        }
        else {
            res.status(404).send({message:"Data Not Found"})
        }
    })
)

sellerOrderRouter.get(
    '/orderaddress',
    isAuth,
    isSeller,
    expressAsyncHandler( async(req,res) => {
        const userId = req.user._id;
        const orderAddress = await Order.distinct("shippingAddress").where({"orderItems.seller": userId})
        //const orderAddress = await Order.find({"orderItems.seller":userId})
        if(orderAddress){
            res.status(200).send(orderAddress)
        } else {
            res.status(404).send({message:"data not found"})
        }
    })
)

sellerOrderRouter.put(
    '/changestatus',
    isAuth,
    isSeller,
    expressAsyncHandler( async(req,res) => {
        try{
            const userId = req.user._id;
            const newStatusCode = req.body.isDelivered;
            const product = await Order.findOneAndUpdate('isDelivered').where({"orderItems.seller": userId});
            if(product){
                product.isDelivered = newStatusCode;
                await product.save()
                res.send(product);
            } else {
                res.status(401).send({message:"not updated"})
            }
        } catch(err) {
            res.status(404).send(err);
        }
        
        
    })
)

sellerOrderRouter.get(
    '/orderdetails/:id',
    isAuth,
    isSeller,
    expressAsyncHandler( async(req,res) => {
        const orderDetails = await Order.findById(req.params.id);
        if(orderDetails){
            res.send(orderDetails);
        } else {
            res.send({message:"product not found"})
        }
    })
)

//seller order summery
sellerOrderRouter.get(
    '/order/:id',
    isAuth,
    isSeller,
    expressAsyncHandler( async(req,res) => {
        //const userId = req.user._id;
        const userId = req.params.id;
        const result = await Order.aggregate([
            {
                $match: {
                  'orderItems.seller':ObjectId(userId)
                }
            },
            {
                $unwind: '$orderItems'
            },
            {
                $group: {
                  _id: '$orderItems.seller',
                  totalOrderPrice: {$sum:{$multiply:['$orderItems.quantity','$orderItems.price']}},
                  quentity:{$sum: '$orderItems.quantity'}
                }
            },
            
        ])
          res.status(200).send(result)
    } )
)

export default sellerOrderRouter;