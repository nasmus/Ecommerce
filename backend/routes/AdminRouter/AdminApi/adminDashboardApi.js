import express from "express";
import expressAsyncHandler from "express-async-handler";
import User from '../../../models/userModel.js';
import { isAuth,isAdmin } from "../../../utils.js";
import * as mongoose from 'mongoose';
const ObjectId = mongoose.Types.ObjectId;

const adminDashboardApi = express.Router();

adminDashboardApi.get(
    "/sellerList",
    isAuth,
    isAdmin,
    expressAsyncHandler(async (req,res) => {
        const sellerList = await User.find({
            "role":"seller"
        })
        if(sellerList){
            res.status(200).send(sellerList)
        } else{
            res.status(404).send({message:"data not found"})
        }
    })
)

export default adminDashboardApi;