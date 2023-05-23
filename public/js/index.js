const socket = io();

let log = document.getElementById('productList')
const addProd = document.getElementById("addProd")

addProd.addEventListener("click", event => {
    if(event){
        const title = document.getElementById("title").value
        const description = document.getElementById("description").value
        const price = document.getElementById("price").value
        const img = document.getElementById("img").value
        const code = document.getElementById("code").value
        const stock = document.getElementById("stock").value
        const NewProduct = {title,description,price,img,code,stock}
        socket.emit('product', NewProduct)
    }
})

const deletProd = document.getElementById("deleteProd")
deletProd.addEventListener("click", event =>{
    if(event){
        const id = document.getElementById("id").value
        socket.emit('productdelete', id)
    }
})

socket.on('productList', products => {
    let productListHTML = "";
    products.forEach(producto => {
        productListHTML += `<p>=========</p>
        ${producto.id}<br/>
        ${producto.title}<br/>
        ${producto.description}<br/>
        ${producto.price}<br/>
        ${producto.img}<br/>
        ${producto.status}<br/>
        ${producto.code}<br/>
        ${producto.stock}<br/>`
    })
})