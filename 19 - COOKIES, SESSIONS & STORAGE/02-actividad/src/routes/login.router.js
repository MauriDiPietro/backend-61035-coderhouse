import { Router } from "express";

const router = Router();

router.post('/', (req, res)=>{
    const { name, email } = req.body;
    res.cookie('email', email, { maxAge: 100000 }).send('cookie agregada con exito')
})

router.get('/get-cookie', (req, res)=>{
    res.send(req.cookies)
})

export default router;

