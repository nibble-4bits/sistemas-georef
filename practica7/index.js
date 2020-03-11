const mapProps = {
    center: { lat: 0, lng: 0 },
    zoom: 14
};

function initMap() {
    let map = new google.maps.Map(document.getElementById('map'), mapProps);
    let icon = {
        url: 'https://cdn1.iconfinder.com/data/icons/Map-Markers-Icons-Demo-PNG/256/Map-Marker-Ball-Pink.png',
        scaledSize: new google.maps.Size(64, 64),
        origin: new google.maps.Point(0, 0)
    };

    let marcador = new google.maps.Marker({
        position: { lat: 0, lng: 0 },
        map,
        icon
    });

    if (navigator.geolocation) {
        moverPosicion(marcador);
        setInterval(() => {
            moverPosicion(marcador);
        }, 2000);
    }

    function moverPosicion(marker) {
        navigator.geolocation.getCurrentPosition(pos => {
            let coords = new google.maps.LatLng(pos.coords.latitude, pos.coords.longitude);
            marker.setPosition(coords);
            map.panTo(coords);
            map.setCenter(coords);
        });
    }
}