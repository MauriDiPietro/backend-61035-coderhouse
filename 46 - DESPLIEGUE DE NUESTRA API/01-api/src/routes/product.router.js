import { Router } from "express";
const router = Router();

router.get('/', (req, res)=>{
    res.json({
        msg: 'products',
        data: [
            {
                name: 'prod1',
                price: 6000
            },
            {
                name: 'prod2',
                price: 650
            }
        ]
    })
})

export default router