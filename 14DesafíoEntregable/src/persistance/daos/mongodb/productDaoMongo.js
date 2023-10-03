import { ProductModel } from "./models/productModel.js";
import { logger } from '../../../utils/logger.js';


export const getProducts = async (page = 1, limit = 10, sort, filter, filterValue) => {
    try {
        let sortOptions;
        let filterOptions = {};

        if (filter && filterValue) {
            filterOptions = { [filter]: { $regex: filterValue, $options: 'i' } };
        }

        if (!sort) {

            const response = await ProductModel.paginate(filterOptions, {
                limit: limit,
                page: page,
            });
            return response
        } else if (sort === 'desc') {
            sortOptions = -1;
        } else {
            sortOptions = 1;
        }

        const response = await ProductModel.paginate(filterOptions, {
            limit: limit,
            page: page,
            sort: { price: sortOptions },
        });

        return response;
    } catch (error) {
        logger.fatal ('Error DAO:' + error.message);
    }
};

export const getProductById = async (id) => {
    try {
        const response = await ProductModel.findById(id)
        return response
    } catch (error) {
        logger.fatal ('Error DAO:' + error.message);
    }
}

export const addProduct = async (obj) => {
    try {
        const response = await ProductModel.create(obj)
        return response
    } catch (error) {
        logger.fatal ('Error DAO:' + error.message);
    }
}

export const updateProduct = async (id, obj) => {
    try {
        const response = await ProductModel.findByIdAndUpdate(id, obj, { new: true })
        return response
    } catch (error) {
        logger.fatal ('Error DAO:' + error.message);
    }
}

export const deleteProduct = async (id) => {
    try {
        const response = await ProductModel.findByIdAndDelete(id)
        return response

    } catch (error) {
        logger.fatal ('Error DAO:' + error.message);
    }
}



// FackerJS - Mocks //

import { fakerES_MX as faker } from "@faker-js/faker";
import { ProductModelMocks } from "./models/productModel_Mocks.js";

export const createProductsMock = async (cant = 100) => {
  try {
    
    const products = [];

    for (let i = 0; i < cant; i++) {

        
        
        const data = await ({
            title: faker.commerce.productName(),
            description: faker.commerce.productDescription(),
            code: faker.commerce.isbn (),
            price: parseInt(faker.commerce.price ()),
            stock: Math.floor(Math.random() * 99),
            category: faker.commerce.department(),
            thumbnails: faker.image.avatar()
            
        });

        products.push(data);



    }
    //habilitar para que se grabe en Mongo
    //return await ProductModelMocks.create (products);
    return products;

  } catch (error) {
    logger.fatal ('Error DAO:' + error.message);
}
};



export const getProductsMocks = async () => {
  try {
    return await ProductModelMocks.find({});
  } catch (error) {
    logger.fatal ('Error DAO:' + error.message);
}
};

