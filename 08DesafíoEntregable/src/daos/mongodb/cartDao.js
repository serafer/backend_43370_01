import { CartsModel } from "./models/cartModel.js";

export const getCart = async () => {

    try {
        const response = await CartsModel.find({}).populate('products.ProductID')
       // console.log(response)
        return response

    } catch (error) {
        console.log(error);
    }

}

export const getCartById = async (id) => {

    try {
        const response = await CartsModel.find({ _id: id }).populate('products.ProductID')
        //console.log(response)
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
        //console.log("Carrito antes de la actualización:", cart);

        const prodIsInCart = cart.products.find((prod) => prod.ProductID.toString() === productId);
        //console.log("Producto encontrado en el carrito:", prodIsInCart);

        if (prodIsInCart) {
            prodIsInCart.quantity++;
        } else {
            cart.products.push({
                ProductID: productId,
                quantity: 1
            });
        }

        cart.markModified("products"); // Marcar el array 'products' como modificado en ambos casos
        await cart.save();
        //console.log('Carrito actualizado exitosamente');
        //console.log("Carrito después de la actualización:", cart);
        return cart;
    } catch (error) {
        console.log(error);
    }
};



export const deleteProductInCart = async (id, productId) => {

    try {

        const cart = await CartsModel.findOne({ _id: id });
        //console.log("Carrito seleccionado:", cart);

        const prodIsInCart = cart.products.find((prod) => prod.ProductID.toString() === productId);
        //console.log("Producto encontrado en el carrito:", prodIsInCart);

        if (prodIsInCart) {

            //console.log("Producto Eliminado", productId);

            cart.products = cart.products.filter((prod) => prod.ProductID.toString() !== productId);

            

            //cart.markModified("products"); // Marcar el array 'products' como modificado en ambos casos
            await cart.save();
            //console.log('Carrito actualizado exitosamente', cart );
            //console.log("Carrito después de la actualización:", cart);
            return cart;
        } else {
            //console.log('Error: El producto no se encontró en el carrito');
            return cart; // Podrías lanzar una excepción o un mensaje de error más específico si lo deseas.
        }



    } catch (error) {
        console.log(error);
    }

}


export const cleanCart = async (id) => {
    try {
        const cart = await CartsModel.findById(id);

        if (cart) {
            cart.products = []; // Eliminar todos los productos del carrito

            await cart.save();
            console.log('Cart empty');
            return cart;
        } else {
            console.log('Error: cart not found');
            return null;
        }
    } catch (error) {
        console.log(error);
    }
};


export const updateQuantityInCart = async (id, productId, quantity) => {
    try {
        const cart = await CartsModel.findOne({ _id: id });
        //console.log("Carrito antes de la actualización:", cart);

        const prodIsInCart = cart.products.find((prod) => prod.ProductID.toString() === productId);
        //console.log("Producto encontrado en el carrito:", prodIsInCart);

        if (prodIsInCart) {
            const productIndex = cart.products.findIndex((prod) => prod.ProductID.toString() === productId.toString());
            if (productIndex === -1) {
                throw new Error('Product not found in the cart');
            }

            // Verificar si la cantidad enviada es un número válido
            if (!Number.isNaN(quantity) && Number.isInteger(quantity) && quantity >= 0) {
                cart.products[productIndex].quantity = quantity;
            } else {
                throw new Error('Invalid quantity value');
            }
        } else {
            console.log("Product not founded. Impossible to update quantity");
        }

        cart.markModified("products"); // Marcar el array 'products' como modificado en ambos casos
        await cart.save();
        //console.log('Carrito actualizado exitosamente');
        //console.log("Carrito después de la actualización:", cart);
        return cart;
    } catch (error) {
        console.log(error);
    }
}



export const updateCart = async (id, obj) => {
    try {
        // Primero, encuentra el carrito por su ID
        const cart = await CartsModel.findById(id);

        if (!cart) {
            throw new Error('Cart not found');
        }

        // Luego, actualiza el arreglo de productos (obj) con los datos proporcionados
        cart.products = obj;

        // Marca el arreglo 'products' como modificado
        cart.markModified('products');

        // Guarda los cambios en la base de datos
        await cart.save();

        //console.log('Carrito actualizado exitosamente');
        //console.log("Carrito después de la actualización:", cart);
        return cart;
    } catch (error) {
        console.log(error);
    }
}
