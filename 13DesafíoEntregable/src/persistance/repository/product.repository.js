import ProductDTO from "../DTOs/product.req.dto.js";
import ProductResDTO from "../DTOs/product.res.dto.js";
import { ProductModel } from "../daos/mongodb/models/productModel.js";


export const getByIdDTO = async (id) => {
    try {
        const response = await ProductModel.findById(id);
        return new ProductResDTO(response)
    } catch (error) {
        console.log(error);
    }
}


export const createProdDTO = async (obj) => {
    try {
        const prodDTO = new ProductDTO(obj);
        const response = await ProductModel.create(prodDTO)
        return response
    } catch (error) {
        console.log(error);
    }
}


