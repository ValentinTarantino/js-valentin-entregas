function pedir_num(mensaje) {
    let num = prompt(mensaje);
    if (num == null)

        return null;
    num = parseInt(num);
    if (isNaN(num) || num < 0) {
        alert("Entrada no válida, ingrese un número.");
        return pedir_num(mensaje);
    }
    return num;
}

function pedir_texto(mensaje) {
    let texto = prompt(mensaje);
    if (texto == null)

        return null;
    if (!isNaN(texto)) {
        alert("Entrada no válida, ingrese letras.");
        return pedir_texto(mensaje);
    }
    return texto;
}