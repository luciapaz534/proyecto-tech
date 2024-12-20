let arrayProductos = [];

const crearHTML = (item) => {
    const html = `
        <article data-id="${item.id}">
        <div class="card">
            <img src="${item.imagen}" alt="${item.descripcion}">
            <h3>art: ${item.id}   ${item.nombre}</h3>
            <p>${item.descripcion}</p>
            <p>$ ${item.precio}</p>
            <button type="button" class="agregar">Agregar</button>
        </div>
        </article>
    `;
    return html;
};

const mostrarProductos = async () => {
    try {
        const response = await fetch('productos.json');
        arrayProductos = await response.json();
        console.log(arrayProductos);

        const listadoProductos = document.querySelector(".listado-productos"); 
        listadoProductos.innerHTML = "";

        arrayProductos.forEach((item) => {
            const elementos = crearHTML(item);
            listadoProductos.innerHTML += elementos; 
        });
    } catch (error) {
        console.error(error);
    }
};

let carrito = JSON.parse(localStorage.getItem("carrito")) || [];
// console.log(carrito);
  //mostrarProductos();
  //let arrayProductos=[] // 
  // Escucho todos los eventos click el documento
document.addEventListener("click", (event) => {
      // Si el elemento donde se hizo click contiene la clase 'agregar'
    if (event.target.classList.contains("agregar")) {
        const id = event.target.closest("article").dataset.id;
        const index = carrito.findIndex((item) => item.id == id);

        if (index == -1) {
      // Busco el elemento 'producto' dentro del array producto que tenga el 'id'
         console.log(arrayProductos)
         const elemento = arrayProductos.find((producto) => producto.id == id);
            console.log(elemento);
            console.log(arrayProductos[2]);

            const { nombre, precio } = elemento;

            const producto = {
                id: id,
                nombre: nombre,
                precio: precio,
                cantidad: 1,
            };

            carrito.push(producto);
        } else {
            const producto = carrito[index];
            producto.cantidad++;
        }

        localStorage.setItem("carrito", JSON.stringify(carrito));
    }
});

mostrarProductos();
