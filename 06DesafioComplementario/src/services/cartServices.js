import { createCart, getCart, getCartById, saveProductToCart } from "../daos/mongodb/cartDao.js";


export const getCartService = async () => {

    try {
        const cart = await getCart ()
        return cart
    } catch (error) {
        console.log(error);
    }

}

export const getCartByIdService = async (id) => {

    try {
        const cart = await getCartById (id)
        if (!cart) {return false; }
        else {return cart; }
    } catch (error) {
        console.log(error);
    }
}


export const createCartService = async () => {

    try {
        const cart = await createCart ()
        if (!cart) {return false; }
        else {return true; }
        

    } catch (error) {
        
        console.log(error);
    }
}

export const saveProductToCartService = async ( id, productId ) => {

try {
    const cart = await saveProductToCart ( id, productId )

return cart

} catch (error) {
    console.log(error);
}

}