import express from "express";
import expressAsyncHandler from "express-async-handler";
import User from '../../models/userModel.js'
import bcrypt from 'bcryptjs';
import { generateToken, isAuth } from '../../utils.js'

const sellerRouter = express.Router();

sellerRouter.post(
    '/login',
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
                    role:user.role,
                    token: generateToken(user.toObject()),
                })
            }
        }
        res.status(401).send({message:'invalid email or password'});
    })
)


export default sellerRouter;