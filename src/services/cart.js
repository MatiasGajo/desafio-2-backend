import CManager from "../models/DAO/cartM.js"

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
