var coords = {
    lat: 0,
    lng: 0
}

var props = {
    center: coords,
    zoom: 2
}

async function initMap() {
    const map = new google.maps.Map(document.getElementById('map'), props);

    const res = await fetch('https://corona.lmao.ninja/countries');
    const countries = await res.json();
        
    for (const country of countries) {
        const info = genereateCountryInfoHTML(country);
        const infoWindow = new google.maps.InfoWindow({
            content: info
        });

        const marker = new google.maps.Marker({
            map: map,
            position: new google.maps.LatLng(country.countryInfo.lat, country.countryInfo.long),
            title: `${country.country} ${country.cases}`
        });

        marker.addListener('click', () => {
            infoWindow.open(map, marker);
        })
    }
}

function genereateCountryInfoHTML(country) {
    return `
        <div style="width: 10em;">
            <div style="display:flex; justify-content: center; padding-bottom: 1em;">
                <img src="${country.countryInfo.flag}" alt="Bandera de ${country.country}" style="width: 60%;">
            </div>
            <div style="display:flex; flex-direction: column; align-items: center;">
                <div>
                    <strong>País: </strong>${country.country}<br>
                </div>
                <div>
                    <strong>Casos: </strong>${country.cases}<br>
                </div>
                <div>
                    <strong>Nuevos hoy: </strong>${country.todayCases}<br>
                </div>
                <div>
                    <strong>Muertes: </strong>${country.deaths}<br>
                </div>
                <div>
                    <strong>Muertes hoy: </strong>${country.todayDeaths}<br>
                </div>
                <div>
                    <strong>Recuperados: </strong>${country.recovered}<br>
                </div>
                <div>
                    <strong>Activos: </strong>${country.active}<br>
                </div>
                <div>
                    <strong>Críticos: </strong>${country.critical}<br>
                </div>
                <div>
                    <strong>Casos por millón: </strong>${country.casesPerOneMillion}<br>
                </div>
            </div>
        </div>
    `;
}