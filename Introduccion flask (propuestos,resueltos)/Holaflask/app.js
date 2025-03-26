// Función para enviar la solicitud al backend
function enviar() {
    const contenido = document.querySelector('#contenido');
    const v1 = document.querySelector('#t1').value;
    const v2 = document.querySelector('#t2').value;
    const v3 = document.querySelector('#t3').value;
    let url = "";

    if (document.querySelector('#opcion1').checked) {
        url = 'http://127.0.0.1:5500';
    } else if (document.querySelector('#opcion2').checked) {
        url = `http://127.0.0.1:5500/notas/${v1}/${v2}/${v3}`;
    } else if (document.querySelector('#opcion3').checked) {
        url = `http://127.0.0.1:5500/edades/${v1}`;
    } else if (document.querySelector('#opcion4').checked) {
        url = `http://127.0.0.1:5500/arreglos/${v1}/${v2}/${v3}`;
    } else {
        swal("Mensaje", "Seleccione una opción", "warning");
        return;
    }

    fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error("Error en la llamada al servidor");
            }
            return response.text();
        })
        .then(texto => {
            contenido.innerHTML = texto;
        })
        .catch(error => {
            console.error(error);
            swal({
                title: "Advertencia",
                text: error.message,
                icon: "warning",
                buttons: true,
                dangerMode: true,
            });
        });
}

// Función para limpiar y deshabilitar los campos de entrada
function limpiarCampos(disabled, placeholders = ["", "", ""]) {
    const t1 = document.querySelector('#t1');
    const t2 = document.querySelector('#t2');
    const t3 = document.querySelector('#t3');

    [t1, t2, t3].forEach((input, index) => {
        input.disabled = disabled[index];
        input.value = "";
        input.placeholder = placeholders[index];
    });
}

// Funciones para cada opción
function opcion1() {
    limpiarCampos([true, true, true]);
}

function opcion2() {
    limpiarCampos([false, false, false], ["Nota 1", "Nota 2", "Nota 3"]);
}

function opcion3() {
    limpiarCampos([false, true, true], ["Edad"]);
}

function opcion4() {
    limpiarCampos([false, false, false], ["Valores permitidos", "Columnas", "Filas"]);
}
