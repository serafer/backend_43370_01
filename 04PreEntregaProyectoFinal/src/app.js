import express from 'express';
import morgan from 'morgan'
import { errorHandler } from './middlewares/errorHandler.js';
import productRouter from './routes/product.router.js';
import cartRouter from './routes/cart.router.js';

const app = express()

app.use(express.json());
app.use(express.urlencoded({ extended:true }));
app.use(morgan('dev'));
app.use(errorHandler);

app.use('/api/cart', cartRouter);
app.use('/api/products', productRouter);


app.listen(8080, () => {
    console.log('Server is running on port 8080');
});