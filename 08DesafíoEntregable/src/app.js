import express from 'express';
import { __dirname } from './utils.js';
import { errorHandler } from './middlewares/errorHandler.js';
import handlebars from 'express-handlebars';
import { Server } from 'socket.io';
import MongoStore from 'connect-mongo';
import { connectionString } from './daos/mongodb/conection.js';
import cookieParser from 'cookie-parser';
import session from 'express-session';
import userSession from "./daos/mongodb/userDao.js";
import morgan from 'morgan'
import './daos/mongodb/conection.js'

import productRouter from './routes/productRoutes.js';
import cartRouter from './routes/cartRoutes.js';
import viewsRouter from './routes/viewsRoutes.js';
import userRouter from './routes/userRoutes.js';


const mongoStoreOptions = {
    store: MongoStore.create({
        mongoUrl: connectionString,
        crypto: {
            secret: '1234'
        }
    }),
    secret: '1234',
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 60000
    }
};

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(express.static(__dirname + '/public'));
app.use(errorHandler);
app.use(morgan('dev'));
app.use(userSession);

app.engine('handlebars', handlebars.engine()); 
app.set('view engine', 'handlebars');  
app.set('views', __dirname+'/views');


app.use(cookieParser());
app.use(session(mongoStoreOptions));

app.use('/api/products', productRouter);
app.use('/api/cart', cartRouter);
app.use('/', viewsRouter);
app.use('/api/users', userRouter);


import * as servChat from '../src/services/chatServices.js'
import { addProduct, deleteProduct, getProducts } from './daos/mongodb/productDao.js';


const PORT = 8080
const httpServer = app.listen(PORT, ()=>{
    console.log(`Server listening on port ${PORT}`);

});

const socketServer = new Server(httpServer);

socketServer.on('connection', async(socket)=>{
    console.log('¡New connection!', socket.id);

    socketServer.emit('messages', await servChat.getChatService());

    socket.on('disconnect', ()=>{
        console.log('¡User disconnect!', socket.id);
    })

    socket.on('newUser', (user)=>{
        console.log(`>${user} inició sesión`);
    })

    socket.on('chat:message', async(msg) =>{
        await servChat.createService(msg);
        socketServer.emit('messages', await servChat.getChatService());
    })

    socket.emit('msg', 'bienvenido al chat');

    socket.on('newUser', (user)=>{
        socket.broadcast.emit('newUser', user); //llega a todos, menos al que inició sesión
    })

    socket.on('chat:typing', (user)=>{
        socket.broadcast.emit('chat:typing', user)
    })




    socket.emit('allProducts', await getProducts());

    socket.on('newProduct', async (obj) => {
        await addProduct (obj);
        socket.emit('allProducts', await getProducts());

        })

    socket.on('deleteProduct', async (producto) => {
        await deleteProduct(Number(producto));
        socketServer.emit('allProducts', await getProducts());
    })


    socket.on('logout', () => {
        socketServer.user = null;
        socketServer.emit('logout');
      });
})