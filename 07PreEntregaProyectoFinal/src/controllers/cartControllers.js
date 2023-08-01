import * as service from '../services/cartServices.js'

export const getCart = async (req,res,next) => {

    try {
        
        const data = await service.getCartService()
        res.status(200).json(data)
        

    } catch (error) {
        next(error.message)
    }
}

export const getCartById = async (req,res,next) => {

    try {

        const { id } = req.params
        const cart = await service.getCartByIdService (id)

        if (!cart) res.status(404).json ({ message: 'Cart not found'})
        else res.status(200).json (cart)
    } catch (error) {
        next(error.message)
    }
}

export const createCart = async (req,res,next) => {

    try {

        const cart = await service.createCartService ()
        if (!cart) req.status(404).json({ message: 'Error creating Cart' })
        else res.status(200).json ({ message: 'Cart created successfully'})
        
    } catch (error) {
        next(error.message)
    }
}

export const saveProductToCart = async (req,res,next) => {

    try {
        
        const { id, productId } = req.params

        const cart = await service.saveProductToCartService ( id, productId )

        res.status(200).json({ message: 'Product saved successfully' })

    } catch (error) {
        next(error.message)
    }
}




export const deleteProductInCart = async (req,res,next) => {

    try {
        
        const { id, productId } = req.params

        const cart = await service.deleteProductInCartService (id, productId)

        res.status(200).json({ message: 'Product deleted successfully',
        
        cart
    })

    } catch (error) {
        next(error.message)
    }
}


export const cleanCart = async (req, res, next) => {

    try {
        
        const {id} = req.params
        
        const cart = await service.cleanCartService (id)

        res.status(200).json({ message: 'Cart cleaned successfully',
        
        cart
    })

    } catch (error) {
        next(error.message)
    }
}




export const updateQuantityInCart = async (req,res,next) => {

    try {
        
        const { id, productId } = req.params

        const { quantity } = req.body

        const cart = await service.updateQuantityInCartService ( id, productId, quantity )

        res.status(200).json({ message: 'Product saved successfully', 'cart': cart  })

    } catch (error) {
        next(error.message)
    }
}


export const updateCart = async (req,res,next) => {

    try {
        
        const { id } = req.params

        //const { obj } = req.body

        const obj = req.body;


        const cart = await service.updateCartService ( id, obj )

        res.status(200).json({ message: 'Product saved successfully', 'cart': cart  })

    } catch (error) {
        next(error.message)
    }
}