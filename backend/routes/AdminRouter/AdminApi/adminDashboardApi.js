import express from "express";
import expressAsyncHandler from "express-async-handler";
import User from "../../../models/userModel.js";
import Order from "../../../models/orderModel.js";
import { isAuth, isAdmin } from "../../../utils.js";
import * as mongoose from "mongoose";
import orderList from "./orderList.js";
const ObjectId = mongoose.Types.ObjectId;

const adminDashboardApi = express.Router();

adminDashboardApi.get(
  "/sellerList",
  isAuth,
  isAdmin,
  expressAsyncHandler(async (req, res) => {
    const sellerList = await User.find({
      role: "seller",
    });
    if (sellerList) {
      res.status(200).send(sellerList);
    } else {
      res.status(404).send({ message: "data not found" });
    }
  })
);

adminDashboardApi.get(
  '/userlist',
  isAuth,
  isAdmin,
  expressAsyncHandler( async(req,res) =>{
    const allUserList = await User.find({ role: 'user'})
    if(allUserList){
      res.status(200).send(allUserList)
    } else{
      res.status(404).send({message:"user not found"})
    }
  })
)

adminDashboardApi.get(
  '/ordercount',
  isAuth,
  isAdmin,
  expressAsyncHandler( async(req,res) =>{
    const countOrder = await Order.countDocuments({});
    if(countOrder){
      res.json(countOrder)
    } else{
      res.send({message:"order not found"})
    }
  })
)

export default adminDashboardApi;
