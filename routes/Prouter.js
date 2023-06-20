import { Router } from "express";
import PManager from '../models/DAO/prodM.js';
const Prouter = Router()

const manager = new PManager;


Prouter.get('/', async (req,res) => {
    let prods;
    let { limit = 10, page = 1, sort, query } = req.query;
    
    let resQuery;
    let resSort;
    if (sort) {
        resSort = await manager.getSort(sort)
    }

    if (query) {
        resQuery = await manager.getCategory(query)
    }
    try {
        prods = await manager.getP()
    } catch (error) {
        res.status(404).send({status:'error', error})
    }
    let limitProducts = prods.slice(0, limit);
    let response = {
        limit: limitProducts,
        query: resQuery
    }
    res.send({status:'success', payload: response })
});





















Prouter.get("/:pid", async (req, res)=>{
    let pid = req.params.pid;
    let product;
    try {
        product = await manager.getPById(pid)
    } catch (error) {
        res.status(400).send({status: "error", error})
    }
    res.send({status: "success", payload: product})
});

Prouter.post("/", async (req, res)=>{
    let P = req.body;
    if (!P.title || !P.description || !P.code || !P.price || !P.stock || !P.category) {
        return  res.status(400).send({status: "error", error})
    }
    try {
        await manager.addProduct(P)
    } catch (error) {
        res.status(400).send({status: "error", error})
    }
    res.send({status: "success", msg: "Product Created!"})
});

Prouter.put("/:pid", async (req, res) => {
    let pid = req.params.pid;
    let P = req.body;
    if (!P.title || !P.description || !P.code || !P.price || !P.stock || !P.category) {
        return  res.status(400).send({status: "error", error})
    }
    try {
        await manager.updateProduct(pid, P)
    } catch (error) {
        res.status(400).send({status: "error", error})
    }
    res.send({status: "success", msg: "Producto updateado"})
});

Prouter.delete("/:pid", async(req, res)=>{
    let pid = req.params.pid;
    let productDelete; 
    try {
        productDelete = await manager.deleteProduct(pid);
    } catch (error) {
        res.status(400).send({ status: "error", msg: "Product cannot be deleted!" })
    }
    res.send({ status: "success", msg: "Producto borrado"})
})

export default Prouter;