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
        const info = generateCountryInfoHTML(country);
        const infoWindow = new google.maps.InfoWindow({
            content: info
        });

        const marker = new google.maps.Marker({
            map: map,
            position: new google.maps.LatLng(country.countryInfo.lat, country.countryInfo.long),
            title: `${country.country}`
        });

        marker.addListener('click', () => {
            infoWindow.open(map, marker);
        })
    }
}

function generateCountryInfoHTML(country) {
    return `
        <div style="width: 12em;">
            <div style="display:flex; flex-direction: column; align-items: center; padding-bottom: 1em;">
                <img src="${country.countryInfo.flag}" alt="Bandera de ${country.country}" style="width: 60%;">
                <h3 style="margin: 3px 0 0 0;">${country.country}</h3>
            </div>
            <div style="display:flex; flex-direction: column; align-items: center;">
                <div>
                    <b>Casos: </b>${country.cases}<br>
                </div>
                <div>
                    <b>Nuevos hoy: </b>${country.todayCases}<br>
                </div>
                <div>
                    <b>Muertes: </b>${country.deaths}<br>
                </div>
                <div>
                    <b>Muertes hoy: </b>${country.todayDeaths}<br>
                </div>
                <div>
                    <b>Recuperados: </b>${country.recovered}<br>
                </div>
                <div>
                    <b>Activos: </b>${country.active}<br>
                </div>
                <div>
                    <b>Críticos: </b>${country.critical}<br>
                </div>
                <div>
                    <b>Casos por millón: </b>${country.casesPerOneMillion}<br>
                </div>
            </div>
        </div>
    `;
}
