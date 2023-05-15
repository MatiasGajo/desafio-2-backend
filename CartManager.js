import fs from 'fs';
import { getid } from './ProductManager.js';

class CartManager {
    constructor(){
        this.path = 'carritos.json';
    }

    async getCart(){
        let carritos;
        let cont = await fs.promises.readFile(this.path)
        carritos = JSON.parse(cont);
        return carritos
    }


    async crearCarrito() {
        let newCart = {
            id: getid(),
            products:[]
        }
        let carritos = await this.getCart();
        carritos.push(newCart)
        await fs.promises.writeFile(this.path, JSON.stringify(carritos))
        return newCart;
    }

    async addProdToCart(cid, id){
        let carrito;
        let carritos = await this.getCart();
        let index = carritos.findIndex(cart => cart.id == cid)
        if (index == -1){
            return carrito;
        }
        carritos[index].products.push(id)
        await fs.promises.writeFile(this.path, JSON.stringify(carritos))
        return carritos[index];
    }
}


export default CartManager;