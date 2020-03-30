"use strict";

const BASE_API_URL = "https://corona.lmao.ninja";

async function initMap() {
  const props = {
    center: {
      lat: 15,
      lng: 0
    },
    zoom: 2
  };
  const map = new google.maps.Map(document.getElementById("map"), props);
  let globalData = null;
  let countriesData = null;

  await showModal("#modalLoading");
  try {
    const globalRes = await fetch(`${BASE_API_URL}/all`);
    globalData = await globalRes.json();
    cacheAPIData("globalData", globalData);

    const countriesRes = await fetch(`${BASE_API_URL}/countries`);
    countriesData = await countriesRes.json();
    cacheAPIData("countryData", countriesData);

    await hideModal("#modalLoading");
  } catch (error) {
    globalData = retrieveCachedAPIData("globalData");
    countriesData = retrieveCachedAPIData("countryData");
    await hideModal("#modalLoading");
    if (!globalData || !countriesData) {
      await showModal("#modalError");
    }
  }

  updateInfoCards(globalData);
  addCountryMarkers(countriesData, map);
}

function generateCountryInfoHTML(country) {
  return `
        <div style="width: 12em;">
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
        <div style="width: 12em;" class="googleMapRightControl">
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
                <div class="col-12">
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
function MakeControl(controlDiv, country) {
  // Set up the control border.
  var controlUI = document.createElement("div");
  controlUI.title = country.country;
  controlUI.className = "controlUI";
  controlDiv.appendChild(controlUI);

  // Set up the inner control.
  var controlText = document.createElement("div");
  controlText.innerHTML = generateFullCountryInfoHTML(country);
  controlText.className = "controlText";
  controlUI.appendChild(controlText);
}

function cacheAPIData(key, jsonData) {
  localStorage.setItem(key, JSON.stringify(jsonData));
}

function retrieveCachedAPIData(key) {
  return JSON.parse(localStorage.getItem(key));
}

function updateInfoCards(globalData) {
  const divLastUpdated = document.getElementById("lastUpdated");
  const divGlobalConfirmedCases = document.getElementById(
    "globalConfirmedCases"
  );
  const divGlobalRecovered = document.getElementById("globalRecovered");
  const divGlobalDeaths = document.getElementById("globalDeaths");

  divLastUpdated.textContent = new Date(
    globalData.updated
  ).toLocaleString("es-us", { hour12: true });
  divGlobalConfirmedCases.textContent = globalData.cases.toLocaleString();
  divGlobalRecovered.textContent = globalData.recovered.toLocaleString();
  divGlobalDeaths.textContent = globalData.deaths.toLocaleString();
}

function addCountryMarkers(countriesData, map) {
  let arrInfoWindows = [];
  const icon = {
    url: "https://image.flaticon.com/icons/png/128/2659/2659980.png",
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
      position: new google.maps.LatLng(
        country.countryInfo.lat,
        country.countryInfo.long
      ),
      title: `${country.country}`
    });
    marker.addListener("click", () => {
      let fullInfoWindow = setInterval(function() {
        if (!infoWindow.getMap()) {
          clearInterval(fullInfoWindow);
          if (
            map.controls[google.maps.ControlPosition.RIGHT_CENTER].length != 0
          ) {
            console.log(map.controls[google.maps.ControlPosition.RIGHT_CENTER]);
            map.controls[google.maps.ControlPosition.RIGHT_CENTER].i[0] =
              map.controls[google.maps.ControlPosition.RIGHT_CENTER].i[1];

            map.controls[google.maps.ControlPosition.RIGHT_CENTER].pop();
            console.log(
              map.controls[google.maps.ControlPosition.RIGHT_CENTER].i[1]
            );
          }
        }
      }, 300);
      for (const infoWin of arrInfoWindows) {
        infoWin.close();
      }
      infoWindow.open(map, marker);
      var divName = document.createElement("div");
      new MakeControl(divName, country);
      map.controls[google.maps.ControlPosition.RIGHT_CENTER].push(divName);
    });

    arrInfoWindows.push(infoWindow);
  }
}

async function showModal(modalId) {
  $(modalId).modal("show");
  return new Promise((resolve, reject) => {
    $(modalId).on("shown.bs.modal", evt => {
      resolve();
    });
  });
}

async function hideModal(modalId) {
  $(modalId).modal("hide");
  return new Promise((resolve, reject) => {
    $(modalId).on("hidden.bs.modal", evt => {
      resolve();
    });
  });
}
