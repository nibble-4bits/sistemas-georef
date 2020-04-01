const markers = [];
const places = [
    { lat: 21.1101462, lng: -101.7293290, name: 'Daniel' }, //Mi casa
    { lat: 21.1610680, lng: -101.6883536, name: 'Marco' }, //Casa de Marco
    { lat: 23.0761814, lng: -109.7253332, name: 'Kevin' }, //Casa de Kevin
    { lat: 21.3519926, lng: -101.9409363, name: 'Jonathan' }, //Casa de Jonathan
    { lat: 19.4321320, lng: -99.0421580, name: 'Yisus' }, //Casa de Yisus
    { lat: 20.9148360, lng: -101.7386270, name: 'Juan' }, //Casa de Juan
    { lat: 21.1045876, lng: -101.6426239, name: 'Sofía' }, //Casa de Sofia
    { lat: 21.1406536, lng: -101.6985011, name: 'Jorge' }, //Casa de Jorge
    { lat: 21.1063827, lng: -101.6908361, name: 'Luis' }, //Casa de Luis
    { lat: 20.5089011, lng: -100.4035122, name: 'Josué' }, //Casa de Josue
    { lat: 20.6910129, lng: -101.3172804, name: 'Andrei' }, //Casa de Andrei
    { lat: 21.1726889, lng: -101.6414578, name: 'Zanella' }, //Casa de Zanella
    { lat: 26.9261932, lng: -101.4271841, name: 'Rodrigo' }, //Casa de Rodrigo
    { lat: 20.9789619, lng: -101.2766037, name: 'Byron' }, //Casa de Byron
    { lat: 21.1798678, lng: -101.7128526, name: 'Bedolla' }, //Casa de Bedolla
    { lat: 21.8534917, lng: -102.3456645, name: 'Padilla' }, //Casa de Padilla
    { lat: 20.9782508, lng: -101.2775206, name: 'Ronaldo' }, //Casa de Ronaldo
    { lat: 21.1553116, lng: -101.6771393, name: 'Axel' }, //Casa de Axel
    { lat: 21.1162161, lng: -101.7021963, name: 'Vallejo' }, //Casa de Vallejo
    { lat: 21.1932296, lng: -101.7158447, name: 'Sebastian' }, //Casa de Sebastian
    { lat: 33.6944542, lng: -117.8168488, name: 'Reyes' }, //Casa de Reyes
    { lat: 21.1529362, lng: -101.6821588, name: 'Mauricio' }, //Casa de Mau
    { lat: 21.1762569, lng: -101.6626948, name: 'Zamora' }, //Casa de Zamora
    { lat: 21.1292596, lng: -101.7274477, name: 'Leonardo' }, //Casa de Leo
    { lat: 21.1747198, lng: -101.6530726, name: 'Cabrera' }, //Casa de Cabrera
    { lat: 21.14, lng: -101.69, name: 'Cuanalo' } //Casa de Cuanalo
];

function initMap() {
    const map = new google.maps.Map(document.getElementById('map'), {
        center: {
            lat: 21.1063827,
            lng: -101.6908361
        },
        zoom: 3
    });

    const labels = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    places.forEach((place, i) => {
        const marker = new google.maps.Marker({
            map,
            position: place,
            label: labels[i],
            title: place.name
        });
        markers.push(marker);
    });

    const markerCluster = new MarkerClusterer(map, markers, {
        imagePath: 'https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m',
        gridSize: 60,
        zoomOnClick: true,
        maxZoom: 10
    });

    document.getElementById('btnRoadmap').addEventListener('click', function () {
        map.setMapTypeId('roadmap');
    });

    document.getElementById('btnSatellite').addEventListener('click', function () {
        map.setMapTypeId('satellite');
    });

    document.getElementById('btnHybrid').addEventListener('click', function () {
        map.setMapTypeId('hybrid');
    });

    document.getElementById('btnTerrain').addEventListener('click', function () {
        map.setMapTypeId('terrain');
    });
}