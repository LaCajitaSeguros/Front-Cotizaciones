

//Segunda sección de cotización
const dropdownLocalidad = document.getElementById('dropdown-localidad');
let selectedLocalidad = '';

document.addEventListener('DOMContentLoaded', function () {
    fetch('https://localhost:7061/api/Localidad')
        .then(response => response.json())
        .then(data => {

            data.forEach(localidad => {
                const option = document.createElement('option');
                option.value = localidad.localidadId;
                option.textContent = localidad.nombre;
                dropdownLocalidad.appendChild(option);
            });
        })
        .catch(error => console.error('Error al cargar localidades:', error));

    const dropdown = document.getElementById('dropdown-localidad');
    

    dropdown.addEventListener('change', function () {
        const selectedOption = dropdown.options[dropdown.selectedIndex];
        selectedLocalidad = selectedOption.textContent;
        console.log('Localidad seleccionada:', selectedLocalidad);
    });
});

// Obtenemos el elemento de fecha de nacimiento
const fechaNacimientoInput = document.getElementById("fecha-nacimiento");
let edadUsuario = null; // Variable para almacenar la edad del usuario

// Función para verificar si el usuario tiene al menos 18 años
function verificarEdad(fecha) {
    const hoy = new Date();
    const fechaNacimiento = new Date(fecha);
    const edad = hoy.getFullYear() - fechaNacimiento.getFullYear();
    const mes = hoy.getMonth() - fechaNacimiento.getMonth();

    if (mes < 0 || (mes === 0 && hoy.getDate() < fechaNacimiento.getDate())) {
        return edad - 1;
    }

    return edad;
}

// Función para establecer el valor predeterminado si el campo está vacío
function establecerValorPredeterminado() {
    if (!fechaNacimientoInput.value) {
        fechaNacimientoInput.value = ""; // Vaciamos el campo de fecha
    }
}

// Agregamos un evento de carga al cargar la página
window.addEventListener("load", function() {
    establecerValorPredeterminado();
});

// Agregamos un evento de cambio al input de fecha de nacimiento
fechaNacimientoInput.addEventListener("change", function() {
    edadUsuario = verificarEdad(this.value); // Almacenamos la edad calculada en la variable
    
    // Si la edad es menor a 18, mostramos una alerta y vaciamos el campo de fecha
    if (edadUsuario < 18) {
        alert("Debes ser mayor de 18 años para continuar.");
        this.value = ""; // Vaciamos el campo de fecha
    }
});

window.addEventListener('beforeunload', function () {
    dropdownLocalidad.selectedIndex = 0;
    fechaNacimientoInput.value = "";
});