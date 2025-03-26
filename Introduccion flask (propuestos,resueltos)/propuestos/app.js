// Maneja el cambio de opciones y habilita/deshabilita inputs según lo que se necesite
function seleccionar(opcion) {
    const t1 = document.getElementById("t1");
    const t2 = document.getElementById("t2");

    switch (opcion) {
        case 1: // Y = X * Z + Z + X
            t1.placeholder = "Valor X";
            t2.placeholder = "Valor Z";
            t1.disabled = false;
            t2.disabled = false;
            break;
        case 2: // Tabla de multiplicar
            t1.placeholder = "Número para la tabla";
            t1.disabled = false;
            t2.disabled = true;
            t2.value = "";
            break;
        case 3: // Áreas (Se decide después)
            t1.placeholder = "Dato 1";
            t2.placeholder = "Dato 2 (opcional)";
            t1.disabled = false;
            t2.disabled = false;
            break;
    }
}

// Función para enviar datos al backend
function enviar() {
    const resultado = document.getElementById("resultado");
    const opcion = document.querySelector("input[name='opcion']:checked").value;
    const v1 = document.getElementById("t1").value;
    const v2 = document.getElementById("t2").value;
    let url = "";

    if (!v1) {
        swal("Error", "Ingresa al menos un valor", "error");
        return;
    }

    switch (opcion) {
        case "1":
            if (!v2) {
                swal("Error", "Ingresa X y Z para calcular Y", "error");
                return;
            }
            url = `http://127.0.0.1:5000/calcular/${v1}/${v2}`;
            break;
        case "2":
            url = `http://127.0.0.1:5000/tabla/${v1}`;
            break;
        case "3":
            let tipoFigura = prompt("¿Qué área deseas calcular? (círculo, cuadrado, triángulo)").toLowerCase();
            if (tipoFigura === "círculo") {
                url = `http://127.0.0.1:5000/area/circulo/${v1}`;
            } else if (tipoFigura === "cuadrado") {
                url = `http://127.0.0.1:5000/area/cuadrado/${v1}`;
            } else if (tipoFigura === "triángulo") {
                if (!v2) {
                    swal("Error", "Ingresa la base y la altura", "error");
                    return;
                }
                url = `http://127.0.0.1:5000/area/triangulo/${v1}/${v2}`;
            } else {
                swal("Error", "Opción inválida", "error");
                return;
            }
            break;
    }

    fetch(url)
        .then(res => res.text())
        .then(data => resultado.innerHTML = data)
        .catch(err => swal("Error", "No se pudo conectar al servidor", "error"));
}
