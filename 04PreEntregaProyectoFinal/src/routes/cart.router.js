import { Router } from "express"
const router = Router();
import { getCart, createCart, getCartById,saveProductToCart } from "../managers/cartManager.js"

router.get ('/', async (req, res, next) => {

    try {
        const cart = await getCart()
        if(cart){
            res.status(200).json(cart);
            console.log('success', cart.length)
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
                console.log('success', cart.length)
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


const savePro = await saveProductToCart(parseInt(idCart), parseInt(idProduct))

if (savePro) {

    res.status(200).json(savePro)
    console.log('success')
    console.log (idCart.type, idProduct.type)


} else {

    res.status(404).json({ message: error.message });

}
    } catch (error) {
        next(error)
    }
})

export default router