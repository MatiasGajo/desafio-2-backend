import { Router } from 'express';
import fs from 'fs';
import ProductManager from '../ProductManager.js';
import CManager from '../models/DAO/cartM.js';
import PManager from '../models/DAO/prodM.js';
import { Productsmodel } from '../models/prod.model.js';
const viewsRouter = Router()
const manager = new ProductManager()
const cart = new CManager();
const prod = new PManager();

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


viewsRouter.get('/:cid',  async(req, res) => {
    let cid = req.params.cid;
    let products = await cart.visualizarProd(cid);
    res.render('cart', {products})
})

viewsRouter.get('/products', async(req, res) => {
    const {page = 1, limit = 4} = req.query;
    const {docs, hasPrevPage, hasNextPage, nextPage, prevPage} = await Productsmodel.paginate({}, {page, limit, lean: true})
    const productos = docs;
    res.render('products', {
        productos,
        hasPrevPage,
        hasNextPage,
        prevPage,
        nextPage
    })

})
export default viewsRouter;