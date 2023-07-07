import { Router } from 'express';
import { getProducts } from '../managers/productManager.js';
const router = Router();

router.get('/', (req, res) => {
    res.render('home');
});

router.get('/realTimeProducts', (req, res) => {
    res.render('realTimeProducts');
});

router.get('/websockets', async (req, res) => {
    
    const products = await getProducts()
    console.log (products.length)
    res.render('websockets', products);
    
});

export default router;
