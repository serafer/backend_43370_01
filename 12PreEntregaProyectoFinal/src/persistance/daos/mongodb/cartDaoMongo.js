import { CartsModel } from "./models/cartModel.js";
import { TicketModel } from "./models/ticketModel.js";
import { ProductModel } from "./models/productModel.js";


export const getCart = async () => {

    try {
        const response = await CartsModel.find({}).populate('products.ProductID')
       return response

    } catch (error) {
        console.log(error);
    }

}

export const getCartById = async (id) => {

    try {
        const response = await CartsModel.find({ _id: id }).populate('products.ProductID')
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


export const generateTicket = async (userID, cartID) => {
    try {
        // Obtén el carrito del usuario
        const userCart = await CartsModel.findById(cartID);
        if (!userCart) {
            throw new Error('Cart not found');
        }

        // Inicializa un arreglo para almacenar los IDs de los productos que no se pueden comprar
        const productsNotPurchased = [];

        // Calcula el total de la compra y actualiza el stock de los productos en el carrito
        let totalAmount = 0;

        for (const productItem of userCart.products) {
            const productID = productItem.ProductID;
            const quantityInCart = productItem.quantity;

            // Obtén el producto de la base de datos
            const productDB = await ProductModel.findById(productID);

            if (!productDB) {
                throw new Error(`Product with ID ${productID} not found`);
            }

            // Verifica si hay suficiente stock
            if (quantityInCart <= productDB.stock) {
                const amount = quantityInCart * productDB.price;
                totalAmount += amount;

                // Resta la cantidad comprada del stock del producto
                productDB.stock -= quantityInCart;
                await productDB.save();
            } else {
                // Si no hay suficiente stock, agrega el ID del producto a la lista de no comprados
                productsNotPurchased.push(productID);
            }
        }

        // Crea el ticket si se realizaron compras exitosas
        if (totalAmount > 0) {
            const ticketProducts = await Promise.all(userCart.products.map(async (productItem) => {
                const productID = productItem.ProductID;
                const quantity = productItem.quantity;
                const productDB = await ProductModel.findById(productID);
                const price = productDB ? productDB.price : 0; // Obtén el precio del producto desde la base de datos

                return {
                    ProductID: productID,
                    quantity: quantity,
                    price: price,
                };
            }));

            const ticket = await TicketModel.create({
                code: `${Math.random()}`,
                purchase_datetime: new Date().toLocaleString(),
                amount: totalAmount,
                purchaser: userID, // Cambia esto si deseas almacenar el ID del usuario
                products: ticketProducts,
            });

            // Vacía el carrito del usuario
            userCart.products = [];
            await userCart.save();

            return {
                ticket,
                productsNotPurchased,
            };
        } else {
            // No se pudo realizar ninguna compra
            return {
                ticket: null,
                productsNotPurchased,
            };
        }
    } catch (error) {
        console.error(error);
        throw error;
    }
};