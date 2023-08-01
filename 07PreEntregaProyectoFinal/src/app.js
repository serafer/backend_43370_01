import express from 'express';
import { __dirname } from './utils.js';
import { errorHandler } from './middlewares/errorHandler.js';
import handlebars from 'express-handlebars';
import { Server } from 'socket.io';
import viewsRouter from './routes/views.router.js';
//import MessageManager from './daos/filesystem/chatDao.js';
//const msgManager = new MessageManager(__dirname+'/db/messages.json');


import morgan from 'morgan'
import './daos/mongodb/conection.js'

import productRouter from './routes/productRoutes.js';
import cartRouter from './routes/cartRoutes.js';
//import chatRouter from './routes/chatRoutes.js';
console.log();

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(express.static(__dirname + '/public'));
app.use(errorHandler);
app.use(morgan('dev'));

app.engine('handlebars', handlebars.engine()); 
app.set('view engine', 'handlebars');  
app.set('views', __dirname+'/views');

app.use('/api/products', productRouter);
app.use('/api/cart', cartRouter);
//app.use('/api/chat', chatRouter);

app.use('/chat', viewsRouter);


import * as servChat from '../src/services/chatServices.js'


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
})