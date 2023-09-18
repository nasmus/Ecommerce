import mongoose from 'mongoose';
const caregorySchema =  new mongoose.Schema({
    name: {
        type:String,
        required:true,
        trim:true
    },
    slug: {
        type:String,
        required:true,
        unique:true
    },
    type: {
        type:String
    },
    categoryImage: {type:String},
    parentId: {
        type:String
    }
},{ timestamps:true })
const Category = mongoose.model("Category", caregorySchema);
export default Category;

