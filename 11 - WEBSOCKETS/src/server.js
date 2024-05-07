import express from "express";
import handlebars from "express-handlebars";
import { __dirname } from "./utils.js";
import { Server } from 'socket.io'

const app = express();

app.use(express.json());
app.use(express.static(__dirname + "/public"));

app.engine("handlebars", handlebars.engine());
app.set("view engine", "handlebars");
app.set("views", __dirname + "/views");

app.get('/realtimeproducts', (req, res)=>{
  res.render('websocket')
})

const httpServer = app.listen(8080, () => {
  console.log("Escuchando al puerto 8080");
});

const socketServer = new Server(httpServer);

const products = [];

socketServer.on('connection', (socket)=>{
  console.log(`Usuario conectado: ${socket.id}`);

  socket.on('disconnect', ()=>{
    console.log('Usuario desconectado');
  })

  socket.emit('saludoDesdeBack', 'Bienvenido a websockets')

  socket.on('respuestaDesdeFront', (message)=>{
    console.log(message);
  })

  socket.on('newProduct', (prod)=>{
    products.push(prod);
    socketServer.emit('products', products);
  })

  app.post('/', (req, res)=>{
    const { message } = req.body;
    socketServer.emit('message', message);
    res.send('se envió mensaje al socket del cliente')
  })

})