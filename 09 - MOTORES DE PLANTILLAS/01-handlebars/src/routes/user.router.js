import { Router } from "express";
import fs from 'fs';

const router = Router();

router.post('/', async(req,res)=>{
    let users = [];
    if(fs.existsSync('./users.json')){
        let usersJSON = await fs.promises.readFile('users.json', 'utf-8');
        users = JSON.parse(usersJSON);
    }
    users.push(req.body)
    await fs.promises.writeFile('users.json', JSON.stringify(users));
    res.redirect('/users')
});

export default router;