const URL_DEPARTAMENTOS = "https://collectionapi.metmuseum.org/public/collection/v1/departments";
const URL_OBJETOS = "https://collectionapi.metmuseum.org/public/collection/v1/objects/";
const URL_SEARCH_IMAGES = "https://collectionapi.metmuseum.org/public/collection/v1/search?q=&hasImages=true";
const URL_SEARCH = "https://collectionapi.metmuseum.org/public/collection/v1/search";
let idsProblematicos = [855340, 38153, 854970];
let objectIDs = [];
let currentPage = 1;
const itemsPerPage = 20;
const maxItems = 200;


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
            objectIDs = data.objectIDs ? data.objectIDs.filter(id => !idsProblematicos.includes(id)).slice(0, maxItems) : [];
            currentPage = 1;

            const mensaje = document.getElementById("mensaje");
            if (objectIDs.length === 0) {
                mensaje.textContent = "No hay elementos coincidentes con la busqueda.";
                document.getElementById("grilla").innerHTML = "";
            } else {
                mensaje.style.display = "none";
                fetchObjetos();
            }
        })
        .catch(error => console.error('Error en la búsqueda:', error));
});


fetch(URL_SEARCH_IMAGES).then(response => response.json()).then(data => {
    objectIDs = data.objectIDs.slice(0, maxItems);
    fetchObjetos();
});
fetchDepartamentos();
/*
async function fetchObjetos() {
    let objetosHtml = '';
    const filteredIDs = objectIDs.filter(id => !idsProblematicos.includes(id)); // Filtrar IDs problemáticos

    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = Math.min(startIndex + itemsPerPage, filteredIDs.length);

    const currentIDs = filteredIDs.slice(startIndex, endIndex);
    console.log(`IDs encontrados:`, currentIDs);

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

            const additionalImagesLink = data.additionalImages && data.additionalImages.length > 0 ?
                `<a href="additional-images.html?objectId=${objectId}" class="additional-images-button">Ver más imágenes</a>` : '';

            // Construimos el HTML del objeto
            objetosHtml += `
            <div class="objeto" title="Fecha de creación: ${data.objectBeginDate || 'Desconocida'}">
                <img src="${imageUrl}" alt="No image available">
                <h4 class="titulo">${titulo}</h4>
                <h6 class="cultura">${cultura}</h6>
                <h6 class="dinastia">${dinastia}</h6>
                ${additionalImagesLink}
            </div>`;
        } catch (error) {
            idsProblematicos.push(objectId); // Si hay un error, también lo agregamos a los IDs problemáticos
        }
    }

    document.getElementById("grilla").innerHTML = objetosHtml;

    // Aquí llamamos a renderPagination con el total de items filtrados
    renderPagination(filteredIDs.length);
}
*/


async function fetchObjetos() {
    let objetosHtml = '';
    const filteredIDs = objectIDs.filter(id => !idsProblematicos.includes(id));

    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = Math.min(startIndex + itemsPerPage, filteredIDs.length);

    const currentIDs = filteredIDs.slice(startIndex, endIndex);
    console.log(`IDs encontrados:`, currentIDs);

    for (const objectId of currentIDs) {
        try {
            const response = await fetch(URL_OBJETOS + objectId);

            if (!response.ok) {
                console.error(`Error al obtener el objeto con ID ${objectId}: ${response.statusText}`);
                idsProblematicos.push(objectId);
                continue;
            }

            const data = await response.json();
            const imageUrl = data.primaryImageSmall ? data.primaryImageSmall : 'imagen_no_disponible.jpeg';


            const traduccionResponse = await fetch('/traducir', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    titulo: data.title || 'Título no disponible',
                    dinastia: data.dynasty || 'Dinastía no disponible',
                    cultura: data.culture || 'Cultura no disponible'
                })
            });

            const traducciones = await traduccionResponse.json();

            const titulo = traducciones.titulo || 'Título no disponible';
            const cultura = traducciones.cultura || 'Cultura no disponible';
            const dinastia = traducciones.dinastia || 'Dinastía no disponible';

            const additionalImagesLink = data.additionalImages && data.additionalImages.length > 0 ?
                `<a href="additional-images.html?objectId=${objectId}" class="additional-images-button id="ver-mas-imagenes"">Ver más imágenes</a>` : '';

            objetosHtml += `
            <div class="objeto" title="Fecha de creación: ${data.objectBeginDate || 'Desconocida'}">
                <img src="${imageUrl}" alt="No image available">
                <h4 class="titulo">${titulo}</h4>
                <h6 class="cultura">${cultura}</h6>
                <h6 class="dinastia">${dinastia}</h6>
                ${additionalImagesLink}
            </div>`;
        } catch (error) {
            console.error(`Error al procesar el objeto ${objectId}:`, error);
            idsProblematicos.push(objectId);
        }
    }

    document.getElementById("grilla").innerHTML = objetosHtml || "No se encontraron objetos para mostrar.";

    renderPagination(filteredIDs.length);
}




function renderPagination(totalItems) {
    const paginationElement = document.getElementById("paginacion");
    paginationElement.innerHTML = '';

    const totalPages = Math.ceil(totalItems / itemsPerPage);

    for (let i = 1; i <= totalPages; i++) {
        const button = document.createElement("button");
        button.textContent = i;
        button.classList.add("page-button");
        button.disabled = (i === currentPage);


        button.addEventListener("click", () => {
            currentPage = i;
            fetchObjetos();
        });

        paginationElement.appendChild(button);
    }
}