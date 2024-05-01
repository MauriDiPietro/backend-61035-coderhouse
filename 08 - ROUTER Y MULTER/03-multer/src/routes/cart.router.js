import { Router } from "express";
const router = Router();

router.post('/', (req,res)=>{
    //crear carrito con un y array products
})

router.post('/:idCart/product/:idProd', (req,res)=>{
    //consultar los carritos existentes dado un id
    //carritos.products.some(idProd) ---> Buscar si existe el prudcto en el carrito
    //si no existe, creo un nuevo objeto producto con el id y la cantidad
    //push y guardan en el json
    //si existe, le sumo la cantidad
})

router.get('/:idCart', (req,res)=>{
    //retornar el carrito con sus productos
})