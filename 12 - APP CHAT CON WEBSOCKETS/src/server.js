import express from 'express';
import { __dirname } from './utils.js';
import { errorHandler } from './middlewares/errorHandler.js';
import handlebars from 'express-handlebars';
import { Server } from 'socket.io';
import viewsRouter from './routes/views.router.js';
import MessageManager from './managers/messages.manager.js';
const messageManager = new MessageManager(`${__dirname}/db/messages.json`);

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(express.static(__dirname + '/public'));

app.engine('handlebars', handlebars.engine()); 
app.set('view engine', 'handlebars');  
app.set('views', __dirname+'/views');  

app.use('/chat', viewsRouter);

app.use(errorHandler);

const httpServer = app.listen(8080, ()=>{
    console.log('🚀 Server listening on port 8080');
});

const socketServer = new Server(httpServer);

socketServer.on('connection', async(socket) => {
    console.log('🟢 ¡New connection!', socket.id);
    socketServer.emit('messages', await messageManager.getAll());   //emite a todos los clientes

    socket.on('disconnect', ()=>{
        console.log('🔴 User disconnect', socket.id);
    })

    socket.on('newUser', (user)=>{
        console.log(`> ${user} ha iniciado sesión`);
        socket.broadcast.emit('newUser', user);
    })

    socket.on('chat:message', async(msg)=>{
        await messageManager.createMsg(msg);
        socketServer.emit('messages', await messageManager.getAll());   //emite a todos los clientes
    })

    socket.on('chat:typing', (data)=>{
        socket.broadcast.emit('chat:typing', data)
    })
})