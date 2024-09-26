const URL_OBJETOS = "https://collectionapi.metmuseum.org/public/collection/v1/objects/";

function getQueryParameter(param) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(param);
}

const objectId = getQueryParameter('objectId');

if (objectId) {
    fetch(URL_OBJETOS + objectId)
        .then(response => response.json())
        .then(data => {
            const grillaAdicional = document.getElementById('grilla-adicional');
            if (data.additionalImages && data.additionalImages.length > 0) {
                const additionalImagesHtml = data.additionalImages.map(imgUrl => `
                    <div class="imagen-adicional">
                        <img src="${imgUrl}" alt="Imagen adicional">
                    </div>
                `).join('');

                grillaAdicional.innerHTML = additionalImagesHtml;
            } else {
                grillaAdicional.innerHTML = '<p>No hay imágenes adicionales disponibles.</p>';
            }
        })
        .catch(error => {
            console.error('Error al obtener las imágenes adicionales:', error);
            document.getElementById('grilla-adicional').innerHTML = '<p>Error al cargar las imágenes adicionales.</p>';
        });
} else {
    document.getElementById('grilla-adicional').innerHTML = '<p>No se encontró el ID del objeto.</p>';
}

document.getElementById("volver").addEventListener("click", () => {
    history.back();
});