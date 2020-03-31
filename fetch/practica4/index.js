'use strict';

const BASE_API_URL = 'https://corona.lmao.ninja';
let objInfoWindows = {};
let markers = {};

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

        const countriesRes = await fetch(`${BASE_API_URL}/countries?sort=cases`);
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

    updateInfoCards(globalData, countriesData);
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
                    <b>Casos: </b>${country.cases.toLocaleString('en')}<br>
                </div>
                <div>
                    <b>Muertes: </b>${country.deaths.toLocaleString('en')}<br>
                </div>
                <div>
                    <b>Recuperados: </b>${country.recovered.toLocaleString('en')}<br>
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
                        <td>${country.cases.toLocaleString('en')}</td>
                    </tr>
                    <tr>
                        <td><b>Nuevos hoy</b></td>
                        <td>${country.todayCases.toLocaleString('en')}</td>
                    </tr>
                    <tr>
                        <td><b>Muertes</b></td>
                        <td>${country.deaths.toLocaleString('en')}</td>
                    </tr>
                    <tr>
                        <td><b>Muertes hoy</b></td>
                        <td>${country.todayDeaths.toLocaleString('en')}</td>
                    </tr>
                    <tr>
                        <td><b>Recuperados</b></td>
                        <td>${country.recovered.toLocaleString('en')}</td>
                    </tr>
                    <tr>
                        <td><b>Activos</b></td>
                        <td>${country.active.toLocaleString('en')}</td>
                    </tr>
                    <tr>
                        <td><b>Críticos</b></td>
                        <td>${country.critical.toLocaleString('en')}</td>
                    </tr>
                    <tr>
                        <td><b>Casos/millón</b></td>
                        <td>${country.casesPerOneMillion.toLocaleString('en')}</td>
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

function updateInfoCards(globalData, countriesData) {
    const tblCountryCases = document.getElementById('countryCasesTable');
    const divLastUpdated = document.getElementById('lastUpdated');
    const divGlobalConfirmedCases = document.getElementById('globalConfirmedCases');
    const divGlobalActiveCases = document.getElementById('globalActiveCases');
    const divGlobalRecovered = document.getElementById('globalRecovered');
    const divGlobalDeaths = document.getElementById('globalDeaths');

    countriesData.forEach((country, i) => {
        const tdPosicion = document.createElement('td');
        const tdPais = document.createElement('td');
        const tdCasos = document.createElement('td');

        tdPosicion.textContent = i + 1;
        tdPais.textContent = country.country;
        tdCasos.textContent = country.cases.toLocaleString('en');

        const tr = document.createElement('tr');
        tr.appendChild(tdPosicion);
        tr.appendChild(tdPais);
        tr.appendChild(tdCasos);

        tr.addEventListener('click', evt => {
            const country = evt.currentTarget.children[1].textContent;
            closeAllInfoWindows();
            google.maps.event.trigger(markers[country], 'click');
        });

        tblCountryCases.appendChild(tr);
    });

    divLastUpdated.textContent = new Date(globalData.updated).toLocaleString('es-us', { hour12: true });
    divGlobalConfirmedCases.textContent = globalData.cases.toLocaleString('en');
    divGlobalActiveCases.textContent = globalData.active.toLocaleString('en');
    divGlobalRecovered.textContent = globalData.recovered.toLocaleString('en');
    divGlobalDeaths.textContent = globalData.deaths.toLocaleString('en');
}

function addCountryMarkers(countriesData, map) {
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

        markers[country.country] = marker;
        marker.addListener('click', () => {
            closeAllInfoWindows();
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

        objInfoWindows[country.country] = infoWindow;
    }
}

function closeAllInfoWindows() {
    for (const infoWinKey in objInfoWindows) {
        objInfoWindows[infoWinKey].close();
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
