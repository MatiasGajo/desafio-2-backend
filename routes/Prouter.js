import { Router } from "express";
import PManager from '../models/DAO/prodM.js';
const Prouter = Router()

const manager = new PManager;


Prouter.get('/', async (req,res) => {
    let prods
    try {
        prods = await manager.getP()
    } catch (error) {
        res.status(404).send({status:'error', error})
    }
    res.send({status:'success', payload: prods})
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

export default Prouter;