let nombres = [];

function agregarNombre() {
    let entrada = document.getElementById("entradaNombre");
    let mensajeError = document.getElementById("mensajeError");
    let nombre = entrada.value.trim();

    // Validar que solo contenga letras y espacios
    if (!/^[a-zA-ZáéíóúÁÉÍÓÚñÑ ]+$/.test(nombre)) {
        mensajeError.textContent = "Solo se pueden ingresar nombres, no números ni caracteres especiales.";
        setTimeout(() => mensajeError.textContent = "", 3000);
        entrada.value = "";
        return;
    }

    if (nombre !== "" && !nombres.includes(nombre)) {
        nombres.push(nombre);
        actualizarLista();
    }
    entrada.value = "";
}

function actualizarLista() {
    let lista = document.getElementById("listaNombres");
    lista.innerHTML = "";
    nombres.forEach((nombre, contador) => {
        let elemento = document.createElement("div");
        elemento.textContent = nombre;
        
        let botonEliminar = document.createElement("button");
        botonEliminar.className = "boton-eliminar";
        botonEliminar.innerHTML = `Eliminar <img src="../assets/borrar.png" alt="Borrar">`;
        botonEliminar.onclick = () => eliminarNombre(contador);

        elemento.appendChild(botonEliminar);
        lista.appendChild(elemento);
    });
}

function eliminarNombre(contador) {
    nombres.splice(contador, 1);
    actualizarLista();
}

function sortearAmigo() {
    let mensajeSorteo = document.getElementById("mensajeSorteo");

    if (nombres.length < 2) {
        mensajeSorteo.textContent = "Debe haber al menos 2 nombres para sortear.";
        setTimeout(() => mensajeSorteo.textContent = "", 3000);
        return;
    }

    let nombresDisponibles = [...nombres];
    let resultados = [];

    while (nombresDisponibles.length > 0) {
        let indice = Math.floor(Math.random() * nombresDisponibles.length);
        let nombreSorteado = nombresDisponibles.splice(indice, 1)[0];
        resultados.push(nombreSorteado);
    }

    let contador = 0;
    function mostrarSorteo() {
        if (contador < resultados.length) {
            mensajeSorteo.textContent = `El amig@ secreto es: ${resultados[contador]}`;
            contador++;
            setTimeout(mostrarSorteo, 2000);
        } else {
            mensajeSorteo.textContent = "Todos los nombres han sido sorteados.";
            setTimeout(() => mensajeSorteo.textContent = "", 5000);
        }
    }

    mostrarSorteo();
}

function sortearParejas() {
    let mensajeSorteo = document.getElementById("mensajeSorteo");

    if (nombres.length < 2) {
        mensajeSorteo.textContent = "Debe haber al menos 2 nombres para sortear parejas.";
        setTimeout(() => mensajeSorteo.textContent = "", 3000);
        return;
    }

    let nombresDisponibles = [...nombres];
    let parejas = [];

    // Crear las parejas
    while (nombresDisponibles.length > 1) {
        let pareja = [];
        pareja.push(nombresDisponibles.splice(Math.floor(Math.random() * nombresDisponibles.length), 1)[0]);
        pareja.push(nombresDisponibles.splice(Math.floor(Math.random() * nombresDisponibles.length), 1)[0]);
        parejas.push(pareja);
    }

    // Mostrar las parejas una por una
    let contador = 0;
    function mostrarPareja() {
        if (contador < parejas.length) {
            mensajeSorteo.textContent = ` ${parejas[contador][0]} tu amig@ secreto es ${parejas[contador][1]}`;
            contador++;
            setTimeout(mostrarPareja, 4000);  // Mostrar la pareja por 4 segundos
        } else {
            mensajeSorteo.textContent = "Todas las parejas han sido sorteadas.";
            setTimeout(() => mensajeSorteo.textContent = "", 5000);
        }
    }

    mostrarPareja();
}

function reiniciarLista() {
    nombres = [];
    actualizarLista();
    document.getElementById("mensajeSorteo").textContent = "";
}
