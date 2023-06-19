import { Productsmodel } from "../prod.model.js"

class PManager {
    constructor(){
        this.model = Productsmodel;
    }

 async getP(){
    let prods;
    try {
      prods = await this.model.find()
    } catch (error) {
        console.log(error)
    }

    return prods;
 }

 async getPById(id){
    let P;
    try {
      P = await this.model.findOne({ _id: id})
    } catch (error) {
        console.log(error)
    }

    return P;
 }

 async addP(title, description, code, price, stock, category){
    let P;
    try {
        P = await this.model.create({
            title,
            description,
            code,
            price,
            stock,
            category
        });
    } catch (error) {
        console.log(error);
    }
    return P;
 }

 async updateP(pid, properties){
    let P
    try {
        P = await this.model.updateOne({ _id: pid }, properties);
    } catch (error) {
        console.log(error);
    }
    return P;
 }
}

export default PManager;