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

export default sellerOrderRouter;