import { cartsmodel } from "../cart.model.js";

class CManager{
    constructor(){
        this.model = cartsmodel;
    }

    async createCart(){
        let newCart;
        let cart = {
            products: []
        }
        try {
           newCart = await this.model.create(cart) 
        } catch (error) {
            console.log(error);
        }
        return newCart;
    }

    async getCartById(cid){
        let cart;
        try {
            cart = await this.model.findOne({_id: cid})
        } catch (error) {
            console.log(error);
        }

        return cart;
    }

    async addProductToCart(cid, pid){
        let cart;
        let carrito;
        let product = {
            id: pid,
            quantity: 1
        }
        try {
            cart = await this.model.findOne({_id: cid})
            let newCart = cart.products.findIndex(elem => elem.id.toString() === pid)
            if (newCart == -1) {
                carrito = await this.model.updateOne({_id: cid}, {$push: {products: product}})  

            }else{
                cart.quantity++
                carrito = await this.model.updateOne({_id: cid}, {products: cart})
                await cart.save()
            } 
        } catch (error) {
            console.log(error);
        }
    }


}

export default CManager;