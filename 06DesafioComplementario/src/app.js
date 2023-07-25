import express from 'express';
import { errorHandler } from './middlewares/errorHandler.js';
import morgan from 'morgan'
import './daos/mongodb/conection.js'

import productRouter from './routes/productRoutes.js';
import cartRouter from './routes/cartRoutes.js';


const app = express();

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(errorHandler);
app.use(morgan('dev'));

app.use('/api/products', productRouter);
app.use('/api/cart', cartRouter);



const PORT = 8080
app.listen(PORT, ()=>{
    console.log(`Server listening on port ${PORT}`);

});

