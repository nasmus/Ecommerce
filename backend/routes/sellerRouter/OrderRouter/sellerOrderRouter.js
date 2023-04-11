import  express  from "express";
import expressAsyncHandler from "express-async-handler";
import Order from '../../../models/orderModel.js';
import { isAuth, isSeller } from "../../../utils.js";

const sellerOrderRouter = express.Router();

sellerOrderRouter.get(
    '/allorder',
    isAuth,
    isSeller,
    expressAsyncHandler( async(req,res) => {
        const userId = req.user._id;
        const order = await Order.find({"orderItems.seller": userId},{_id:0,orderItems:{$elemMatch:{"orderItems.seller":userId}}});
        res.send(order);
    })
)
sellerOrderRouter.get(
    '/orderaddress',
    isAuth,
    isSeller,
    expressAsyncHandler( async(req,res) => {
        const userId = req.user._id;
        const orderAddress = await Order.distinct("shippingAddress").where({"orderItems.seller": userId})
        if(orderAddress){
            res.status(200).send(orderAddress)
        } else {
            res.status(404).send({message:"data not found"})
        }
    })
)

export default sellerOrderRouter;