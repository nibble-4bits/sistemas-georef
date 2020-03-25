const coords = {
    lat: 0,
    lng: 0
};

const props = {
    center: coords,
    zoom: 5
};

function getMarkers() {
    const markers = [
        {
            name: "Mexico",
            latitude: 19.427,
            longitude: -99.1276
        },
        {
            name: "Brazil",
            latitude: -15.7801,
            longitude: -47.9292
        },
        {
            name: "Spain",
            latitude: 40.4167,
            longitude: -3.70327
        }
    ];

    return markers;
}

function initMap() {
    const map = new google.maps.Map(document.getElementById('map'), props);

    const markers = getMarkers();

    for (const marker of markers) {
        new google.maps.Marker({
            map: map,
            position: new google.maps.LatLng(marker.latitude, marker.longitude),
            title: marker.name
        });
    }
}