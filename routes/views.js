import { Router } from 'express';
import fs from 'fs';
import ProductManager from '../ProductManager.js';
const viewsRouter = Router()
const manager = new ProductManager()

viewsRouter.get('/', (req, res) => {
    const data = fs.readFileSync('carritos.json');
    const cart = JSON.parse(data)
    res.render('home', {cart})
})

viewsRouter.get('/realtimeproducts', async(req, res) => {
    try{
    let allProds = await manager.getProducts()
    res.render('realtimeproducts', {
        title : "hola",
        products: allProds
    })
} catch (error){
    res.status(400).send({
        status:"error",
        msg: "no se puede visualizar los products"
    })
}
})

export default viewsRouter;