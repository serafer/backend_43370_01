import fs from 'fs';
import { __dirname } from '../utils.js';
import { getProductById } from './productManager.js';
const pathFile = __dirname + "/db/carts.json";


export const getCart = async () => {
    try {
        if (fs.existsSync(pathFile)) {
            const data = await fs.promises.readFile(pathFile, 'utf8');
            const datajs = JSON.parse(data);
            return datajs
        } else {
            return []
        }
    }
    catch (error) {
        console.log(error);
        return error;
    }
}



// export const createCart = async () => {
//     try {
//       let cartFile = [];
  
//       if (fs.existsSync(pathFile)) {
//         const data = await fs.promises.readFile(pathFile, 'utf8');
//         cartFile = JSON.parse(data);
//       }
  
//       const getMaxIDCart = () => {
//         let maxId = 0;
//         cartFile.forEach((prod) => {
//           if (prod.id > maxId) maxId = prod.id;
//         });
//         return maxId;
//       };
  
//       const maxId = getMaxIDCart();
//       const cart = {
//         id: maxId + 1,
//         products: [],
//       };
  
//       cartFile.push(cart);
//       await fs.promises.writeFile(pathFile, JSON.stringify(cartFile));
  
//       console.log(`Product ${cart.id} has been added to cart`);
//       return `Product ${cart.id} has been added to cart`;
//     } catch (error) {
//       console.log('Error', error);
//       return error;
//     }
//   };







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
            quantity: 0,
        };
        const cartFile = await getCart();
        cartFile.push(cart);
        await fs.promises.writeFile(pathFile, JSON.stringify(cartFile));

        console.log(`Product ${cart.id} has been added to cart`);
        return `Product ${cart.id} has been added to cart`;

    } catch (error) {
        console.log(`Error`);
        return error;
    }
}




export const getCartById = async (cartId) => {

    try {
        if (fs.existsSync(pathFile)) {
            const data = await fs.promises.readFile(pathFile, 'utf8');
            const datajs = JSON.parse(data);
            const cart = datajs.find(cart => cart.id === cartId);

            if (cart) {
                console.log(cart);
                return cart;
            } else {
                console.log(`Cart ${cartId} not found`);
                return null;
            }
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
        const productExist = await getProductById(idProductNum); //traigo el producto
        const productIsInCart = cartsFile.find(product => product.id === idProductNum) // valido si el producto ya está en el cart

        if (!productExist) {

            return `Product ${idProductNum} not found`;
        } else if (!cartExist) {

            return `Cart ${idCartNum} not found`;

        } else if (productIsInCart) {

            productIsInCart.quantity++

        } else {

            const prod = {
                id: idProductNum,
                quantity: 1
            }
            cartExist.products.push(prod);

        }
        await fs.promises.writeFile(pathFile, JSON.stringify(cartsFile));
        return cartExist
        
    } catch (error) {
        console.log(error);

}



}