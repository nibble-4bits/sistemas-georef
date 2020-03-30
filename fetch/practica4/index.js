'use strict';

const BASE_API_URL = 'https://corona.lmao.ninja';

async function initMap() {
    const props = {
        center: {
            lat: 15,
            lng: 0
        },
        zoom: 2
    };
    const map = new google.maps.Map(document.getElementById('map'), props);
    let globalData = null;
    let countriesData = null;

    await showModal('#modalLoading');
    try {
        const globalRes = await fetch(`${BASE_API_URL}/all`);
        globalData = await globalRes.json();
        cacheAPIData('globalData', globalData);

        const countriesRes = await fetch(`${BASE_API_URL}/countries`);
        countriesData = await countriesRes.json();
        cacheAPIData('countryData', countriesData);
    }
    catch (error) {
        globalData = retrieveCachedAPIData('globalData');
        countriesData = retrieveCachedAPIData('countryData');
        await hideModal('#modalLoading');
        if (!globalData || !countriesData) {
            await showModal('#modalError');
        }
    }

    updateInfoCards(globalData);
    addCountryMarkers(countriesData, map);
    
    await hideModal('#modalLoading');
}

function generateCountryInfoHTML(country) {
    return `
        <div class="googleMapMarker">
            <div style="display:flex; flex-direction: column; align-items: center; padding-bottom: 1em;">
                <img src="${country.countryInfo.flag}" alt="Bandera de ${country.country}" style="width: 60%;">
            </div>
            <div style="display:flex; flex-direction: column; align-items: center;">
                <div>
                    <b>Casos: </b>${country.cases}<br>
                </div>
                <div>
                    <b>Muertes: </b>${country.deaths}<br>
                </div>
                <div>
                    <b>Recuperados: </b>${country.recovered}<br>
                </div>
            </div>
        </div>
    `;
}

function generateFullCountryInfoHTML(country) {
    return `
        <div class="googleMapRightControl">
            <div style="display:flex; flex-direction: column; align-items: center; padding-bottom: 1em;">
                <img src="${country.countryInfo.flag}" alt="Bandera de ${country.country}" style="width: 60%;">
                <h5 style="margin: 3px 0 0 0;">${country.country}</h5>
            </div>
            <div style="display:flex; justify-content: center;">
                <table>
                    <tr>
                        <td><b>Casos</b></td>
                        <td>${country.cases}</td>
                    </tr>
                    <tr>
                        <td><b>Nuevos hoy</b></td>
                        <td>${country.todayCases}</td>
                    </tr>
                    <tr>
                        <td><b>Muertes</b></td>
                        <td>${country.deaths}</td>
                    </tr>
                    <tr>
                        <td><b>Muertes hoy</b></td>
                        <td>${country.todayDeaths}</td>
                    </tr>
                    <tr>
                        <td><b>Recuperados</b></td>
                        <td>${country.recovered}</td>
                    </tr>
                    <tr>
                        <td><b>Activos</b></td>
                        <td>${country.active}</td>
                    </tr>
                    <tr>
                        <td><b>Críticos</b></td>
                        <td>${country.critical}</td>
                    </tr>
                    <tr>
                        <td><b>Casos/millón</b></td>
                        <td>${country.casesPerOneMillion}</td>
                    </tr>
                </table>
            </div>
        </div>
    `;
}

function makeControl(controlDiv, country) {
    // Set up the control border.
    var controlUI = document.createElement('div');
    controlUI.title = country.country;
    controlUI.className = 'controlUI';
    controlDiv.appendChild(controlUI);

    // Set up the inner control.
    var controlText = document.createElement('div');
    controlText.innerHTML = generateFullCountryInfoHTML(country);
    controlText.className = 'controlText';
    controlUI.appendChild(controlText);
}

function cacheAPIData(key, jsonData) {
    localStorage.setItem(key, JSON.stringify(jsonData));
}

function retrieveCachedAPIData(key) {
    return JSON.parse(localStorage.getItem(key));
}

function updateInfoCards(globalData) {
    const divLastUpdated = document.getElementById('lastUpdated');
    const divGlobalConfirmedCases = document.getElementById('globalConfirmedCases');
    const divGlobalRecovered = document.getElementById('globalRecovered');
    const divGlobalDeaths = document.getElementById('globalDeaths');

    divLastUpdated.textContent = new Date(globalData.updated).toLocaleString('es-us', { hour12: true });
    divGlobalConfirmedCases.textContent = globalData.cases.toLocaleString();
    divGlobalRecovered.textContent = globalData.recovered.toLocaleString();
    divGlobalDeaths.textContent = globalData.deaths.toLocaleString();
}

function addCountryMarkers(countriesData, map) {
    let arrInfoWindows = [];
    const icon = {
        url: 'https://image.flaticon.com/icons/png/128/2659/2659980.png',
        scaledSize: new google.maps.Size(24, 24),
        origin: new google.maps.Point(0, 0)
    };

    for (const country of countriesData) {
        const info = generateCountryInfoHTML(country);
        const infoWindow = new google.maps.InfoWindow({
            content: info
        });

        const marker = new google.maps.Marker({
            map: map,
            icon: icon,
            position: new google.maps.LatLng(country.countryInfo.lat, country.countryInfo.long),
            title: `${country.country}`
        });

        marker.addListener('click', () => {
            for (const infoWin of arrInfoWindows) {
                infoWin.close();
            }
            infoWindow.open(map, marker);
            var divName = document.createElement('div');
            new makeControl(divName, country);

            let fullInfoWindow = setInterval(() => { 
                if (!infoWindow.getMap()) {
                    clearInterval(fullInfoWindow);
                    map.controls[google.maps.ControlPosition.RIGHT_CENTER].pop();
                }
                else if (map.controls[google.maps.ControlPosition.RIGHT_CENTER].length === 0) {
                    map.controls[google.maps.ControlPosition.RIGHT_CENTER].push(divName);
                }
            }, 100);
        });

        arrInfoWindows.push(infoWindow);
    }
}

async function showModal(modalId) {
    $(modalId).modal({ backdrop: 'static', keyboard: true, show: true });
    return new Promise((resolve, reject) => {
        $(modalId).on('shown.bs.modal', evt => {
            resolve();
        });
    });
}

async function hideModal(modalId) {
    $(modalId).modal('hide');
    return new Promise((resolve, reject) => {
        $(modalId).on('hidden.bs.modal', evt => {
            resolve();
        });
    });
}
