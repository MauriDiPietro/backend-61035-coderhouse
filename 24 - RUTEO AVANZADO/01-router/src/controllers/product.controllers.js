import ProductManager from '../manager/products.manager.js';
const productManager = new ProductManager('./products.json');

export const getAllProducts = async(req, res) => {
    try {
        const products = await productManager.getAllProducts();
        res.status(200).json(products);
    } catch (error) {
        res.status(404).json({ message: error.message });
        console.log(error);
    }
}

export const createProduct = async (req, res)=>{
    try {
        console.log(req.body);
        const product = req.body;
        const newProduct = await productManager.createProduct(product);
        res.json(newProduct);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

export const deleteProducts = async(req, res)=>{
    try {
        await productManager.deleteAllProducts();
        res.send('products deleted successfully')
    } catch (error) {
        res.status(404).json({ message: error.message });

    }
}