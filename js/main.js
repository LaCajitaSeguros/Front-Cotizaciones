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


document.getElementById('next-button').addEventListener('click', function() {
    // Guardar los valores seleccionados en sessionStorage
    sessionStorage.setItem('selectedAnio', dropdownAnio.value);
    sessionStorage.setItem('selectedMarca', dropdownMarca.value);
    sessionStorage.setItem('selectedModelo', dropdownModelo.value);
    sessionStorage.setItem('selectedVersion', dropdownVersion.value);

    // Redirigir al usuario a la siguiente página
    window.location.href = './cotizar-page2.html';
});

document.addEventListener('DOMContentLoaded', function() {
    // Restaurar los valores seleccionados desde sessionStorage, si existen
    if (sessionStorage.getItem('selectedAnio')) {
        dropdownAnio.value = sessionStorage.getItem('selectedAnio');
    }
    if (sessionStorage.getItem('selectedMarca')) {
        dropdownMarca.value = sessionStorage.getItem('selectedMarca');
    }
    if (sessionStorage.getItem('selectedModelo')) {
        dropdownModelo.value = sessionStorage.getItem('selectedModelo');
    }
    if (sessionStorage.getItem('selectedVersion')) {
        dropdownVersion.value = sessionStorage.getItem('selectedVersion');
    }
});

// Evento beforeunload para restablecer la página al recargar
window.addEventListener('beforeunload', function(event) {
    dropdownAnio.selectedIndex = '<option value="" disabled selected>Buscar año</option>'; // Restablecer dropdown de año seleccionando la primera opción
    dropdownMarca.selectedIndex = '<option value="" disabled selected>Buscar marca</option>'; // Restablecer dropdown de marca seleccionando la primera opción
    dropdownModelo.innerHTML = '<option value="" disabled selected>Buscar modelo</option>'; // Limpiar dropdown de modelo
    dropdownVersion.innerHTML = '<option value="" disabled selected>Buscar versión</option>'; // Limpiar dropdown de versión
});