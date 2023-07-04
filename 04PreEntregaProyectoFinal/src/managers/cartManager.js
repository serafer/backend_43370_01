import fs from 'fs';
import { __dirname } from '../utils.js';
import { getProductById } from './productManager.js';
const pathFile = __dirname + "/db/carts_.json";


export const getCart = async () => {
    try {
        if (fs.existsSync(pathFile)) {
            const data = await fs.promises.readFile(pathFile, 'utf8');
            const cartJSON = JSON.parse(data);
            return cartJSON
        } else {
            return []
        }
    }
    catch (error) {
        console.log(error);
        return error;
    }
}



export const createCart = async () => {
    try {
        const getMaxIDCart = async () => {
            let maxId = 0;
            const cartMax = await getCart();
            cartMax.map((prod) => {
                if (prod.id > maxId) maxId = prod.id;
            });
            return maxId;
        };

        const maxId = await getMaxIDCart()
        const cart = {
            id: maxId + 1,
            products: [],
        };
        const cartFile = await getCart();
        cartFile.push(cart);
        await fs.promises.writeFile(pathFile, JSON.stringify(cartFile));

        return `Cart ${cart.id} has been created successfully`;

    } catch (error) {
        console.log(`Error`);
        return error;
    }
}




export const getCartById = async (cartId) => {

    try {

        const carts = await getCart()

        const cart = carts.find(cart => cart.id === cartId);

        if (cart) {
            return cart;
        } else {
            console.log(`Cart ${cartId} not found`);
            return false;
        }

    }
    catch (error) {
        console.log(error);
        return error;
    }
}



export const saveProductToCart = async (idCart, idProduct) => {
    try {

        const idProductNum = Number(idProduct);
        const idCartNum = Number(idCart);

        const cartsFile = await getCart();  //traigo array de productos
        const cartExist = await getCartById(idCartNum);    //traigo el cart solicitado

        const cartIndex = cartsFile.findIndex(cart => cart.id === idCart)


        const productExist = await getProductById(idProductNum); //traigo el producto

        const productIsInCart = cartExist.products.find(product => product.id == idProductNum) // valido si el producto ya está en el cart

        if (!productExist) {

            return `Product ${idProductNum} not found`;
        } else if (!cartExist) {

            return `Cart ${idCartNum} not found`;

        } else {

            if (productIsInCart) {

                const index = cartExist.products.findIndex(cart => cart.id == idProduct)

                console.log("hola")
            

                productIsInCart.quantity += 1
                cartsFile[cartIndex].products[index] = productIsInCart

            } else {

                console.log('Cart products:', cartExist.products);
                console.log('ID of the product to find:', idProductNum)

                const prod = {
                    id: idProductNum,
                    quantity: 1
                }
                cartExist.products.push(prod);
                cartsFile[cartIndex] = cartExist

                console.log('Cart products:', cartExist.products);
                console.log('cartsFile:', cartsFile)


                
            }
        }





        await fs.promises.writeFile(pathFile, JSON.stringify(cartsFile));
        return cartExist

    } catch (error) {
        return { message: error.message || error.message }

    }



}