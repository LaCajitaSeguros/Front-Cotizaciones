// // Recuperar valores del local storage
// const selectedMarcaId = localStorage.getItem('selectedMarcaId');
// const selectedModeloId = localStorage.getItem('selectedModeloId');
// const selectedVersionId = localStorage.getItem('selectedVersionId');
// const selectedAnio = localStorage.getItem('selectedAnio');

// const dropdownLocalidad = document.getElementById('dropdown-localidad');
// let selectedLocalidad = '';

// // Obtener el elemento del botón de cotización
// const cotizarButton = document.getElementById("cotizar-button");

// // Función para habilitar o deshabilitar el botón de cotización
// function habilitarCotizar() {
//     if (selectedLocalidad && fechaNacimientoInput.value && edadUsuario >= 18) {
//         cotizarButton.disabled = false;
//     } else {
//         cotizarButton.disabled = true;
//     }
// }

// document.addEventListener('DOMContentLoaded', function () {
//     fetch('https://localhost:7061/api/Localidad')
//         .then(response => response.json())
//         .then(data => {

//             data.forEach(localidad => {
//                 const option = document.createElement('option');
//                 option.value = localidad.localidadId;
//                 option.textContent = localidad.nombre;
//                 dropdownLocalidad.appendChild(option);
//             });
//         })
//         .catch(error => console.error('Error al cargar localidades:', error));

//     const dropdown = document.getElementById('dropdown-localidad');
    

//     dropdown.addEventListener('change', function () {
//         const selectedOption = dropdown.options[dropdown.selectedIndex];
//         selectedLocalidad = selectedOption.textContent;
//         console.log('Localidad seleccionada:', selectedLocalidad);

//         // Habilitar o deshabilitar el botón de cotización cuando cambie la localidad seleccionada
//         habilitarCotizar();
//     });
// });

// // Obtenemos el elemento de fecha de nacimiento
// const fechaNacimientoInput = document.getElementById("fecha-nacimiento");
// let edadUsuario = null; // Variable para almacenar la edad del usuario

// // Función para verificar si el usuario tiene al menos 18 años
// function verificarEdad(fecha) {
//     const hoy = new Date();
//     const fechaNacimiento = new Date(fecha);
//     const edad = hoy.getFullYear() - fechaNacimiento.getFullYear();
//     const mes = hoy.getMonth() - fechaNacimiento.getMonth();

//     if (mes < 0 || (mes === 0 && hoy.getDate() < fechaNacimiento.getDate())) {
//         return edad - 1;
//     }

//     return edad;
// }

// // Función para establecer el valor predeterminado si el campo está vacío
// function establecerValorPredeterminado() {
//     if (!fechaNacimientoInput.value) {
//         fechaNacimientoInput.value = ""; // Vaciamos el campo de fecha
//     }
// }

// // Agregamos un evento de carga al cargar la página
// window.addEventListener("load", function() {
//     establecerValorPredeterminado();
//     // Al cargar la página, también verificamos si se deben habilitar o deshabilitar el botón de cotización
//     habilitarCotizar();
// });

// // Agregamos un evento de cambio al input de fecha de nacimiento
// fechaNacimientoInput.addEventListener("change", function() {
//     edadUsuario = verificarEdad(this.value); // Almacenamos la edad calculada en la variable
    
//     // Si la edad es menor a 18, mostramos una alerta y vaciamos el campo de fecha
//     if (edadUsuario < 18) {
//         alert("Debes ser mayor de 18 años para continuar.");
//         this.value = ""; // Vaciamos el campo de fecha
//     }

//     // Habilitar o deshabilitar el botón de cotización cuando cambie la fecha de nacimiento
//     habilitarCotizar();
// });

// window.addEventListener('beforeunload', function () {
//     dropdownLocalidad.selectedIndex = 0;
//     fechaNacimientoInput.value = "";
//     tieneGNCInput.checked = false;
//     cotizarButton.disabled = true;
// });

// // Obtener el elemento del checkbox
// const tieneGNCInput = document.getElementById("tiene-gnc");

// // Variable global para almacenar el estado del checkbox
// let tieneGNC = false;

// // Función para establecer el valor predeterminado si el checkbox está vacío
// function establecerValorPredeterminado() {
//     tieneGNC = tieneGNCInput.checked;
// }

// // Agregamos un evento de carga al cargar la página
// window.addEventListener("load", function() {
//     establecerValorPredeterminado();
// });

// // Agregamos un evento de cambio al checkbox
// tieneGNCInput.addEventListener("change", function() {
//     tieneGNC = this.checked; // Actualizamos el valor de la variable global

//     // Aquí puedes hacer lo que necesites con el valor del checkbox
//     console.log("El valor de tieneGNC es:", tieneGNC);
// });

// Recuperar valores del local storage
const selectedMarcaId = localStorage.getItem('selectedMarcaId');
const selectedModeloId = localStorage.getItem('selectedModeloId');
const selectedVersionId = localStorage.getItem('selectedVersionId');
const selectedAnio = localStorage.getItem('selectedAnio');

const dropdownLocalidad = document.getElementById('dropdown-localidad');
let selectedLocalidad = '';

// Obtener el elemento del botón de cotización
const cotizarButton = document.getElementById("cotizar-button");

// Función para habilitar o deshabilitar el botón de cotización
function habilitarCotizar() {
    if (selectedLocalidad && fechaNacimientoInput.value && edadUsuario >= 18) {
        cotizarButton.disabled = false;
    } else {
        cotizarButton.disabled = true;
    }
}

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

        // Habilitar o deshabilitar el botón de cotización cuando cambie la localidad seleccionada
        habilitarCotizar();
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
    // Al cargar la página, también verificamos si se deben habilitar o deshabilitar el botón de cotización
    habilitarCotizar();
});

// Agregamos un evento de cambio al input de fecha de nacimiento
fechaNacimientoInput.addEventListener("change", function() {
    edadUsuario = verificarEdad(this.value); // Almacenamos la edad calculada en la variable
    
    // Si la edad es menor a 18, mostramos una alerta y vaciamos el campo de fecha
    if (edadUsuario < 18) {
        alert("Debes ser mayor de 18 años para continuar.");
        this.value = ""; // Vaciamos el campo de fecha
    }

    // Habilitar o deshabilitar el botón de cotización cuando cambie la fecha de nacimiento
    habilitarCotizar();
});

// Agregamos un evento de clic al botón de cotización
cotizarButton.addEventListener("click", function() {
    // Llamamos a la función para enviar la solicitud POST
    enviarSolicitudPOST();
});

window.addEventListener('beforeunload', function () {
    dropdownLocalidad.selectedIndex = 0;
    fechaNacimientoInput.value = "";
    tieneGNCInput.checked = false;
    cotizarButton.disabled = true;
});

// Obtener el elemento del checkbox
const tieneGNCInput = document.getElementById("tiene-gnc");

// Variable global para almacenar el estado del checkbox
let tieneGNC = false;

// Función para establecer el valor predeterminado si el checkbox está vacío
function establecerValorPredeterminado() {
    tieneGNC = tieneGNCInput.checked;
}

// Agregamos un evento de carga al cargar la página
window.addEventListener("load", function() {
    establecerValorPredeterminado();
});

// Agregamos un evento de cambio al checkbox
tieneGNCInput.addEventListener("change", function() {
    tieneGNC = this.checked; // Actualizamos el valor de la variable global

    // Aquí puedes hacer lo que necesites con el valor del checkbox
    console.log("El valor de tieneGNC es:", tieneGNC);
});

// Función para enviar la solicitud POST
function enviarSolicitudPOST() {
    // Obtener los valores necesarios
    const localidad = selectedLocalidad; // Obtén el valor seleccionado de la localidad
    const edad = edadUsuario; // Utiliza la variable global edadUsuario

    console.log(localidad);
    console.log(edad);
    console.log(selectedAnio);
    console.log(selectedMarcaId);
    console.log(selectedModeloId);
    console.log(selectedVersionId);
    console.log(tieneGNC);


    // Crear el objeto de datos para el cuerpo de la solicitud
    const data = {
        localidad: localidad,
        edad: edad,
        automovil: {
            anioVehiculo: selectedAnio, // Puedes obtener esto del localStorage o de donde lo tengas almacenado
            marcaId: selectedMarcaId,
            modeloId: selectedModeloId,
            versionId: selectedVersionId,
            gnc: tieneGNC // Utiliza la variable global tieneGNC
        }
    };

    // Configurar la opción para la solicitud
    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data) // Convertir el objeto a JSON
    };

    // Hacer la solicitud
    fetch('https://localhost:7061/api/Vehiculo', options)
        .then(response => {
            if (!response.ok) {
                throw new Error('Error al enviar la solicitud');
            }
            return response.json(); // Convertir la respuesta a JSON si la solicitud es exitosa
        })
        .then(data => {
            // Aquí puedes manejar la respuesta si es necesario
            console.log('Solicitud POST enviada con éxito:', data);
        })
        .catch(error => {
            // Manejar errores
            console.error('Error al enviar la solicitud POST:', error);
        });
}
