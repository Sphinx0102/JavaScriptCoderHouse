let cart = {
    total: 0,
    items: []
};

// Carga el contenido del Array
function cargarProductos(productos) {
    let container = document.getElementById("container");
    container.innerHTML= '';


    for (const producto of productos) {
        let card = document.createElement("div");
        card.innerHTML= `<div class="card" id="card-component">
        <img src="${producto.imagen}" class="card-img-top" alt="${producto.titulo}">
        <div class="card-body">
          <h5 class="card-title">${producto.titulo}</h5>
          <p class="card-text">${producto.descripcion}</p>
          <p class="card-text precio">$${producto.precio}</p>
          <a href="#" class="btn btn-primary" id="agregar">Agregar al carrito</a>
        </div>
        </div>` 
        container.appendChild(card);

        let pedido = card.querySelector("#agregar");
        pedido.addEventListener("click", () => addToCart(producto));
    };
}




// Recuperar datos del carrito desde el Local Storage

const cartData = localStorage.getItem('cart');
if (cartData) {
    cart = JSON.parse(cartData);
}

function addToCart(producto) {
    let itemIndex = cart.items.findIndex(item => item.title === producto.titulo);
    if (itemIndex >= 0) {
        cart.items[itemIndex].quantity++;
    } else {
        cart.items.push({
            title: producto.titulo,
            quantity: 1,
            price: producto.precio
        });
    }
    cart.total += producto.precio;
    // Actualizar la información del carrito en la página
    let cartTotalEl = document.getElementById('cart-total');
    let cartItemsEl = document.getElementById('cart-items');
    
    cartTotalEl.innerText = cart.total.toFixed(2);
    cartItemsEl.innerHTML = '';
    for (let i = 0; i < cart.items.length; i++) {
        let item = cart.items[i];
        let itemEl = document.createElement('li');
        itemEl.innerText = item.title + ' x ' + item.quantity + ' = $' + (item.price * item.quantity).toFixed(2);
        cartItemsEl.appendChild(itemEl);
    }
    // Guardar datos del carrito en el Local Storage
    localStorage.setItem('cart', JSON.stringify(cart));
}

function updateCart() {
    let cartData = JSON.parse(localStorage.getItem('cart'));


    if (cartData) {
        cart.total = cartData.total;
        cart.items = cartData.items;
        
        // Actualizar la información del carrito en la página
        let cartTotalEl = document.getElementById('cart-total');
        let cartItemsEl = document.getElementById('cart-items');
        
        cartTotalEl.innerText = cart.total;
        
        cartItemsEl.innerHTML = '';
        for (let i = 0; i < cart.items.length; i++) {
            let item = cart.items[i];
            let itemEl = document.createElement('li');
            itemEl.innerText = item.title + ' x ' + item.quantity + ' = $' + (item.price * item.quantity).toFixed(2);
            cartItemsEl.appendChild(itemEl);
        }
    }
}



function emptyCart() {
    var listaCarrito = document.getElementById("cart-items");
    var totalCarrito = document.getElementById("cart-total");
    
    while (listaCarrito.firstChild) {
        listaCarrito.removeChild(listaCarrito.firstChild);
    }
    
    // Reinicia el total del carrito a 0
    totalCarrito.textContent = "0.00";
    
    // Resetea lo guardado en cart
    cart.total = 0;
    cart.items = [];
    
    // Elimina el carrito del Local Storage
    localStorage.removeItem("cart");
}


const productos = [
    {
        imagen: "https://www.invidcomputers.com/images/000000000041254222609-CH-9127414-NA-Gallery-K95-PLATINUM-RGB-XT-01.png",
        titulo: "Teclado mecánico Corsair K95 RGB Platinum XT",
        descripcion: "Teclado mecánico de alta gama con iluminación RGB, interruptores Cherry MX y 6 teclas macro programables",
        precio: 199.99
    },
    {
        imagen: "http://d3ugyf2ht6aenh.cloudfront.net/stores/456/610/products/steel1-f2067969e20fde678316474535436533-640-0.webp",
        titulo: "Auriculares gaming SteelSeries Arctis Pro",
        descripcion: "Auriculares gaming de alta fidelidad con micrófono retráctil, iluminación RGB y transductores de alta resolución",
        precio: 179.99
    },
    {
        imagen: "https://tecnomilenio.com.ar/wp-content/uploads/2022/09/logitech-mx-master-s3-negro1.png",
        titulo: "Mouse inalámbrico Logitech MX Master 3",
        descripcion: "Mouse inalámbrico ergonómico con 7 botones programables, sensor láser de alta precisión y tecnología de desplazamiento rápido",
        precio: 99.99
    },
    {
        imagen: "https://resource.logitech.com/content/dam/logitech/en/products/speakers/computer-speakers/z623/gallery/z623-gallery-1.png",
        titulo: "Altavoces Logitech Z623",
        descripcion: "Sistema de altavoces de 2.1 canales con 200 vatios de potencia y entrada de audio de 3,5 mm y RCA",
        precio: 119.99
    },
    {
        imagen: "https://http2.mlstatic.com/D_NQ_NP_828958-MLA48760421474_012022-O.jpg",
        titulo: "Monitor Dell UltraSharp U2719D",
        descripcion: "Monitor de 27 pulgadas con resolución QHD, ángulo de visión amplio y diseño sin marco",
        precio: 379.99
    },
    {
        imagen: "https://www.maximus.com.ar/Temp/App_WebSite/App_PictureFiles/Items/960-001360_800.jpg",
        titulo: "Webcam Logitech C920",
        descripcion: "Cámara web Full HD 1080p con micrófono integrado y compatibilidad con Skype, Zoom y otros servicios de videoconferencia",
        precio: 69.99,
    },
    {
        imagen: "https://www.deffo.com.ar/wp-content/uploads/2022/05/WDBYVG0010-20-BBK-1.webp",
        titulo: "Disco duro externo WD My Passport",
        descripcion: "Disco duro portátil de 4 TB con conexión USB 3.0 y software de copia de seguridad automática",
        precio: 89.99,
    },
    {
        imagen: "https://mexx-img-2019.s3.amazonaws.com/33174_2.jpeg",
        titulo: "Teclado inalámbrico Logitech K380",
        descripcion: "Teclado inalámbrico compacto con conectividad Bluetooth y soporte multiplataforma",
        precio: 39.99,
    },
    {
        imagen: "https://www.sony.com.ar/image/5d02da5df552836db894cead8a68f5f3?fmt=pjpeg&wid=330&bgcolor=FFFFFF&bgc=FFFFFF",
        titulo: "Auriculares inalámbricos Sony WH-1000XM4",
        descripcion: "Auriculares inalámbricos con cancelación de ruido avanzada y hasta 30 horas de autonomía de batería",
        precio: 349.99,
    },
]


cargarProductos(productos);

//eventos
//vacia el carrito
let vaciar = document.getElementById("emptyCart");
vaciar.addEventListener("click", () => emptyCart());

//actualiza el carrito con lo del local 
let actualizar = document.getElementById("updateCart");
actualizar.addEventListener("click", () => updateCart());