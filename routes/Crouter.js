import { Router } from "express";
import CManager from "../models/DAO/cartM.js";
const Crouter = Router();

const manager = new CManager;

Crouter.post("/", async (req, res)=>{
    let newCart; 
    try {
      newCart = await manager.createCart();
      res.send({ status: "success", msg: "carrito creado"})
    } catch (error) {
        res.status(400).send({ status: "error", msg: "error" }) 
    } 
});

Crouter.get("/:cid", async (req, res)=>{
    let cid = req.params.cid;
    let product;
    try {
      product = await manager.getCartById(cid);
    } catch (error) {
      res.status(400).send({ status: "error", msg: "Producto no encontrado" }) 
    }
    res.send({ status: "success", payload: product})
});

Crouter.post("/:cid/products/:pid", async(req, res)=>{
    let cid = req.params.cid;
    let pid = req.params.pid;
    let addProduct;
    try {
      addProduct = await manager.addProductToCart(cid, pid)
    } catch (error) {
      res.status(400).send({ status: "error", msg: "Producto no encontrado" })
    }
    res.send({ status: "success", msg: "Producto agregado"})
})

Crouter.delete("/:cid/products/:pid", async(req, res)=> {
    let cid = req.params.cid;
    let pid = req.params.pid;

    let carrito = await manager.getCartById(cid);
    if(!carrito){
        res.status(400).send({status: "error", msg:"Carrito no encontrado"})
    }

    let prodIndex = carrito.products.findIndex(producto => producto.pid == pid)
    if(prodIndex == -1){
        res.status(400).send({status: "error", msg:"Producto en el carrito no encontrado"})
    }
    carrito.products.splice(prodIndex,1)
    await carrito.save()
    res.send({status: "success", msg:"Producto eliminado del carrito"})
})


Crouter.put("/:cid/products/:pid", async(req,res)=>{
    let cid = req.params.cid;
    let pid = req.params.pid;
    let {cantidad} = req.body;

    let carrito = await manager.getCartById(cid)
    if(!carrito){
        res.status(400).send({status: "error", msg:"Carrito no encontrado"})
    }

    let producto = carrito.products.find(producto => producto.id.toString() == pid)
    if(!producto){
        res.status(400).send({status: "error", msg:"Producto en el carrito no encontrado"})
    }
    producto.quantity = parseInt(cantidad)
    await carrito.save()
})


Crouter.delete('/:cid', async(req, res)=>{
    let cid = req.params.cid;

    let carrito = await manager.getCartById(cid)
    if(!carrito){
        res.status(400).send({status: "error", msg:"Carrito no encontrado"})
    }

    carrito.products = [];
    await carrito.save();
    res.send({status:"success", msg:"Se han borrado todos los productos del carrito"})

})


export default Crouter;