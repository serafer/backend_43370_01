import { ProductModel } from "./models/productModel.js";


export const getProducts = async () => {
    try {
        const response = await ProductModel.find({});
        console.log('productDao ok');
        return response
    } catch (error) {
        console.log(error);
    }
}

export const getProductById = async (id) => {
    try {
        const response = await ProductModel.findById(id)
        return response
    } catch (error) {
        console.log(error);
    }
}

export const addProduct = async (obj) => {
    try {
        const response = await ProductModel.create(obj)
        return response
    } catch (error) {
        console.log(error);
    }
}

export const updateProduct = async (id, obj) => {
    try {
        const response = await ProductModel.findByIdAndUpdate(id, obj, { new: true })
        return response
    } catch (error) {
        console.log(error);
    }
}


export const deleteProduct = async (id) => {
    try {
        const response = await ProductModel.findByIdAndDelete(id)
        return response

    } catch (error) {
        console.log(error);
    }
}
