import express from 'express';
import data from './data.js';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
const app = express();

dotenv.config();
mongoose.connect(process.env.MONGODB_URL ).then(()=> {
    console.log('connect to db')
}).catch((err)=> {
    console.log(err.message);
})

app.get('/api/products', (req,res) => {
    res.send(data.products);
})
app.get('/api/products/slug/:slug', (req,res) => {
    const product = data.products.find(x => x.slug === req.params.slug);
    if(product){
        res.send(product)
    }
    else{
        res.status(404).send({message:'product not found'})
    }
    
})
app.get('/api/products/:id', (req,res) => {
    const product = data.products.find((x) => x._id === req.params.id);
    if(product){
        res.send(product);
    } else {
        res.status(404).send({message: "product not found"});
    }
})

const port = process.env.PORT || 5000;

app.listen(port, ()=>{
    console.log(`server at http://localhost:${port}`);
})