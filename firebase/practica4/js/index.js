// Initialize Firebase
firebase.initializeApp({
    apiKey: "AIzaSyCG4q9U4dYeTcZdDp77iIa5wsOTGvXS4Ck",
    authDomain: "sistemasgeo-oauth.firebaseapp.com",
    databaseURL: "https://sistemasgeo-oauth.firebaseio.com",
    projectId: "sistemasgeo-oauth",
    storageBucket: "sistemasgeo-oauth.appspot.com",
    messagingSenderId: "946167290542",
    appId: "1:946167290542:web:2d2976e65ea18ce222ab3f"
});

let modalElems = document.querySelectorAll('.modal');
M.Modal.init(modalElems, {});
let sideNavElems = document.querySelectorAll('.sidenav');
M.Sidenav.init(sideNavElems, {});

const auth = firebase.auth();
const db = firebase.firestore();

let map = null;
let watchPositionId = null;

function initMap() {
    const mapProps = {
        center: { lat: 21.13, lng: -101.68 },
        zoom: 13
    };

    map = new google.maps.Map(document.getElementById('map'), mapProps);
}

async function showAccountInfo(user) {
    let html;

    const userInfo = await db.collection('usuarios').doc(user.uid).get();
    html = `
        <p>Nombre: ${userInfo.data().name}</p>
        <p>Correo: ${user.email}</p>
        <p>Teléfono: ${userInfo.data().phone}</p>
        <p>Dirección: ${userInfo.data().address}</p>
    `;

    accountInfo.innerHTML = html;
}

function updateNavbar(user) {
    if (user) {
        document.querySelectorAll('.logged-out').forEach(el => {
            el.style.display = 'none';
        });
        document.querySelectorAll('.logged-in').forEach(el => {
            el.style.display = 'block';
        });
    }
    else {
        document.querySelectorAll('.logged-out').forEach(el => {
            el.style.display = 'block';
        });
        document.querySelectorAll('.logged-in').forEach(el => {
            el.style.display = 'none';
        });
    }
}

function sharePosition(user) {
    if (navigator.geolocation) {
        watchPositionId = navigator.geolocation.watchPosition(
            pos => {
                db.collection('usuarios').doc(user.uid).update({
                    lat: pos.coords.latitude,
                    lng: pos.coords.longitude,
                    lastConnection: new Date().getTime()
                });
            },
            error => {
                console.log(error);
            },
            { enableHighAccuracy: true, timeout: 2000, maximumAge: 5000 }
        );
    }
}

function clearWatch() {
    if (navigator.geolocation) {
        navigator.geolocation.clearWatch(watchPositionId);
    }
}