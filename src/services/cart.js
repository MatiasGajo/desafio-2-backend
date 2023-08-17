import CManager from "../models/DAO/cartM.js"
import PManager from "../models/DAO/prodM.js"

const prodManager = new PManager;
const manager = new CManager;

export const getCarts = async (cid) => {
    return await manager.getCartById(cid)
}

export const createCarts = async () => {
    return await manager.createCart()
}

export const addProductCart = async (cid, pid) => {
    return await manager.addProductInCart(cid, pid)
}

export const deleteProducts = async (cid, pid) => {
    return await manager.deleteProductInCart(cid, pid)
}

export const modiCantidad = async (cid, pid, cantidad) => {
    return await manager.modCantidad(cid, pid, cantidad)
}

export const purchaseBuy = async (cid) => {
    let result = []
    let productosNoStock = []
    let amount = 0
    let newProduct;
    const cart = await manager.getCartById(cid)
    if(cart.length !== 0) {
        cart[0].products.forEach(prodCart => {
            let quantity = prodCart.quantity
            let stock = prodCart.producto.stock
            newProduct = prodCart.producto
            const prod = prodManager.getPById(newProduct)
            console.log(prod)
            if(quantity <= stock){
                newProduct.stock = newProduct.stock - quantity
              let prodAct = prodManager.updateP(newProduct._id, newProduct)
              let priceProd = newProduct.price * quantity
              amount = amount + priceProd
            }else{
                productosNoStock.push(prodCart)
                console.log(productosNoStock)
            }
            result[0] = amount
            console.log(result)
            return result
        })
    }
}