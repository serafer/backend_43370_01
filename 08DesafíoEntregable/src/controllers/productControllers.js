import * as service from '../services/productServices.js'


export const getproduct = async (req, res, next) => {
    try {
        const { page, limit, sort, filter, filterValue } = req.query
        const response = await service.getProductsService(page, limit, sort, filter, filterValue);
        const nextPage = response.hasNextPage ? `http://localhost:8080/api/products?page=${response.nextPage}` : null;
        const prevPage = response.hasPrevPage ? `http://localhost:8080/api/products?page=${response.prevPage}` : null;
        const existHasPrevPage = response.hasPrevPage ? true : false;
        const existHasNextPage = response.hasNextPage ? true : false;
        const existPrevLink = prevPage ? true : false;
        const existNextLink = nextPage ? true : false;

        res.status(200).json({
            info: {
                status: 'success',
                payload: response.docs,
                totalPages: response.totalPages,
                prevPage: existPrevLink,
                nextPage: existNextLink,
                page: response.page,
                hasPrevPage: existHasPrevPage,
                hasNextPage: existHasNextPage,
                prevLink: prevPage,
                nextLink: nextPage
            }
        });
        console.log('controler ok');
    } catch (error) {
        next(error.message);
    }
};

export const getProductPaginationInfo = async () => {
    try {
        const response = await service.getProductsService(); // Llamar al servicio para obtener la información
        const hasPrevPage = response.hasPrevPage ? true : false;
        const hasNextPage = response.hasNextPage ? true : false;
        const nextPage = response.hasNextPage ? response.nextPage : null;
        const prevPage = response.hasPrevPage ? response.prevPage : null;
        const limit = response.limit ? response.limit : 10;
        const page = response.page ? response.page : null
        const totalPages = response.totalPages ? response.totalPages : null;
        const products = response.docs


        return { hasPrevPage, hasNextPage, nextPage, prevPage, limit, page, totalPages, products };
    } catch (error) {
        console.log(error);
        return { hasPrevPage: false, hasNextPage: false }; // Devolver valores predeterminados en caso de error
    }
    
};


export const getProductById = async (req, res, next) => {

    try {

        const { id } = req.params;
        const product = await service.getProductByIdService(id)

        if (!product) res.status(404).json({ message: 'Product not found' });
        else res.status(200).json({ message: product })

    } catch (error) {
        next(error.message)

    }
}


export const addProduct = async (req, res, next) => {

    try {

        const product = await service.addProductService(req.body)
        if (!product) res.status(404).json({ message: 'Error creating product' })
        else res.status(200).json(product)

    } catch (error) {
        next(error.message)
    }
}


export const updateProduct = async (req, res, next) => {

    try {

        const { id } = req.params

        const productUpdated = await service.updateProductService(id, req.body)
        res.json(productUpdated)

    } catch (error) {
        next(error.message)
    }
}


export const deleteProduct = async (req, res, next) => {


    try {
        const { id } = req.params
        const deletedProd = await service.deleteProductService(id)
        res.status(200).json(deletedProd)

    } catch (error) {
        next(error.message)
    }
}

