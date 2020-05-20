const coords = { lat: 21.152639, lng: -101.711598 };
const props = {
    center: coords,
    zoom: 12
};

function initMap() {
    /* MAPA 1 */
    const map1 = new google.maps.Map(document.getElementById('map1'), props);
    const marker = new google.maps.Marker({
        position: coords,
        map: map1
    });

    marker.addListener('click', evt => {
        map1.setZoom(8);
        map1.setCenter(marker.getPosition());
    });

    /* MAPA 2 */
    const map2 = new google.maps.Map(document.getElementById('map2'), props);
    const marker2 = new google.maps.Marker({
        position: coords,
        map: map2
    });

    map2.addListener('center_changed', evt => {
        setTimeout(() => {
            map2.panTo(marker2.getPosition())
        }, 3000);
    });

    /* MAPA 3 */
    const map3 = new google.maps.Map(document.getElementById('map3'), props);
    const infoWindowMap3 = new google.maps.InfoWindow({
        content: `Nivel de zoom: ${map3.getZoom()}`,
        position: coords
    });
    infoWindowMap3.open(map3);

    map3.addListener('zoom_changed', evt => {
        infoWindowMap3.setContent(`Nivel de zoom: ${map3.getZoom()}`);
    });

    /* MAPA 4 */
    const map4 = new google.maps.Map(document.getElementById('map4'), props);

    map4.addListener('click', evt => {
        const marker = new google.maps.Marker({
            position: evt.latLng,
            map: map4
        });
        map4.panTo(evt.latLng);
    });

    /* MAPA 5 */
    const map5 = new google.maps.Map(document.getElementById('map5'), props);
    const infoWindowMap5 = new google.maps.InfoWindow({
        content: 'Haz click para obtener las coordenadas',
        position: coords
    });
    infoWindowMap5.open(map5);

    map5.addListener('click', evt => {
        infoWindowMap5.setContent(`${evt.latLng}`);
        infoWindowMap5.setPosition(evt.latLng);
    });

    /* MAPA 6 */
    const map6 = new google.maps.Map(document.getElementById('map6'), props);
    google.maps.event.addDomListener(document.getElementById('btn-centrar'), 'click', evt => {
        map6.panTo(coords);
    });
}