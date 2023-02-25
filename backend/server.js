import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import seedRouter from './routes/seedRoutes.js';
import productRouter from './routes/productRouter.js';

const app = express();

dotenv.config();


mongoose.connect(process.env.MONGODB_URL ).then(()=> {
    console.log('connect to db')
}).catch((err)=> {
    console.log(err.message);
})

// seed Api calling
app.use('/api/seed', seedRouter);
app.use('/api/products', productRouter);


const port = process.env.PORT || 5000;

app.listen(port, ()=>{
    console.log(`server at http://localhost:${port}`);
})