import express from "express";
import ProductManager from './ProductManager.js';
const app = express();

app.use(express.urlencoded({extended: true}));

const manager = new ProductManager()


app.get("/products", async(req, res)=>{
    let productos = await manager.getProducts()
    let { limit } = req.query;
    let limitProducts = limit ? productos.slice(0, limit) : productos
    res.send(limitProducts)
})

app.get('/product/:id', async (req, res) => {
    let id = req.params.id;
    let productos = await manager.getProducts();
    let prods = productos.find(prod => prod.id == id);
    res.send(prods)

})

const PORT = 8080;
const server = app.listen(PORT, () => {
    console.log('server iniciado')
})
server.on('error', error => console.log(error))