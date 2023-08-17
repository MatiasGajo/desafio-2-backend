import { getCarts, createCarts, addProductCart, deleteProducts, modiCantidad, purchaseBuy } from "../services/cart.js";
import { ticketsModel } from "../models/ticket.model.js";
import { getid } from "../../ProductManager.js";

export const getCart = async (req, res)=>{
    let cid = req.params.cid;
    let product;
    try {
      product = await getCarts(cid);
      console.log(JSON.stringify(product, null, '\t'))
    } catch (error) {
      res.status(400).send({ status: "error", msg: "Producto no encontrado" }) 
    }
    res.send({ status: "success", payload: product})
}

export const createCart = async (req, res)=>{
    let newCart; 
    try {
      newCart = await createCarts();
      res.send({ status: "success", msg: "carrito creado"})
    } catch (error) {
        res.status(400).send({ status: "error", msg: "error" }) 
    } 
}

export const addProduct = async (req, res)=>{
    const cid = req.params.cid;
    const pid = req.params.pid;
    const productCart = await addProductCart(cid, pid);

    res.status(productCart.code).send({ status: productCart.status, message: productCart.message });
}

export const deleteProduct = async (req, res)=> {
    const cid = req.params.cid;
    const pid = req.params.pid;
    const result = await deleteProducts(cid, pid);
    
    res.status(result.code).send({ status: result.status, message: result.message });
    }

export const modificarCantidad = async (req,res)=>{
    let cid = req.params.cid;
    let pid = req.params.pid;
    let {cantidad} = req.body;

    let result = await modiCantidad(cid, pid, cantidad)
    res.status(result.code).send({ status: result.status, message: result.message })
}

export const deleteCart = async(req, res)=>{
    let cid = req.params.cid;

    let carrito = await getCarts(cid)
    if(!carrito){
        res.status(400).send({status: "error", msg:"Carrito no encontrado"})
    }

    carrito.products = [];
    await carrito.save();
    res.send({status:"success", msg:"Se han borrado todos los productos del carrito"})

}

export const purchaseCart = async(req,res) => {
  let cid = req.params.cid
  let result = await purchaseBuy(cid)
  res.send({status: "success", payload: result})
}