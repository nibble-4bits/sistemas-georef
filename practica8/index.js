const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const language = urlParams.get('idioma');

const script = document.createElement('script')
script.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyADjOfdGIg-7JiqjoTstMN9el4g-nLhxxA&callback=initMap&language=${language}`;
document.head.appendChild(script);

document.getElementById('slcIdioma').value = language;

function initMap() {
    const map = new google.maps.Map(document.getElementById('map'), {
        center: {
            lat: 21.1063827,
            lng: -101.6908361
        },
        zoom: 3
    });
}