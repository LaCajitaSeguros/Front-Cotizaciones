document.addEventListener('DOMContentLoaded', function() {
    const dropdownAnio = document.getElementById('dropdown-anio');
    const dropdownMarca = document.getElementById('dropdown-marca');
    const dropdownModelo = document.getElementById('dropdown-modelo');
    const dropdownVersion = document.getElementById('dropdown-version');
    const nextButton = document.getElementById('next-button');

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
    window.location.href = './registrate.html';
});