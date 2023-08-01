import { ProductModel } from "./models/productModel.js";


export const getProducts = async (page = 1, limit = 10, sort, filter, filterValue) => {
    try {
        let sortOptions;
        let filterOptions = {};

        // Si se proporciona la consulta, agregamos el filtro a las opciones
       
            if (filter && filterValue) {
                filterOptions = { [filter]: { $regex: filterValue, $options: 'i' } };
            }

            // Otros campos para búsqueda general que pueden ser definidos aquí
            // filterOptions.field1 = { $regex: query, $options: 'i' };
            // filterOptions.field2 = { $regex: query, $options: 'i' };
       


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

        console.log('productDao ok');
        return response;
    } catch (error) {
        console.log(error);
    }
};



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
