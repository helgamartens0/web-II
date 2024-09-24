/*const URL_DEPARTAMENTOS = "https://collectionapi.metmuseum.org/public/collection/v1/departments";
const URL_OBJETOS = "https://collectionapi.metmuseum.org/public/collection/v1/objects";
const URL_OBJETO = "https://collectionapi.metmuseum.org/public/collection/v1/objects/";
const URL_SEARCH_IMAGES = "https://collectionapi.metmuseum.org/public/collection/v1/search?q=&hasImages=true";
const URL_SEARCH = "https://collectionapi.metmuseum.org/public/collection/v1/search";
let idsProblematicos = [855340, 38153]; // Lista de IDs que no tienen objetos validos


function fetchDepartamentos() {
    fetch(URL_DEPARTAMENTOS)
        .then((response) => response.json())
        .then((data) => {
            //cargamos el select de departamentos
            //primero tenemos q buscar el select
            const departamento = document.getElementById("departamento"); //referenciamos el select de departament
            //para data, tengo que ir a ver cual es el formato de la respuesta (*)
            // Iteramos sobre la respuesta de la API
            data.departments.forEach((item) => {
                const option = document.createElement("option");
                option.value = item.departmentId;
                option.textContent = item.displayName;
                departamento.appendChild(option);
            });
        });
}

/*
function fetchObjetos(objectIDs) {
    let objetosHtml = '';

    // Filtramos los IDs que no están en la lista de IDs problemáticos
    const objectIDsFiltrados = objectIDs.filter(id => !idsProblematicos.includes(id));
    console.log(objectIDsFiltrados);
    // Usamos for...of para recorrer los objectIDs filtrados
    for (const objectId of objectIDsFiltrados) {
        fetch(URL_OBJETO + objectId)
            .then((response) => {
                if (!response.ok) { // Verificamos si la respuesta fue correcta
                    console.error(`El objeto con ID ${objectId} no se encontró (Error 404).`);
                    idsProblematicos.push(objectId); // Agregamos el ID problemático a la lista
                    throw new Error(`Objeto no encontrado: ${objectId}`); // Lanzamos un error
                }
                return response.json();
            })
            .then((data) => {
                // Validamos si cada propiedad existe, y si no, mostramos un valor por defecto
                const imageUrl = data.primaryImageSmall ? data.primaryImageSmall : 'imagen_no_disponible.jpeg'; // Imagen por defecto si no hay imagen
                const titulo = data.title ? data.title : 'Título no disponible';
                const cultura = data.culture ? data.culture : 'Cultura no disponible';
                const dinastia = data.dynasty ? data.dynasty : 'Dinastía no disponible';

                objetosHtml += `
                    <div class="objeto"> 
                        <img src="${imageUrl}" alt="No image available"> 
                        <h4 class="titulo">${titulo}</h4> 
                        <h6 class="cultura">${cultura}</h6> 
                        <h6 class="dinastia">${dinastia}</h6> 
                    </div>`;

                // Actualizamos la grilla
                document.getElementById("grilla").innerHTML = objetosHtml;
            })
            .catch((error) => {
                console.warn(`Error al cargar el objeto ${objectId}: ${error.message}`);
            });
    }
}

// Función para obtener objetos válidos, asegurando que sean 20}
const cantidadObjetos = 20;
const fetchObjetos = (objectIDs, cantidadObjetos) => {
    let objetosHtml = '';
    let count = 0;
    let index = 0;

    const fetchNextObject = () => {
        if (count >= cantidadObjetos || index >= objectIDs.length) {
            document.getElementById("grilla").innerHTML = objetosHtml;
            return;
        }

        const objectId = objectIDs[index];

        fetch(URL_OBJETO + objectId)
            .then((response) => {
                if (!response.ok) {
                    console.error(`El objeto con ID ${objectId} no se encontró (Error 404).`);
                    idsProblematicos.push(objectId); // Marcar como problemático
                    index++; // Avanzar al siguiente ID
                    fetchNextObject(); // Llamar a la siguiente función para seguir buscando
                    return; // Salir si hubo un error
                }
                return response.json();
            })
            .then((data) => {
                // Validar que tenemos datos y que no es un ID problemático
                if (data && !idsProblematicos.includes(objectId)) {
                    const imageUrl = data.primaryImageSmall ? data.primaryImageSmall : 'imagen_no_disponible.jpeg';
                    const titulo = data.title ? data.title : 'Título no disponible';
                    const cultura = data.culture ? data.culture : 'Cultura no disponible';
                    const dinastia = data.dynasty ? data.dynasty : 'Dinastía no disponible';

                    objetosHtml += `
                        <div class="objeto"> 
                            <img src="${imageUrl}" alt="No image available"> 
                            <h4 class="titulo">${titulo}</h4> 
                            <h6 class="cultura">${cultura}</h6> 
                            <h6 class="dinastia">${dinastia}</h6> 
                        </div>`;

                    count++; // Solo aumentamos el conteo si obtenemos un objeto válido
                }
                index++; // Avanzar al siguiente ID
                fetchNextObject(); // Continuar buscando
            })
            .catch((error) => {
                console.warn(`Error al cargar el objeto ${objectId}: ${error.message}`);
                index++; // Avanzar al siguiente ID en caso de error
                fetchNextObject(); // Continuar buscando
            });
    };

    fetchNextObject(); // Iniciar la búsqueda

};
fetchDepartamentos();

fetch(URL_SEARCH_IMAGES).then((response) => response.json()).then((data) => {
    fetchObjetos(data.objectIDs.slice(0, 20));
});
/*
fetch(URL_SEARCH_IMAGES).then((response) => response.json()).then((data) => {
    // Filtramos hasta 20 IDs válidos
    const idsAUsar = [];
    for (const id of data.objectIDs) {
        if (idsAUsar.length < 20) {
            idsAUsar.push(id);
        } else {
            break; // Salimos si ya tenemos 20 IDs
        }
    }
    // Llamamos a fetchObjetos con los IDs filtrados
    fetchObjetos(idsAUsar);
});

document.getElementById("buscar").addEventListener("click", () => {
    //primero traemos los datos de los campos:
    const departamento = document.getElementById('departamento').value;
    const keyword = document.getElementById('keyword').value;
    const localizacion = document.getElementById('localizacion').value;
    let urlBusqueda = URL_SEARCH + `?q=${keyword}`;

    if (departamento) {
        urlBusqueda += `&departmentId=${departamento}`;
    }

    if (localizacion) {
        urlBusqueda += `&geoLocation=${localizacion}`;
    }
    fetch(urlBusqueda)
        .then((response) => response.json())
        .then((data) => {
            fetchObjetos(data.objectIDs.slice(0, 20));
        })
});*/


/*
const URL_DEPARTAMENTOS = "https://collectionapi.metmuseum.org/public/collection/v1/departments";
const URL_OBJETOS = "https://collectionapi.metmuseum.org/public/collection/v1/objects/";
const URL_SEARCH_IMAGES = "https://collectionapi.metmuseum.org/public/collection/v1/search?q=&hasImages=true";
const URL_SEARCH = "https://collectionapi.metmuseum.org/public/collection/v1/search";
let idsProblematicos = [855340, 38153];
let objectIDs = [];
let currentPage = 1;
const itemsPerPage = 20; // Objetos por página
const maxItems = 80; // Máximo de objetos a mostrar

function fetchDepartamentos() {
    fetch(URL_DEPARTAMENTOS)
        .then(response => response.json())
        .then(data => {
            const departamento = document.getElementById("departamento");
            data.departments.forEach(item => {
                const option = document.createElement("option");
                option.value = item.departmentId;
                option.textContent = item.displayName;
                departamento.appendChild(option);
            });
        });
}

function fetchObjetos() {
    let objetosHtml = '';
    const filteredIDs = objectIDs.filter(id => !idsProblematicos.includes(id));
    const paginatedIDs = filteredIDs.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

    const promises = paginatedIDs.map(objectId =>
        fetch(URL_OBJETOS + objectId)
        .then(response => {
            if (!response.ok) {
                console.error(`El objeto con ID ${objectId} no se encontró (Error 404).`);
                idsProblematicos.push(objectId);
                throw new Error(`Objeto no encontrado: ${objectId}`);
            }
            return response.json();
        })
        .then(data => {
            const imageUrl = data.primaryImageSmall ? data.primaryImageSmall : 'imagen_no_disponible.jpeg';
            const titulo = data.title ? data.title : 'Título no disponible';
            const cultura = data.culture ? data.culture : 'Cultura no disponible';
            const dinastia = data.dynasty ? data.dynasty : 'Dinastía no disponible';

            objetosHtml += `
                    <div class="objeto" title="Fecha de creación: ${data.objectBeginDate || 'Desconocida'}">
                        <img src="${imageUrl}" alt="No image available">
                        <h4 class="titulo">${titulo}</h4>
                        <h6 class="cultura">${cultura}</h6>
                        <h6 class="dinastia">${dinastia}</h6>
                    </div>`;
        })
        .catch(error => {
            console.warn(`Error al cargar el objeto ${objectId}: ${error.message}`);
        })
    );

    Promise.all(promises).then(() => {
        document.getElementById("grilla").innerHTML = objetosHtml;
        renderPagination(filteredIDs.length); // Renderizar la paginación
    });
}

function renderPagination(totalItems) {
    const paginationElement = document.getElementById("paginacion");
    paginationElement.innerHTML = '';

    const totalPages = Math.ceil(totalItems / itemsPerPage);

    for (let i = 1; i <= totalPages; i++) {
        const button = document.createElement("button");
        button.textContent = i;
        button.classList.add("page-button");
        button.addEventListener("click", () => {
            currentPage = i;
            fetchObjetos(); // Llama a la función de objetos con la nueva página
        });
        paginationElement.appendChild(button);
    }
}

document.getElementById("buscar").addEventListener("click", () => {
    const departamento = document.getElementById('departamento').value;
    const keyword = document.getElementById('keyword').value;
    const localizacion = document.getElementById('localizacion').value;

    let urlBusqueda = URL_SEARCH + `?q=${keyword}`;

    if (departamento) {
        urlBusqueda += `&departmentId=${departamento}`;
    }

    if (localizacion) {
        urlBusqueda += `&geoLocation=${localizacion}`;
    }

    fetch(urlBusqueda)
        .then(response => response.json())
        .then(data => {
            objectIDs = data.objectIDs.slice(0, maxItems); // Limitar a 80 objetos
            currentPage = 1; // Reiniciar a la primera página
            fetchObjetos(); // Obtener objetos para la primera página
        });
});

// Inicializa la aplicación
fetchDepartamentos();
fetch(URL_SEARCH_IMAGES).then(response => response.json()).then(data => {
    objectIDs = data.objectIDs.slice(0, maxItems); // Limitar a 80 objetos
    fetchObjetos(); // Obtener objetos para la primera carga
});*/



const URL_DEPARTAMENTOS = "https://collectionapi.metmuseum.org/public/collection/v1/departments";
const URL_OBJETOS = "https://collectionapi.metmuseum.org/public/collection/v1/objects/";
const URL_SEARCH_IMAGES = "https://collectionapi.metmuseum.org/public/collection/v1/search?q=&hasImages=true";
const URL_SEARCH = "https://collectionapi.metmuseum.org/public/collection/v1/search";
let idsProblematicos = [855340, 38153, 854970];
let objectIDs = [];
let currentPage = 1;
const itemsPerPage = 20; // Objetos por página
const maxItems = 100;
//Máximo de objetos a mostrar

function fetchDepartamentos() {
    fetch(URL_DEPARTAMENTOS)
        .then(response => response.json())
        .then(data => {
            const departamento = document.getElementById("departamento");
            data.departments.forEach(item => {
                const option = document.createElement("option");
                option.value = item.departmentId;
                option.textContent = item.displayName;
                departamento.appendChild(option);
            });
        });
}


document.getElementById("buscar").addEventListener("click", () => {
    const departamento = document.getElementById('departamento').value;
    const keyword = document.getElementById('keyword').value;
    const localizacion = document.getElementById('localizacion').value;

    let urlBusqueda = URL_SEARCH + `?q=${keyword}`;

    if (departamento) {
        urlBusqueda += `&departmentId=${departamento}`;
    }

    if (localizacion) {
        urlBusqueda += `&geoLocation=${localizacion}`;
    }

    fetch(urlBusqueda)
        .then(response => response.json())
        .then(data => {
            // Limitar a 80 IDs y filtrar aquellos que ya sabemos que son problemáticos
            objectIDs = data.objectIDs.filter(id => !idsProblematicos.includes(id)).slice(0, maxItems);
            currentPage = 1; // Reiniciar a la primera página
            fetchObjetos(); // Obtener objetos para la primera página
        })
        .catch(error => console.error('Error en la búsqueda:', error));
});


fetch(URL_SEARCH_IMAGES).then(response => response.json()).then(data => {
    objectIDs = data.objectIDs.slice(0, maxItems); // Limitar a 80 objetos
    fetchObjetos(); // Obtener objetos para la primera carga
});


async function fetchObjetos() {
    let objetosHtml = '';
    const filteredIDs = objectIDs.filter(id => !idsProblematicos.includes(id)); // Filtrar IDs problemáticos

    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = Math.min(startIndex + itemsPerPage, filteredIDs.length);

    const currentIDs = filteredIDs.slice(startIndex, endIndex);

    for (const objectId of currentIDs) {
        try {
            const response = await fetch(URL_OBJETOS + objectId);

            if (!response.ok) {
                idsProblematicos.push(objectId);
                continue;
            }

            const data = await response.json();
            const imageUrl = data.primaryImageSmall ? data.primaryImageSmall : 'imagen_no_disponible.jpeg';
            const titulo = data.title ? data.title : 'Título no disponible';
            const cultura = data.culture ? data.culture : 'Cultura no disponible';
            const dinastia = data.dynasty ? data.dynasty : 'Dinastía no disponible';

            // Crear enlace para ver imágenes adicionales
            const additionalImagesLink = data.additionalImages && data.additionalImages.length > 0 ?
                `<a href="additional-images.html?objectId=${objectId}" class="additional-images-button">Ver más imágenes</a>` : '';

            // Construimos el HTML del objeto
            objetosHtml += `
            <div class="objeto" title="Fecha de creación: ${data.objectBeginDate || 'Desconocida'}">
                <img src="${imageUrl}" alt="No image available">
                <h4 class="titulo">${titulo}</h4>
                <h6 class="cultura">${cultura}</h6>
                <h6 class="dinastia">${dinastia}</h6>
                ${additionalImagesLink} <!-- Mostrar el enlace si hay imágenes adicionales -->
            </div>`;

        } catch (error) {
            idsProblematicos.push(objectId); // Si hay un error, también lo agregamos a los IDs problemáticos
        }
    }

    document.getElementById("grilla").innerHTML = objetosHtml;
}





function renderPagination(totalItems) {
    const paginationElement = document.getElementById("paginacion");
    paginationElement.innerHTML = '';

    const totalPages = Math.ceil(totalItems / itemsPerPage);

    for (let i = 1; i <= totalPages; i++) {
        const button = document.createElement("button");
        button.textContent = i;
        button.classList.add("page-button");
        button.disabled = (i === currentPage); // Deshabilitar el botón de la página actual

        button.addEventListener("click", () => {
            currentPage = i;
            fetchObjetos(); // Llama a la función de objetos con la nueva página
        });

        paginationElement.appendChild(button);
    }
}


// Inicializa la aplicación
fetchDepartamentos(); // URL base para obtener información de objetos