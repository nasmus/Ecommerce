import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
    {
        name: { type: String, required: true, unique:true },
        slug: { type: String, required: true, unique: true },
        
        multipleImage: { type:[String] },
        brand: { type: String, required:true },
        category: { type:String },
        description: { type:String, required:true },
        price: { type:Number, required:true },
        countInStock: { type:Number, required:true },
        rating: { type:Number},
        numReviews: { type:Number},
        review:[
            {
                type: mongoose.Schema.Types.ObjectId, ref:'User',
                productRating: { type:Number },
                productComment: { type:String, required:false },
                image: { type: String },
                timestamps: true,

            }
        ],
        createdBy: {
            type: mongoose.Schema.Types.ObjectId, ref:'User',
            required:true
        }
        
    },
    {
        timestamps:true
    }
);

const Product = mongoose.model('Product', productSchema);

export default Product;