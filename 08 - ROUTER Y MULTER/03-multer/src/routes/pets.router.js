import { Router } from "express";
const router = Router();

const pets=[];

router.get('/', (req,res)=>{
    res.json(pets)
})

router.post('/', (req, res)=>{
    pets.push(req.body)
    res.json({msg: 'Mascota agregada con éxito'})
})

export default router;