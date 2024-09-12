import express from "express";
import productRouter from './routes/product.router.js'
const app = express();

app.get("/", (req, res) => res.send("Express on Vercel"));

app.use(express.json());
app.use(express.urlencoded({ extended:true }));

app.use('/products', productRouter);

app.listen(3000, () => console.log("Server ready on port 3000."));

export default app;