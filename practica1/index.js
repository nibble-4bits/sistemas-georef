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