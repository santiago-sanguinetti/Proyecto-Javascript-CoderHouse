const juegos = [];

iniciarApp();

function iniciarApp() {
    RenderNavBar();
    cargarJuegos()
        .then(() => RenderJuegos(juegos))
        .then(() => RenderCarrito(obtenerCarrito()))
        .catch((err) => mostrarToastError(err.message));
}

// ------------------- Renderizar navbar -------------------
// La navbar es genérica, los botones de esta no tienen ninguna funcionalidad por ahora
function RenderNavBar() {
    // Creo la barra de navegación
    const nav = document.createElement("nav");

    // Creo el contenedor para el logo
    const logoContainer = document.createElement("div");
    logoContainer.innerHTML = "<h1>Vapour Games</h1>";

    // Creo la lista de enlaces
    const enlaces = ["Inicio", "Acerca de", "Contacto"];
    const enlacesList = document.createElement("ul");

    // Agrego cada enlace a la lista
    enlaces.forEach((enlace) => {
        const enlaceItem = document.createElement("li");
        const enlaceLink = document.createElement("a");
        enlaceLink.textContent = enlace;
        enlaceLink.href = "#";
        enlaceItem.appendChild(enlaceLink);
        enlacesList.appendChild(enlaceItem);
    });

    // Agrego el contenedor del logo y la lista de enlaces a la barra de navegación
    nav.appendChild(logoContainer);
    nav.appendChild(enlacesList);

    // Agrego la barra de navegación al DOM
    document.body.insertBefore(nav, document.body.firstChild);
}

// ------------------- Renderizar div de juegos -------------------
function RenderJuegos(arrayJuegos) {
    console.log(arrayJuegos);
    // Salgo en el caso que no haya array de juegos
    if (!arrayJuegos) return;

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
function RenderCarrito(arrayProductosEnCarrito = []) {
    // Limpiar el contenido del contenedor
    let existeCardContainer = document.querySelector(".card-container-carrito");

    if (existeCardContainer) {
        // No es la forma más elegante de nombrar la variable en este caso
        existeCardContainer.remove();
    }
    // Crear el contenedor para las cards
    const cardContainer = document.createElement("div");
    cardContainer.id = "carrito";
    cardContainer.classList.add("card-container-carrito");

    // Agrego un título
    const titulo = document.createElement("h2");
    titulo.classList.add("titulo-div");
    cardContainer.appendChild(titulo);

    document.body.appendChild(cardContainer);

    if (!arrayProductosEnCarrito) return;
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
    const btnLimpiar = document.createElement("button");
    btnLimpiar.textContent = "Vaciar el carrito";
    btnLimpiar.classList.add("quitar");
    btnLimpiar.addEventListener("click", limpiarTodoElCarrito);
    cardContainer.appendChild(btnLimpiar);
}

function agregarAlCarrito(index) {
    let carrito = obtenerCarrito();

    // Identifico el producto por su index en el array
    const producto = juegos[index];

    // Agrego el producto al carrito
    carrito.push(producto);

    // Guardo el carrito en el localStorage
    guardarLocalStorage("carrito", carrito);

    swal({
        text: `${producto.nombre} fue agregado al carrito.`,
        icon: "success",
    });
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

function limpiarTodoElCarrito() {
    swal("¿Estás seguro que deseas quitar todos tus productos del carrito?", {
        dangerMode: true,
        buttons: ["Cancelar", "Sí, estoy seguro."],
    }).then(function (isConfirm) {
        if (isConfirm) {
            swal({
                title: "¡Carrito eliminado!",
                text: "El carrito fue vaciado correctamente.",
                icon: "success",
            }).then(limpiarTodoLocalStorage(), RenderCarrito());
        }
    });
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
    // Leo el carrito del local storage
    let carrito = JSON.parse(localStorage.getItem("carrito"));

    // Comprueba que el carrito sea un array, si no lo es, devuelve uno vacío
    if (!Array.isArray(carrito)) {
        return [];
    }

    // Filtra los valores nulos del array
    carrito = carrito.filter((producto) => producto != null);

    return carrito;
}

function guardarLocalStorage(clave, valor) {
    localStorage.setItem(clave, JSON.stringify(valor));
}

function eliminarItemLocalStorage(clave) {
    //esta función no tiene utilidad por el momento
    localStorage.removeItem(clave);
}

function limpiarTodoLocalStorage() {
    localStorage.clear();
}

async function cargarJuegos() {
    await fetch("./utils/data.json")
        //fulfilled
        .then((response) => response.json())
        .then((response) => agregarJuegos(response))
        //rejected
        .catch((err) => mostrarToastError(err.message));
}

function agregarJuegos(array) {
    console.log(array);
    array.juegos.forEach((juego) => {
        console.log(juego);
        juegos.push(juego);
    });
}

function mostrarToastError(mensaje) {
    swal({
        text: `Error: ${mensaje}`,
        icon: "error",
    });
}
