import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2"

const productSchema = new mongoose.Schema({

    title: {type: String, required: true},
    description: {type: String},
    code: {type: String, required: true},
    price: {type: Number, required: true},
    status: {type: Boolean, required: true, default: true},
    stock: {type: Number, required: true},
    category: {type: String, required: true},
    thumbnails: {type: String, required: true },
    owner: {type: String, required: true, default: "admin"}


})

productSchema.plugin(mongoosePaginate)


export const ProductModel = mongoose.model ('products', productSchema)