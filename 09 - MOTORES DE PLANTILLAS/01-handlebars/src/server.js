import express from 'express';
import {__dirname} from './utils.js'
import handlebars from 'express-handlebars';
import viewsRouter from './routes/views.router.js'
import userRouter from './routes/user.router.js'

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use(express.static(__dirname + '/public'));

app.engine('handlebars', handlebars.engine());
app.set('views', __dirname + '/views');
app.set('view engine', 'handlebars');

app.use('/', viewsRouter);
app.use('/users', userRouter);

const PORT = 8080;

app.listen(PORT, ()=>console.log(`Server ok en puerto ${PORT}`))
