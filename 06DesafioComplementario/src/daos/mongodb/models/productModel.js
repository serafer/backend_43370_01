import mongoose from "mongoose";

const productSchema = new mongoose.Schema({

    title: {type: String, required: true},
    description: {type: String},
    code: {type: String, required: true},
    price: {type: Number, required: true},
    status: {type: Boolean, required: true, default: true},
    stock: {type: Number, required: true},
    category: {type: String, required: true},
    thumbnails: {type: String, required: true },


})

export const ProductModel = mongoose.model ('products', productSchema)