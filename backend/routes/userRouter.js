import express from "express";
import expressAsyncHandler from 'express-async-handler';
import User from "../models/userModel.js";
import bcrypt from 'bcryptjs';
import { generateToken } from '../utils.js'

const userRouter = express.Router();

userRouter.post(
    '/signin',
    expressAsyncHandler(async (req,res) => {
        const user = await User.findOne({email:req.body.email})
        if(user){
            if(bcrypt.compareSync(req.body.password, user.password)){
                res.send({
                    _id:user._id,
                    name:user.name,
                    email:user.email,
                    phone:user.phone,
                    isAdmin: user.isAdmin,
                    token: generateToken(user.toObject()),
                })
            }
        }
        res.status(401).send({message:'invalid email or password'});
    })
    
)
userRouter.post(
    '/signup',
        expressAsyncHandler ( async(req,res) => {
           const newUser = new User({
            name: req.body.name,
            email: req.body.email,
            phone: req.body.phone,
            password:bcrypt.hashSync(req.body.password)
           });

           const user = await newUser.save();
           res.send({
            _id: user._id,
            name: user.name,
            email:user.email,
            phone: user.phone,
            isAdmin:user.isAdmin,
            token: generateToken(user),
           })
         
        })
    )

export default userRouter;