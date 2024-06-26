import { Router } from "express";
const router = Router();
import ProductManager from '../manager/products.manager.js';
import { createProduct, deleteProducts, getAllProducts } from "../controllers/product.controllers.js";
const productManager = new ProductManager('./products.json');

// router.get('/', getAllProducts);

// router.post('/', createProduct);

// router.delete('/', deleteProducts);

router.route('/')
    .get(getAllProducts)
    .post(createProduct)
    .delete(deleteProducts)

router.get('/:id', async(req, res) => {
    try {
        const { id } = req.params;
        const product = await productManager.getProductById(Number(id));
        if(product){
            res.status(200).json({ message: 'Product found', product })
            // res.status(200).json(product)
        } else {
            res.status(400).send('product not found')
        }
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
});



router.put('/:id', async(req, res) => {
    try {
        const product = req.body;
        const { id } = req.params;
        const productFile = await productManager.getProductById(Number(id));
        if(productFile){
            await productManager.updateProduct(product, Number(id));
            res.send(`product updated successfully!`);
        } else {
            res.status(404).send('product not found')
        }
    } catch (error) {
        res.status(404).json({ message: error.message });

    }
});

router.delete('/:id', async(req, res)=>{
    try {
        const { id } = req.params;
        const products = await productManager.getAllProducts();
        if(products.length > 0){
            await productManager.deleteProductById(Number(id));
            res.send(`product id: ${id} deleted successfully`);
        } else {
            res.send(`product id: ${id} not found`);
        }
    } catch (error) {
        res.status(404).json({ message: error.message });

    }
});



export default router;

