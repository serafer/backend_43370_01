import { Router } from "express";
const router = Router ()


import cartRouter from './cartRoutes.js';
import productRouter from './productRoutes.js';
import userRouter from './userRoutes.js';

router.use('/products', productRouter);
router.use('/cart', cartRouter);
router.use('/users', userRouter);

export default router;