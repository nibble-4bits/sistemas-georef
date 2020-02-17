const API_KEY = '';

/**
 * Carga la API de Google Maps estableciendo el atributo src del elemento <script>
 * @param {String} scriptId El id del elemento <script> que va a cargar la API
 */
function loadMapsAPI(scriptId) {
    const scriptGoogleMaps = document.getElementById(scriptId);
    scriptGoogleMaps.setAttribute('src', `https://maps.googleapis.com/maps/api/js?key=${API_KEY}&callback=initMap`);
}

function initMap() {
    let coords = {
        lat: 21.152639,
        lng: -101.711598
    }

    let map = new google.maps.Map(
        document.getElementById('mapa'),
        {
            center: coords,
            zoom: 15
        }
    );

    let marcador = new google.maps.Marker({ position: coords, map: map });
}

loadMapsAPI('scriptMapsAPI');