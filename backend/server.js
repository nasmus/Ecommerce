import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import seedRouter from './routes/seedRoutes.js';
import productRouter from './routes/productRouter.js';
import userRouter from './routes/userRouter.js';
import orderRouter from './routes/orderRouter.js';
import sellerRouter from './routes/sellerRouter/sellerRouter.js'
import productCreateRouter from './routes/sellerRouter/productCreateRouter.js';
import deleteProduct from './routes/sellerRouter/deleteProduct.js';
import sellerOrderRouter from './routes/sellerRouter/OrderRouter/sellerOrderRouter.js'
import sellerProductRouter from './routes/sellerRouter/ProductRouter/sellerProductRouter.js';


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
app.use('/api/allproduct', productCreateRouter);
app.use('/api/delete', deleteProduct);
app.use('/api/edit', productCreateRouter);
app.use('/app', productCreateRouter);
// seller order api
app.use('/api/order', sellerOrderRouter);
app.use('/api/productdetails',sellerProductRouter);
// seller order summery
app.use('/api/summary',sellerOrderRouter);
// seller product count
app.use('/api/count',sellerProductRouter);




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