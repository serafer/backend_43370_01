import express, { json, urlencoded } from 'express';
import { __dirname
    , mongoStoreOptions
 } from './utils.js';
import { errorHandler } from './middlewares/errorHandler.js';
import handlebars from 'express-handlebars';
import { Server } from 'socket.io';
import cookieParser from 'cookie-parser';
import session from 'express-session';
//import {userSession} from "./daos/mongodb/userDao.js";
import morgan from 'morgan'
//import './daos/mongodb/conection.js'
import passport from 'passport';
import './passport/local-strategy.js'
import './passport/github-strategy.js'
import config from './config.js';

import './persistance/daos/factory.js'



/* routes */
import viewsRouter from './routes/viewsRoutes.js';
import apiRouter from './routes/index.js';


const app = express();

app.use(json());
app.use(urlencoded({extended:true}));
app.use(express.static(__dirname + '/public'));
app.use(errorHandler);
app.use(morgan('dev'));
//app.use(userSession);

/* handlebards */
app.engine('handlebars', handlebars.engine()); 
app.set('view engine', 'handlebars');  
app.set('views', __dirname+'/views');

/* cookies */
app.use(cookieParser());
app.use(session(mongoStoreOptions));

/* inicializo passport - antes de rutas y despues de session */
app.use(passport.initialize());
app.use(passport.session());

/* rutas */
app.use('/', viewsRouter);
app.use('/api', apiRouter);


import * as servChat from '../src/services/chatServices.js'
import { addProduct, deleteProduct, getProducts } from './persistance/daos/mongodb/productDaoMongo.js';


const PORT = config.PORT
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