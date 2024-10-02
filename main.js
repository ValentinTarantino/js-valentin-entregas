let id = 0;


let productos = [];
productos.push(new Producto('Milanesa', 5000));
productos.push(new Producto('Pizza', 3000));
productos.push(new Producto('Leche', 300));


while (true) {
    let opc = pedir_num('Bienvenido, ¿qué quiere hacer?\n1. Agregar productos\n2. Verificar saldo\n3. Verificar productos\n0. Salir');

    if (opc == null || opc == 0) {
        alert("¡Nos vemos!");
        break;
    }

    if (opc == 1) {
        let nombre = pedir_texto("Ingrese el nombre del producto:");
        if (nombre == null)
            continue;

        let precio = pedir_num("Ingrese el precio del producto:");
        if (precio == null)
            continue;

        let nuevoProducto = new Producto(nombre, precio);
        productos.push(nuevoProducto);

        productos.sort((a, b) => a.nombre.localeCompare(b.nombre));
        let mensaje = "Producto agregado:\n";
        productos.forEach((producto) => {
            mensaje += `Nombre: ${producto.nombre}, Precio: ${producto.precio}\n`;
        });

        alert(mensaje);
    }
    else if (opc == 2) {
        let saldo = pedir_num('Ingrese el saldo:');
        if (saldo == null)
            continue;

        let productosAccesibles = productos.filter((producto) => producto.precio <= saldo);
        if (productosAccesibles.length > 0) {
            let mensaje = "Con tu saldo podes comprar:\n" + productosAccesibles.map(producto =>
                `Nombre: ${producto.nombre}, Precio: ${producto.precio}`).join('\n');
            alert(mensaje);
        } else {
            alert("No hay productos disponibles con este saldo.");
        }
    }

    else if (opc == 3) {
        let nombre_producto = pedir_texto('Ingrese el nombre del producto que quiere buscar');
        if (nombre_producto == null)
            continue;
        let productoEncontrado = productos.find((producto) => producto.nombre.toLowerCase() == nombre_producto.toLowerCase());
        if (productoEncontrado) {
            alert(`Producto encontrado: \nNombre: ${productoEncontrado.nombre}, Precio: ${productoEncontrado.precio}`);
        } else {
            alert('No tenemos ese producto.');
        }
    }
}
