import express from 'express';
import cookieParser from 'cookie-parser';
import 'dotenv/config';

const app = express();

const SECRET = process.env.SECRET_KEY;

app.use(cookieParser(SECRET));
app.use(express.json());

app.get('/set-cookie', (req, res)=>{
    res.cookie('idioma', 'ingles').json({ msg: 'ok' })
})

app.get('/getcookie', (req, res)=>{
    console.log(req.cookies);
    const { idioma } = req.cookies;
    idioma === 'ingles' ? res.send('Hello!') : res.send('Hola!')
})

app.get('/set2', (req, res)=>{
    res.cookie('saludo', 'hola', { maxAge: 90000 }).json({ msg: 'ok' })
})

app.get('/set-signed-cookie', (req, res)=>{
    res.cookie('nombre', 'carlos', { signed: true, maxAge: 90000, httpOnly: true }).json({ msg: 'ok' })
})
//console.log(document.cookie)

app.get('/clear', (req, res)=>{
    const cookies = req.cookies;
    const signedCookies = req.signedCookies;
    const keys = Object.keys(cookies);
    const keys2 = Object.keys(signedCookies);
    //['nombre', 'saludo', 'idioma']
    // res.clearCookie('nombre');
    for (const cookie of keys) {
        res.clearCookie(cookie)
    };
    if(signedCookies){
        for (const cookie of keys2) {
            res.clearCookie(cookie)
        }
    };
    res.send('cookies clear')
})

app.listen(8080, ()=>console.log('server ok en puerto 8080'))