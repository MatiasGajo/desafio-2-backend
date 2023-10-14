let cartId = null;

    
        async function crearCarrito() {
            let localCartId = localStorage.getItem('cartId')
            if(localCartId){
                cartId = localCartId;
                carrito.innerHTML += `
                <h5 ><span>Id: </span>${product.producto}</h5>
                <h5 ><span>Cantidad: </span>${product.quantity}</h5> `
                alert('Carrito recuperado del local')
            }else{
                const response = await fetch('api/c/', {
                    method: 'POST',
                });
    
                if (response.ok) {
                    const data = await response.json();
                    cartId = data.payload._id;
                    localStorage.setItem('cartId', cartId)
                    alert('Carrito creado con éxito');
                } else {
                    alert('No se pudo crear el carrito');
                }
            }
            
        }

        async function borrarCarrito() {
            if (cartId === null) {
                alert('No hay carrito para borrar');
                return;
            }

            const response = await fetch(`api/c/${cartId}`, {
                method: 'DELETE',
            });

            if (response.ok) {
                cartId = null; 
                localStorage.removeItem('cartId')
                const carrito = document.getElementById('carrito');
                carrito.innerHTML = ''; 
                alert('Carrito borrado con éxito');
            } else {
                alert('No se pudo borrar el carrito');
            }
        }

        async function agregarProductoAlCarrito(productId) {
            if (cartId === null) {
                alert('Primero, crea un carrito');
                return;
            }
            const response = await fetch(`api/c/${cartId}/products/${productId}`, {
                method: 'POST',
            });
            if (response.ok) {
                const productoAgregado = await response.json();
                let prodpa =productoAgregado.message
                const carrito = document.getElementById('carrito');
                prodpa.map(product => {
                    carrito.innerHTML += `
                    <h5 ><span>Id: </span>${product.producto}</h5>
                    <h5 ><span>Cantidad: </span>${product.quantity}</h5> `
                })
                
            } else {
                alert('No se pudo agregar el producto al carrito');
            }
        }

        const botonesAgregarAlCarrito = document.querySelectorAll('button[data-product-id]');
        botonesAgregarAlCarrito.forEach(boton => {
            boton.addEventListener('click', () => {
                carrito.innerHTML = ''
                let productId = boton.getAttribute('data-product-id');
                console.log(productId + "sdasdasdds")
                agregarProductoAlCarrito(productId);
            });
        });


        async function comprarCarrito() {
            if (cartId === null) {
                alert('No hay carrito para comprar');
                return;
            }

            const response = await fetch(`api/c/${cartId}/purchase`, {
                method: 'POST',
            });

            if (response.ok) {
                const data = await response.json();
                alert('Compra exitosa');
                cartId = null;
                localStorage.removeItem('cartId');
                const carrito = document.getElementById('carrito');
                carrito.innerHTML = '';
            } else {
                alert('No se pudo completar la compra');
            }
        }
document.addEventListener('DOMContentLoaded', crearCarrito)