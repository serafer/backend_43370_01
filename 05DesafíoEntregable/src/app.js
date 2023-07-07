import express from 'express';
import { __dirname } from './utils.js';
import morgan from 'morgan'
import { Server } from 'socket.io'
import productRouter from './routes/product.router.js';
import cartRouter from './routes/cart.router.js';
import handlebars from 'express-handlebars';
import viewsRouter from './routes/views.router.js';
import { addProduct, deleteProduct, getProducts } from './managers/productManager.js';

const app = express()

app.use(express.json());
app.use(express.urlencoded({ extended:true }));
app.use(express.static(__dirname + '/public'))
app.use(morgan('dev'));


app.use('/api/cart', cartRouter);
app.use('/api/products', productRouter);
app.use('/', viewsRouter)

app.engine('handlebars', handlebars.engine());
app.set('views', __dirname + '/views');
app.set('view engine', 'handlebars');





const PORT = 8080
const httpServer = app.listen(PORT, ()=>{
    console.log(`Server listening on port ${PORT}`);
    //console.log('__dirname() = ' + __dirname);

});




const socketServer = new Server(httpServer);

socketServer.on('connection', async (socket) => {
    console.log(`User connected ${socket.id}`);

    socket.on('disconnect', () => {
        console.log('User disconnected');
    });
    
    socket.emit('allProducts', await getProducts());

    socket.on('newProduct', async (obj) => {
        await addProduct (obj);
        socketServer.emit('allProducts', await getProducts());
    })

    socket.on('deleteProduct', async (producto) => {
        await deleteProduct(Number(producto));
        //console.log(producto);
        socketServer.emit('allProducts', await getProducts());
    })
})