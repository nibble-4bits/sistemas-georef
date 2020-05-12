let watchId;
const btnStart = document.getElementById('btnStart');
const btnStop = document.getElementById('btnStop');
const divDatos = document.getElementById('datos');

function initMap() {
    const map = new google.maps.Map(document.getElementById('map'), {
        center: {
            lat: 21.1236,
            lng: -101.68
        },
        zoom: 12
    });

    const marcador = new google.maps.Marker({
        position: { lat: 0, lng: 0 },
        map,
        icon: {
            url: 'https://cdn1.iconfinder.com/data/icons/Map-Markers-Icons-Demo-PNG/256/Map-Marker-Ball-Pink.png',
            scaledSize: new google.maps.Size(64, 64),
            origin: new google.maps.Point(0, 0)
        }
    });

    btnStart.addEventListener('click', evt => {
        if (navigator.geolocation) {
            watchId = navigator.geolocation.watchPosition(
                pos => {
                    const lat = pos.coords.latitude.toFixed(4);
                    const lng = pos.coords.longitude.toFixed(4);
                    marcador.setPosition(new google.maps.LatLng(lat, lng));
                    divDatos.innerHTML = `
                        <p>Lat: ${lat}, Long: ${lng}</p>
                        <p>Exactitud: ${pos.coords.accuracy ?? 'No disponible'}</p>
                        <p>Altitud: ${pos.coords.altitude ?? 'No disponible'}</p>
                        <p>Velocidad: ${pos.coords.speed ?? 'No disponible'}</p>
                        <p>Última actualización: ${new Date(pos.timestamp).toLocaleString()}</p>
                    `;
                },
                error => {
                    console.error(error);
                },
                {
                    enableHighAccuracy: true,
                    timeout: 10000,
                    maximumAge: 30000
                }
            );
            btnStart.disabled = true;
            btnStop.disabled = false;
        }
    });

    btnStop.addEventListener('click', evt => {
        if (navigator.geolocation) {
            navigator.geolocation.clearWatch(watchId);
            divDatos.innerHTML = `<p>Se detuvo el monitoreo</p>`;
            btnStart.disabled = false;
            btnStop.disabled = true;
        }
    });
}