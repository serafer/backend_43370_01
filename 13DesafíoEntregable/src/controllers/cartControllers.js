import * as service from '../services/cartServices.js'
import { getUserByID } from "../persistance/daos/mongodb/userDaoMongo.js";
import { createResponse } from "../utils/utils.js";

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

export const generateTicket = async (req, res, next) => {
    try {
        const user = await getUserByID(req.user);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        const userID = user.id;
        const cartID = user.cart[0].CartID;
        console.log('userID = ' + userID);
        console.log('cartID = ' + cartID);

        const ticket = await service.generateTicketService(userID, cartID);
        if (!ticket) {
            return res.status(404).json({ message: 'Error generating ticket' });
        }

        // Enviar el ticket como respuesta
        res.status(200).json(ticket);

    } catch (error) {
        console.log(error);
        next(error.message);
    }
}

