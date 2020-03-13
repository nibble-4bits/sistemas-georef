var map = null;
function initMap() {
    const mapProps = {
        center: { lat: 21.13, lng: -101.68 },
        zoom: 13
    };

    map = new google.maps.Map(document.getElementById('map'), mapProps);
}