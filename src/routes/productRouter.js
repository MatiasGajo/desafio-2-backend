import { Router } from "express";
import { getAllProducts, getProduct, createProduct, updateProducts, deleteProducts } from "../controllers/product.js";
import { addLogger } from "../utils/logger.js";
import { isUser, isAdmin } from "../middlewares/auth.js";
const Prouter = Router()

Prouter.get('/',addLogger,isAdmin, getAllProducts);

Prouter.get("/:pid",isAdmin, getProduct);

Prouter.post("/",isAdmin, createProduct);

Prouter.put("/:pid",isAdmin, updateProducts);

Prouter.delete("/:pid",isAdmin, deleteProducts);

export default Prouter;