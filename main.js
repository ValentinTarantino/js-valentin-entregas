
function random_init(min, max) {
    return Math.ceil(Math.random() * (max - min) + min);
}


function numVerificado(num, num_adivinar) {
    if (num == num_adivinar) {
        alert("¡Felicidades, te ganaste un caniche!");
        console.log("")
        return true;
    }
    return false;
}
let jugar_de_nuevo = true;
let caniches = 0;
while (jugar_de_nuevo) {
    let num_adivinar = random_init(0, 15)
    let num;
    for (let i = 1; i <= 3; i++) {
        num = Number(prompt("Bienvenido a nuestro juego de adivinar el número, debes acertar el número en el que pienso. Va del 1 al 15 y tienes 3 intentos. ¡Suerte!"));

        if (num == "") {
            alert("Programa cancelado, gracias por jugar.");
            jugar_de_nuevo = false;
            break;
        }

        while (isNaN(num) || num < 1 || num > 20) {
            num = prompt("Por favor, ingresa un número válido entre 1 y 20.");
        }

        if (numVerificado(num, num_adivinar)) {
            jugar_de_nuevo = true;
            caniches += 1;
            break;
        }

        if (i < 3) {
            alert("¡Incorrecto, no te rindas! Intento Nº " + i);
        } else {
            alert("Desafortunadamente perdiste el juego...");
        }
    }
    alert(`Tus caniches totales son: ${caniches}.`);

    jugar_de_nuevo = confirm("¿Quieres volver a intentarlo?");
}

