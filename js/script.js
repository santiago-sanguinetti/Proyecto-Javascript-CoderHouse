// ----------------------- Funciones auxiliares
function calcularCuotas(total, cantidadDeCuotas){
    return total/cantidadDeCuotas;
}

let plataforma = prompt("Por favor ingrese su plataforma (PC, PS, XBOX):");

while (plataforma != "PC" && plataforma != "PS" && plataforma != "XBOX"){
    alert("La plataforma ingresada no se encuentra");
    plataforma = prompt("Por favor ingrese su plataforma (PC, PS, XBOX):");
    console.log(plataforma);
}

let montoTotal = 0;

if (plataforma == "PC") {
    alert("Bienvenido a la plataforma PC, a continuación ingrese el número del juego para agregarlo a su carrito.")
    
    let juegoElegido = -1;
    while (juegoElegido != 0){
        juegoElegido = parseInt(prompt("Ingrese un número para agregar al carrito o 0 para salir. \n1 - The Witcher 3 (US$39.99)\n2 - Red Dead Redemption 2 (US$59.99)\n3 - Hades (US$24.99)"))

        switch (juegoElegido) {
            case 1:
                montoTotal = montoTotal + 39.99;
            break;
            case 2:
                montoTotal = montoTotal + 59.99;
            break;
            case 3:
                montoTotal = montoTotal + 24.99;
            break;
        }
    }

    alert(`El total es de ${montoTotal}.`);
    let cuotas = prompt("¿En cuantas cuotas quiere realizar el pago?");
    while (isNaN(cuotas) || parseInt(cuotas) <= 0){
        alert ("La cantidad de cuotas debe ser un número entero mayor que 0.");
        cuotas = prompt("¿En cuantas cuotas quiere realizar el pago?");
    }

    alert (`Debe pagar ${cuotas} cuotas de ${calcularCuotas(montoTotal, cuotas)}US$`);
    
} else if (plataforma == "PS") {
    alert("La plataforma para PS no se encuentra implementada actualmente. Lamentamos los inconvenientes.")
} else if (plataforma == "XBOX") {
    alert("La plataforma para XBOX no se encuentra implementada actualmente. Lamentamos los inconvenientes.")
} else {
    //A este else no debería entrar nunca, ya se valida en el while.
    alert("La plataforma ingresada es incorrecta.")
}