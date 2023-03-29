import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import seedRouter from './routes/seedRoutes.js';
import productRouter from './routes/productRouter.js';
import userRouter from './routes/userRouter.js';
import orderRouter from './routes/orderRouter.js';
import sellerRouter from './routes/sellerRouter/sellerRouter.js'
import productCreateRouter from './routes/sellerRouter/productCreateRouter.js';


const app = express();
dotenv.config();

//mongoose.set("strictQuery", false);
// seed Api calling
app.use(express.json());
app.use(express.urlencoded({ extended:true }))
app.use('/api/seed', seedRouter);
app.use('/api/products', productRouter);
app.use('/api/users', userRouter);
app.use('/api/orders', orderRouter);

//seller api
app.use('/api/seller', sellerRouter);
app.use('/api/product', productCreateRouter);

mongoose.set("strictQuery", false);

mongoose.connect(process.env.MONGODB_URL ).then(()=> {
    console.log('connect to db')
}).catch((err)=> {
    console.log(err.message);
})



const port = process.env.PORT || 5000;

app.listen(port, ()=>{
    console.log(`server at http://localhost:${port}`);
})