const dropdownAnio = document.getElementById('dropdown-anio');
const dropdownMarca = document.getElementById('dropdown-marca');
const dropdownModelo = document.getElementById('dropdown-modelo');
const dropdownVersion = document.getElementById('dropdown-version');
const nextButton = document.getElementById('next-button');

document.addEventListener('DOMContentLoaded', function() {

    const apiMarcaUrl = 'https://localhost:7061/api/Marca';

    // Function to check if all dropdowns have a selected value
    function checkDropdowns() {
        if (dropdownAnio.value && dropdownMarca.value && dropdownModelo.value && dropdownVersion.value) {
            nextButton.disabled = false;
        } else {
            nextButton.disabled = true;
        }
    }

    // Populate dropdown-anio with years dynamically
    const startYear = 1989;
    const endYear = 2024;

    for (let year = startYear; year <= endYear; year++) {
        const option = document.createElement('option');
        option.value = year;
        option.textContent = year;
        dropdownAnio.appendChild(option);
    }

    dropdownAnio.addEventListener('change', function() {
        // Llama a la función para actualizar el almacenamiento local
        actualizarLocalStorage();
    });

    // Fetch data from the API endpoint for Marca
    fetch(apiMarcaUrl)
        .then(response => response.json())
        .then(data => {
            data.forEach(item => {
                const option = document.createElement('option');
                option.value = item.id;
                option.textContent = item.nombre;
                dropdownMarca.appendChild(option);
            });
        })
        .catch(error => {
            console.error('Error fetching data:', error);
        });

    // Add event listener to marca dropdown to fetch modelos based on selected marca
    dropdownMarca.addEventListener('change', function() {
        const selectedMarcaId = dropdownMarca.value;
        const apiModeloUrl = `https://localhost:7061/api/Modelo/${selectedMarcaId}`;

        fetch(apiModeloUrl)
            .then(response => response.json())
            .then(data => {
                // Clear previous options
                dropdownModelo.innerHTML = '<option value="" disabled selected>Buscar modelo</option>';

                // Clear dropdown-version and add default option
                dropdownVersion.innerHTML = '<option value="" disabled selected>Buscar versión</option>';

                // Populate dropdown-modelo with fetched data
                data.forEach(item => {
                    const option = document.createElement('option');
                    option.value = item.id;
                    option.textContent = item.nombre;
                    dropdownModelo.appendChild(option);
                });

                // Enable the next button if all dropdowns have a selected value
                checkDropdowns();
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });
            actualizarLocalStorage();
    });

    // Add event listener to marca dropdown to fetch versiones based on selected modelo
    dropdownModelo.addEventListener('change', function() {
        const selectedModeloId = dropdownModelo.value;
        console.log(selectedModeloId);
        const apiVersionUrl = `https://localhost:7061/api/Version/${selectedModeloId}`;

        fetch(apiVersionUrl)
            .then(response => response.json())
            .then(data => {
                // Clear previous options
                dropdownVersion.innerHTML = '<option value="" disabled selected>Buscar versión</option>';

                // Populate dropdown-version with fetched data
                data.forEach(item => {
                    const option = document.createElement('option');
                    option.value = item.id;
                    option.textContent = item.nombre;
                    dropdownVersion.appendChild(option);
                });

                // Enable the next button if all dropdowns have a selected value
                checkDropdowns();
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });
            actualizarLocalStorage();
    });

    dropdownVersion.addEventListener('change', function() {
        // Llama a la función para actualizar el almacenamiento local
        actualizarLocalStorage();
    });

    // Add event listeners to dropdowns to check their values on change
    dropdownAnio.addEventListener('change', checkDropdowns);
    dropdownMarca.addEventListener('change', checkDropdowns);
    dropdownModelo.addEventListener('change', checkDropdowns);
    dropdownVersion.addEventListener('change', checkDropdowns);
});

//Enviar al usurio a la siguiente página
document.getElementById('next-button').addEventListener('click', function() {
    window.location.href = './cotizar-page2.html';
});

    // Función para actualizar el almacenamiento local con los valores seleccionados
    function actualizarLocalStorage() {
        localStorage.setItem('selectedMarcaId', dropdownMarca.value);
        localStorage.setItem('selectedModeloId', dropdownModelo.value);
        localStorage.setItem('selectedVersionId', dropdownVersion.value);
        localStorage.setItem('selectedAnio', dropdownAnio.value);
    }

console.log(test);

// Evento beforeunload para restablecer la página al recargar
window.addEventListener('beforeunload', function(event) {
    dropdownAnio.selectedIndex = '<option value="" disabled selected>Buscar año</option>'; // Restablecer dropdown de año seleccionando la primera opción
    dropdownMarca.selectedIndex = '<option value="" disabled selected>Buscar marca</option>'; // Restablecer dropdown de marca seleccionando la primera opción
    dropdownModelo.innerHTML = '<option value="" disabled selected>Buscar modelo</option>'; // Limpiar dropdown de modelo
    dropdownVersion.innerHTML = '<option value="" disabled selected>Buscar versión</option>'; // Limpiar dropdown de versión
    localStorage.clear();
});