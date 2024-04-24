import express from "express";
import { products } from './products.js'

const app = express();

app.get('/home', (req, res)=>{
    res.send('<h1>Hola mundo!</h1>')
    // res.json(products)
    // res.redirect('/home')
    // res.render()
    // res.status(404).json({msg: 'Error, no podes ingresar'})
})

app.get('/products', (req, res)=>{
    // res.json(products)
    // console.log(req);
    //query
    const { value } = req.query
    // const value = req.query.value
    console.log(value);
    const productsFilter = products.filter(p => p.price > parseInt(value))
    res.json(productsFilter)
    //! PRECIO MAYOR A: _15_ |BUSCAR| --> GET localhost:8080/products?value=15
    
})

app.get('/product/:id', (req, res)=>{
    //params
    const { id } = req.params;
    // const { idCat } = req.params;
    console.log(id);
    const prod = products.find(p => p.id === parseInt(id))
    if(!prod) res.json({msg: 'Product not found'})
    else res.json(prod)
//! |coca-cola| ---> GET http://localhost:8080/product/3
})


const PORT = 8080

app.listen(PORT, ()=>console.log(`Server ok en puerto ${PORT}`))