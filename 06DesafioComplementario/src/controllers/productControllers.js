import * as service from '../services/productServices.js'


export const getproduct = async (req, res, next) => {
    try {
      const response = await service.getProductsService();
      res.status(200).json(response);
      console.log('controler ok');
    } catch (error) {
      next(error.message);
    }
  };





export const getProductById = async (req, res, next)  => {

    try { 

        const { id } = req.params;
        const product = await service.getProductByIdService (id)

        if(!product) res.status(404).json ({ message: 'Product not found'});
        else res.status(200).json({ message:product })
        
        }catch (error) {
        next(error.message)
        
    }
}


export const addProduct = async (req, res, next)  => {

    try {

        const product = await service.addProductService (req.body)
        if (!product) req.status(404).json({ message: 'Error creating product'})
             else res.status(200).json (product)

    } catch (error) {
        next(error.message)
    }
}


export const updateProduct = async (req, res, next)  => {

    try {
        
        const { id } = req.params

        const productUpdated = await service.updateProductService (id, req.body)
        res.json(productUpdated)

    } catch (error) {
        next(error.message)
    }
}


export const deleteProduct = async (req, res, next)  => {


    try {
        const { id } = req.params
        const deletedProd = await service.deleteProductService (id)
        res.status(200).json (deletedProd)
        
    } catch (error) {
        next(error.message)
    }
}

