import { Router } from "express";
const router = Router();

import { addProduct, getProductById, getProducts, deleteProduct, updateProduct } from "../managers/productManager.js"





router.get('/', async (req, res, next) => {

    try {

        const { limit } = req.query;

        const products = await getProducts()
        res.status(200).json({ products: products.slice(0, limit) });
        console.log('success', products.length)


    } catch (error) {

        next(error)

    }
})



router.get('/:idp', async (req, res, next) => {

    try {
        const { idp } = req.params;
        const products = await getProductById(parseInt(idp))
        if (products) {
            res.status(200).json({ products })
        } else {
            res.status(404).json({ message: `Product ${idp} not found` });
        }
    } catch (error) {
        next(error)
    }
})

router.post('/', async (req, res, next) => {
    try {
        const product = req.body
        const productCreated = await addProduct(product)
        res.json(productCreated)
    } catch (error) {
        next(error)
    }
})


router.put('/:id', async (req, res, next) => {
    try {
        const product = req.body
        const { id } = req.params;
        const prod = await getProductById(parseInt(id))
        if (prod) {
            
            await updateProduct(parseInt(id), product)
            res.send(`Product ${id} updated successfully`)
        } else {
            res.status(404).json({ message: `Product ${id} not found` });

        }
    } catch (error) {
        next(error)
    }
})


router.delete('/:id', async (req, res, next) => {

    try {

        const { id } = req.params;
        const products = await getProductById(parseInt(id))

        if (products) {

            await deleteProduct(parseInt(id))

            res.send(`Product ${products.title} with ID:${parseInt(id)} was deleted`)
        } else {
            res.json({ message: `Product ${parseInt(id)} not found` })
        }

    } catch (error) {
        next(error)

    }
})

export default router