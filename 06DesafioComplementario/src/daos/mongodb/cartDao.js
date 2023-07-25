import { CartsModel } from "./models/cartModel.js";

export const getCart = async () => {

    try {
        const response = await CartsModel.find({})
        console.log(response)
        return response

    } catch (error) {
        console.log(error);
    }

}

export const getCartById = async (id) => {

    try {
        const response = await CartsModel.find({ _id: id })
        console.log(response)
        return response

    } catch (error) {
        console.log(error);
    }

}

export const createCart = async () => {

    try {
        const newCart = await CartsModel.create({products: []})
        console.log('Cart created successfully')
        return newCart

    } catch (error) {
        console.log(error);
    }

}


export const saveProductToCart = async (id, productId) => {
    try {
        const cart = await CartsModel.findOne({ _id: id });
       // console.log("Carrito antes de la actualización:", cart);

        const prodIsInCart = cart.products.find((prod) => prod.id.toString() === productId);
       // console.log("Producto encontrado en el carrito:", prodIsInCart);

        if (prodIsInCart) {
            prodIsInCart.quantity++;
        } else {
            cart.products.push({
                id: productId,
                quantity: 1
            });
        }

        cart.markModified("products"); // Marcar el array 'products' como modificado en ambos casos
        await cart.save();
       // console.log('Carrito actualizado exitosamente');
       // console.log("Carrito después de la actualización:", cart);
        return cart;
    } catch (error) {
        console.log(error);
    }
};