import { Router } from "express"
const router = Router();
import { getCart, createCart, getCartById,saveProductToCart } from "../managers/cartManager.js"
import { getProductById } from "../managers/productManager.js";

router.get ('/', async (req, res, next) => {

    try {
        const cart = await getCart()
        if(cart){
            res.status(200).json(cart);
            console.log('success')
        } else {
            res.status(400).send({msg: `Thereis no cart`});
}        
    } catch (error) {
        next(error)
    }

})

router.get ('/:idCart', async (req, res, next) => {
    try {

        const {idCart} = req.params
        const cart = await getCartById(Number(idCart))


        if (cart) {
            
                res.status(200).json(cart);
            } else {
                res.status(400).send({msg: `Cart id ${idCart} does not exist`});
    
            
        }
    } catch (error) {
        next(error)
    }
})


router.post('/', async (req,res, next)=>{

    try {
        const newCart = await createCart()
        
        res.status(200).json(newCart)
        console.log('success')

    } catch (error) {
        next(error)
    }
    
})


router.post('/:idCart/prod/:idProduct', async (req,res)=>{
   
    try {
        
const { idCart, idProduct } = req.params

const prodEx = await getProductById(Number(idProduct));
console.log("el producto existe", prodEx)
const savePro = await saveProductToCart(idCart,idProduct)

if (savePro) {

    res.status(200).json({message:"updated successfully", savePro });

} else {

    res.status(404).json({ message: error.message });

}
    } catch (error) {
        next(error)
    }
})

export default router