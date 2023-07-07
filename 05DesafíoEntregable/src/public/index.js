const socketClient = io();

socketClient.on('saludoDesdeBack', (message)=>{
    console.log(message);

    socketClient.emit('respuestaDesdeFront', 'Muchas gracias')
})

// const form = document.getElementById('form');
// const inputName = document.getElementById('name');
// const inputPrice = document.getElementById('price');
// const products = document.getElementById('products');

// form.onsubmit = (e) => {
//     e.preventDefault();
//     const name = inputName.value;
//     const price = inputPrice.value;
//     socketClient.emit('newProduct', { name, price });
// }

// socketClient.on('arrayProducts', (array)=>{
//     let infoProducts = '';
//     array.forEach((prod) => {
//         infoProducts += `${prod.name} - ${prod.price} </br>`
//     })
//     products.innerHTML = infoProducts
// })

// socketClient.on('message', (msg)=>{
//    console.log(msg)
// })



const productsList = document.getElementById('products_list');

socketClient.on('allProducts', (products)=>{
    
    productsList.innerHTML = '';

    products.forEach((p)=> {
        const itemList = document.createElement('div');
        itemList.innerHTML = `
        <h3>${p.title}</h3>
        <p>id: ${p.id}</p>
        <p>Price: $${p.price}</p>
        <p>Stock: ${p.stock}</p>
        <br>`; 
        productsList.append(itemList);
    })
})






const newProduct = document.getElementById('newProduct');
    newProduct.addEventListener('submit', function(event) {
            event.preventDefault();
            const title = document.getElementById('title').value;
            const description = document.getElementById('description').value;
            const code = document.getElementById('code').value;
            const price = document.getElementById('price').value;
            const status = document.getElementById('status').value;
            const stock = document.getElementById('stock').value;
            const category = document.getElementById('category').value;
            const thumbnails = document.getElementById('thumbnails').value;
            const product = { title, description, code, price, status, stock, category, thumbnails};

            
            socketClient.emit('newProduct', product);

        });


const deleteProduct = document.getElementById('deleteProduct');

deleteProduct.addEventListener('submit', function (e) {
e.preventDefault();
const idDelete = document.getElementById('idDelete').value;

socketClient.emit('deleteProduct', idDelete);




} ) 