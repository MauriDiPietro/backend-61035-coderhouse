const socketClient = io();

socketClient.on('saludoDesdeBack', (message)=>{
    console.log(message);

    socketClient.emit('respuestaDesdeFront', 'Muchas gracias')
})

const form = document.getElementById('form')
const inputName = document.getElementById('name')
const inputPrice = document.getElementById('price')
const products = document.getElementById('products')

form.onsubmit = (e) => {
    e.preventDefault();
    const name = inputName.value;
    const price = inputPrice.value;
    const product = {
        name,
        price
    };
    socketClient.emit('newProduct', product);
}

socketClient.on('products', (arrayProducts)=>{
    let infoProducts = '';
    arrayProducts.map((prod)=>{
        infoProducts += `${prod.name} - $${prod.price} </br>`
    })
    products.innerHTML = infoProducts
})

socketClient.on('message', (message)=>{
    console.log(message);
})
