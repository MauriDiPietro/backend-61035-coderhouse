import express from 'express';
import session from 'express-session';
import 'dotenv/config';

const SECRET = process.env.SECRET_KEY

const app = express();

app.use(express.json());

const sessionConfig = {
    secret: SECRET,
    cookie: { maxAge: 60000 },
    saveUninitialized: true,
    resave: false
};

app.use(session(sessionConfig));

const users = [
    {
        username: 'juan',
        password: '1234',
        admin: true
    },
    {
        username: 'jose',
        password: '123456',
        admin: false
    }
];

const validateLogin = (req, res, next) => {
    if(req.session.info.loggedIn) next()
        else res.send('no estas autorizado')
}

app.post('/login', (req, res)=>{
    const { username, password } = req.body;
    const index = users.findIndex((user)=>user.username === username && user.password === password);
    if(index < 0) res.status(401).json({ msg: 'No estas autorizado' });
    else {
        const user = users[index];
        req.session.info = {
            loggedIn: true,
            contador: 1,
            admin: user.admin
        }
    }
    res.json({msg: 'Bienvenido'})
})

app.get('/get-session', (req, res)=>{
    res.send(req.session)
})

app.post('/logout', (req, res)=>{
    req.session.destroy()
    res.json({msg: 'logout ok'})
})

app.get('/secret-endpoint', validateLogin, (req, res)=>{
    res.send({msg: 'info para usuarios logueados'})
})

app.listen(8080, ()=>console.log('server ok 8080'));