import { addProduct, createProductsMock, deleteProduct, getProductById, getProducts, getProductsMocks, updateProduct } from "../persistance/daos/mongodb/productDaoMongo.js";
import { createProdDTO, getByIdDTO } from "../persistance/repository/product.repository.js";

export const getProductsService = async (page, limit, sort, filter, filterValue) => {
    try {
        const response = await getProducts (page, limit, sort, filter, filterValue )
        return response
    } catch (error) {
        throw new Error(error.message);
    }
}

export const getProductByIdService = async (id) => {
    try {
        const item = await getProductById (id)
         if (!item) {return false;}
         else {return item}
        
    } catch (error) {
        throw new Error(error.message);
    }
}

export const addProductService = async (obj) => {
    try {
        const newProduct = await addProduct (obj)

        if (!newProduct) {return false;}
        else {return newProduct}

    } catch (error) {
        throw new Error(error.message);
    }
}

export const updateProductService = async (id, obj) => {
    try {
        const updateProd = await updateProduct (id, obj)

        return updateProd

    } catch (error) {
        throw new Error(error.message);
    }
}

export const deleteProductService = async (id) => {
    try {
        const deleteProd = await deleteProduct (id)
        return deleteProd

    } catch (error) {
        throw new Error(error.message);
    }
}


// -------  DTO  ----- // 

export const getByIdDTOService = async (id) => {
    try {
        const item = await getByIdDTO (id)
         if (!item) {return false;}
         else {return item}
        
    } catch (error) {
        throw new Error(error.message);
    }
}

export const createProdDTOService = async (obj) => {
    try {
        const newProduct = await createProdDTO (obj)

        if (!newProduct) {return false;}
        else {return newProduct}

    } catch (error) {
        throw new Error(error.message);
    }
}





    //  MOCKS  //

    export const createProductsMockService = async (prod) => {

        try {
            const newProd = await createProductsMock(prod);
            return newProd
        } catch (error) {
            throw new Error(error.message);
        }
    }
    
    
    
    export const getProductsMocksService = async () => {
    
        try {
            const prod = await getProductsMocks()
            if (!prod) { return false; }
            else { return prod; }
        } catch (error) {
            throw new Error(error.message);
        }
    }
