import { Router } from "express";
import fs from 'fs'

const router = Router();

router.get('/', (req, res)=>{
    res.render('vista1', {layout: 'main2.handlebars'})
});

router.get('/vista2', (req, res)=>{
    res.render('vista2')
});

router.get('/vista3', (req, res)=>{
    let user = {
        firstname: 'Pedro',
        lastname: 'Sarobe'
    }
    res.render('vista3', {user})
});

const users = [
    {
        firstname: 'Juan',
        lastname: 'Perez',
        age: 30,
        mail: 'juan@mail.com',
        phone: "65458942"
    },
    {
        firstname: 'Carlos',
        lastname: 'Perez',
        age: 45,
        mail: 'car@mail.com',
        phone: "6767676"
    },
    {
        firstname: 'Juana',
        lastname: 'Perez',
        age: 56,
        mail: 'juani@mail.com',
        phone: "6577"
    },
    {
        firstname: 'Ernestina',
        lastname: 'Perez',
        age: 33,
        mail: 'ernes@mail.com',
        phone: "43535"
    }
];

router.get('/actividad', (req, res)=>{
    const random = Math.floor(Math.random() * 4);
    const user = users[random];
    res.render('act', { user });
});

router.get('/lista1', (req, res)=>{
    res.render('lista1', { users })
});

router.get('/lista2', (req, res)=>{
    res.render('lista2', { users })
});

router.get('/form', (req, res)=>{
    res.render('form')
});

router.get('/users', async(req, res)=>{
    let usersJSON = await fs.promises.readFile('users.json', 'utf-8')
    let users = JSON.parse(usersJSON)
    res.render('users', { users })
});

export default router;