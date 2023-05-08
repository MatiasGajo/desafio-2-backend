import fs from 'fs';

class ProductManager {
    constructor() {
        this.path = './productos.json'
    }

    async addProduct(product) {
        let cont = await fs.promises.readFile(this.path);
        let products = JSON.parse(cont);
        products.push(product);
        await fs.promises.writeFile(this.path, JSON.stringify(products));
    }

    async getProducts() {
        let cont = await fs.promises.readFile(this.path);
        let products = JSON.parse(cont);
        return products;
    }

    async getProductById(id) {
        let cont = await fs.promises.readFile(this.path);
        let products = JSON.parse(cont);
        let prodId = products.find(prod => prod.id == id);
        let productoId = prodId ? prodId : {msj: 'el producto no existe con ese id'}
        return productoId;
    }

    async updateProduct(id, prod) {
        let cont = await fs.promises.readFile(this.path);
        let products = JSON.parse(cont);
        let indice = products.findIndex(prod => prod.id === id);
        if(indice !== -1){
            products[indice] = prod;
        }
        await fs.promises.writeFile(this.path, JSON.stringify(products))
        return {msj: 'prod actualizado con exito!'}
    }

    async deleteProduct(id){
        let cont = await fs.promises.readFile(this.path);
        let products = JSON.parse(cont);
        let indice = products.findIndex(prod => prod.id == id)
        if(indice !== -1){
            products.splice(indice,1)
        }
        await fs.promises.writeFile(this.path, JSON.stringify(products))
    }

}

const getid = () => {
    let a = Date.now().toString(30)
    let b = Math.random().toString(30).substring(2)
    return a + b
}
const productos = new ProductManager()

let producto = {title:'hola',description:'jsddsja',imagen:'imagenprueba1',precio:200, code:332,id:getid()}

let producto3 = {title:'hola3',precio:2003, description:'jsddsja',imagen:'imagenprueba2',code:331,id:getid()}
let producto2 = {title:'holaaaaa222222222aa',description:'jsddsja',imagen:'imagenprueba3',precio:200223, code:333,id:getid()}

//let TotalProd = await productos.getProducts();
//console.log(TotalProd)
//productos.addProduct(producto);


//let prod = await productos.updateProduct(2, producto3)
//let prod = await productos.deleteProduct(5)
//console.log(prod)

export default ProductManager;
