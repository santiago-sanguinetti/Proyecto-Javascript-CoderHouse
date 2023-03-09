const juegos = [];

class Juego {
    constructor(nombre, plataforma, precio) {
        this.nombre = nombre;
        this.plataforma = plataforma;
        this.precio = precio;
    }
}

iniciarApp();

function iniciarApp() {
    agregarJuegos();
    RenderJuegos(juegos);
    RenderCarrito(obtenerCarrito());
}

function agregarJuegos() {
    const theWitcher3PC = new Juego("The Witcher 3", "PC", 39.99);
    const redDeadRedemption2PC = new Juego(
        "Red Dead Redemption 2",
        "PC",
        59.99
    );
    const hadesPC = new Juego("Hades", "PC", 24.99);

    juegos.push(theWitcher3PC, redDeadRedemption2PC, hadesPC);
    console.log("Juegos:", juegos);
}

// ------------------- Renderizar div de juegos -------------------
function RenderJuegos(arrayJuegos) {
    // Creo el contenedor para las cards
    const cardContainer = document.createElement("div");
    cardContainer.classList.add("card-container-juegos");
    document.body.appendChild(cardContainer);

    // Agrego un título
    const titulo = document.createElement("h2");
    titulo.classList.add("titulo-div");
    titulo.textContent = "Juegos:";
    cardContainer.appendChild(titulo);

    // Recorro los productos y renderizo las cards
    arrayJuegos.forEach((juego, index) => {
        // Creo una card
        const card = document.createElement("div");
        card.classList.add("card");

        // Agrego el nombre del juego
        const nombre = document.createElement("h2");
        nombre.textContent = juego.nombre;
        card.appendChild(nombre);

        // Agrego el precio del juego
        const precio = document.createElement("h2");
        precio.textContent = `$${juego.precio}`;
        card.appendChild(precio);

        // Agrego un botón para agregar al carrito
        const btnAgregar = document.createElement("button");
        btnAgregar.textContent = "Agregar al carrito";
        btnAgregar.classList.add("agregar");
        btnAgregar.addEventListener("click", () => {
            agregarAlCarrito(index);
            RenderCarrito(obtenerCarrito());
        });
        card.appendChild(btnAgregar);

        // Agrego la card al container
        cardContainer.appendChild(card);
    });
}

// ------------------- Renderizar div de carrito -------------------
function RenderCarrito(arrayProductosEnCarrito) {
    // Limpiar el contenido del contenedor
    let existeCardContainer = document.querySelector(".card-container-carrito");

    if (existeCardContainer) {
        // No es la forma más elegante de nombrar la variable en este caso
        existeCardContainer.remove();
    }
    // Crear el contenedor para las cards
    const cardContainer = document.createElement("div");
    cardContainer.classList.add("card-container-carrito");

    // Agrego un título
    const titulo = document.createElement("h2");
    titulo.classList.add("titulo-div");
    titulo.textContent = "Carrito:";
    cardContainer.appendChild(titulo);

    document.body.appendChild(cardContainer);

    if (arrayProductosEnCarrito != null) {
        // Recorro los productos y renderizo las cards
        arrayProductosEnCarrito.forEach((producto, index) => {
            // Creo una card
            const card = document.createElement("div");
            card.classList.add("card");

            // Agrego el nombre del juego
            const nombre = document.createElement("h2");
            nombre.textContent = producto.nombre;
            card.appendChild(nombre);

            // Agrego el precio del juego
            const precio = document.createElement("h2");
            precio.textContent = `$${producto.precio}`;
            card.appendChild(precio);

            // Agrego un botón para quitar del carrito
            const btnQuitar = document.createElement("button");
            btnQuitar.textContent = "Eliminar del carrito";
            btnQuitar.classList.add("quitar");
            btnQuitar.setAttribute("data-index", index);
            btnQuitar.addEventListener("click", quitarDelCarrito);
            card.appendChild(btnQuitar);

            // Agrego la card al container
            cardContainer.appendChild(card);
        });
        // Agrego un título para el monto total del carrito
        const montoTotal = document.createElement("h2");
        montoTotal.classList.add("titulo-div");
        montoTotal.textContent = `Total: $${calcularMontoTotalCarrito()}`;
        cardContainer.appendChild(montoTotal);
    }
}

function agregarAlCarrito(index) {
    let carrito = obtenerCarrito();

    // Identifico el producto por su index en el array
    const producto = juegos[index];

    // Agrego el producto al carrito
    carrito.push(producto);

    // Guardo el carrito en el localStorage
    guardarLocalStorage("carrito", carrito);
}

function quitarDelCarrito(event) {
    let carrito = obtenerCarrito();

    // Tomo el index del objeto en donde ocurrió el evento para identificarlo en el array
    const index = event.target.getAttribute("data-index");

    // Remuevo el objeto en la posición index del array
    carrito.splice(index, 1);

    // Guardo el carrito en el local storage
    guardarLocalStorage("carrito", carrito);

    RenderCarrito(carrito);
}

function calcularMontoTotalCarrito() {
    let carrito = obtenerCarrito();
    let montoTotal = 0;

    carrito.forEach((producto) => {
        montoTotal += producto.precio;
    });
    return montoTotal.toFixed(2);
}

// ------------------- Funciones LocalStorage -------------------
function obtenerCarrito() {
    return JSON.parse(localStorage.getItem("carrito"));
}

function guardarLocalStorage(clave, valor) {
    localStorage.setItem(clave, JSON.stringify(valor));
}

function eliminarItemLocalStorage(clave) {
    localStorage.removeItem(clave);
}

function limpiarLocalStorage() {
    localStorage.clear();
}
