function cargarCarrito() { 
    var listaCarrito = document.getElementById('lista-carrito');
    var subtotal = 0;  // Definir subtotal dentro de la función para asegurar que se reinicie en cada llamada
    listaCarrito.innerHTML = '';  // Limpiar la lista del carrito

    // Obtener el carrito desde localStorage
    var carrito = JSON.parse(localStorage.getItem('carrito')) || []; 

    // Recorrer el carrito y agregar los productos al carrito visual
    for (var i = 0; i < carrito.length; i++) { 
        var producto = carrito[i];

        // Crear un elemento para cada producto en el carrito
        var li = document.createElement('li');
        li.textContent = `${producto.cantidad} x ${producto.nombre} - $${producto.precio} c/u - Total: $${(producto.precio * producto.cantidad).toFixed(2)}`;
        listaCarrito.appendChild(li);

        // Acumular el subtotal
        subtotal += producto.precio * producto.cantidad;
    } 

    // Actualizar el subtotal en el DOM
    const subtotalElement = document.getElementById('subtotal');
    if (subtotalElement) {
        subtotalElement.innerHTML = `<h3>Subtotal: $${subtotal.toFixed(2)}</h3>`;
    } else {
        console.error("Elemento con id 'subtotal' no encontrado");
    }
}

// Llamar a la función cargarCarrito cuando se carga la página
cargarCarrito();

// Vaciar el carrito
document.getElementById('vaciar-carrito').addEventListener('click', function() { 
    localStorage.removeItem('carrito');
    cargarCarrito();  // Recargar el carrito y el subtotal después de vaciarlo
});
