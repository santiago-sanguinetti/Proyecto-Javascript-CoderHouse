// ----------------------- Funciones auxiliares
function calcularCuotas(total, cantidadDeCuotas) {
    if (cantidadDeCuotas != 0) {
        return (total / cantidadDeCuotas).toFixed(2);
    }
    return "";
}

function listaDeJuegosPrompt() {
    let textoParaPrompt =
        "Ingrese un número para agregar al carrito o 0 para salir.";

    let numJuego = 1;
    arrJuegos.forEach((juego) => {
        textoParaPrompt += `\n${numJuego} - ${juego.nombre} (US$${juego.precio})`;
        numJuego++;
    });

    return textoParaPrompt;
}

class Juego {
    constructor(nombre, plataforma, precio) {
        this.nombre = nombre;
        this.plataforma = plataforma;
        this.precio = precio;
    }
}

let theWitcher3PC = new Juego("The Witcher 3", "PC", 39.99);
let redDeadRedemption2PC = new Juego("Red Dead Redemption 2", "PC", 59.99);
let hadesPC = new Juego("Hades", "PC", 24.99);

let arrJuegos = [theWitcher3PC, redDeadRedemption2PC, hadesPC];

let plataforma = prompt("Por favor ingrese su plataforma (PC, PS, XBOX):");

while (plataforma != "PC" && plataforma != "PS" && plataforma != "XBOX") {
    alert("La plataforma ingresada no se encuentra");
    plataforma = prompt("Por favor ingrese su plataforma (PC, PS, XBOX):");
}

let montoTotal = 0;

if (plataforma == "PC") {
    alert(
        "Bienvenido a la plataforma PC, a continuación ingrese el número del juego para agregarlo a su carrito."
    );

    let juegoElegido = -1;
    let juegosEnCarrito = [];
    while (juegoElegido != 0) {
        juegoElegido = parseInt(prompt(listaDeJuegosPrompt()));

        switch (juegoElegido) {
            case 1:
                juegosEnCarrito.push(theWitcher3PC);
                break;
            case 2:
                juegosEnCarrito.push(redDeadRedemption2PC);
                break;
            case 3:
                juegosEnCarrito.push(hadesPC);
                break;
        }
    }

    juegosEnCarrito.forEach((juego) => {
        montoTotal += juego.precio;
    });

    alert(`El total es de ${montoTotal}.`);
    let cuotas = prompt("¿En cuantas cuotas quiere realizar el pago?");
    while (isNaN(cuotas) || parseInt(cuotas) <= 0) {
        alert("La cantidad de cuotas debe ser un número entero mayor que 0.");
        cuotas = prompt("¿En cuantas cuotas quiere realizar el pago?");
    }

    alert(
        `Debe pagar ${cuotas} cuotas de US$${calcularCuotas(
            montoTotal,
            cuotas
        )}`
    );
} else if (plataforma == "PS") {
    alert(
        "La plataforma para PS no se encuentra implementada actualmente. Lamentamos los inconvenientes."
    );
} else if (plataforma == "XBOX") {
    alert(
        "La plataforma para XBOX no se encuentra implementada actualmente. Lamentamos los inconvenientes."
    );
} else {
    //A este else no debería entrar nunca, ya se valida en el while.
    alert("La plataforma ingresada es incorrecta.");
}
