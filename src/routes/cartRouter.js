import { Router } from "express";
import { getCart, createCart, addProduct, deleteProduct, modificarCantidad, deleteCart, purchaseCart } from "../controllers/cart.js";
import { isUser, isAdmin } from "../middlewares/auth.js";
const Crouter = Router();

Crouter.post("/", createCart);

Crouter.get("/:cid", getCart);

Crouter.post("/:cid/products/:pid", addProduct);

Crouter.delete("/:cid/products/:pid", deleteProduct);

Crouter.put("/:cid/products/:pid", modificarCantidad);

Crouter.delete('/:cid', deleteCart);

Crouter.post("/:cid/purchase",isUser, purchaseCart)


export default Crouter;