import { Router } from "express";
const router = Router();

// router.get('/:email', (req, res)=>{
//     const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/
//     const { email } = req.params;
//     if(email.match(emailRegex)){
//         // if(emailRegex.test(email)){
//         //await services.getByEmail(email)...................
//         res.send('email valido')
//     } else res.status(404).send('email invalido')
// });

router.get('/:email([A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,})', (req, res)=>{
        //await services.getByEmail(email)...................
        res.send('email valido')
});

router.get('/name/:name([a-zA-Z]+)', (req, res)=>{
    res.send('nombre valido')
});

router.get('/email/:email2', (req, res)=>{
    //await services.getByEmail(email)...................
    res.send('email valido')
});

router.param('email2', (req, res, next, email2)=>{
    const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/
    const isValid = email2.match(emailRegex)
    if(isValid) next()
    else res.status(400).send('email invalido desde middleware param')
})

// router.all('/email', (req, res, next)=>{
//     console.log('se accedió a esta url: ', req.url);
//     next()
// })

router.get(/hola/, (req, res, next)=>{
    res.send('ab*cd')
})

router.get(/.*hola$/, (req, res, next)=>{
    res.send('ab*cd')
})

router.get('*', (req, res)=>{
    res.send('ruta inexistente')
});


export default router;