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

var elems = document.querySelectorAll('.modal');
var instances = M.Modal.init(elems, {});

const auth = firebase.auth();
const db = firebase.firestore();

async function showAccountInfo(user) {
    const accountInfo = document.getElementById('accountInfo');
    let html;

    if (currentAuth === authType.EMAIL) {
        const userInfo = await db.collection('usuarios').doc(user.uid).get();
        html = `
            <p>Nombre: ${userInfo.data().name}</p>
            <p>Correo: ${user.email}</p>
            <p>Teléfono: ${userInfo.data().phone}</p>
            <p>Dirección: ${userInfo.data().address}</p>
        `;
    }
    else if (currentAuth === authType.GOOGLE) {
        html = `
            <p>Nombre: ${user.displayName}</p>
            <p>Correo: ${user.email}</p>
            <img src="${user.photoURL}" />
        `;
    }
    accountInfo.innerHTML = html;
}

function updateNavbar(user) {
    if (user) {
        document.querySelectorAll('.logged-out').forEach(el => {
            el.hidden = true;
        });
        document.querySelectorAll('.logged-in').forEach(el => {
            el.hidden = false;
        });
    }
    else {
        document.querySelectorAll('.logged-out').forEach(el => {
            el.hidden = false;
        });
        document.querySelectorAll('.logged-in').forEach(el => {
            el.hidden = true;
        });
    }
}

async function showGames(data) {
    const gameList = document.getElementById('game-list');
    let html = '';

    if (data) {
        data.forEach(doc => {
            const col = `
                <div class="col s12 l6 xl4">
                    <img src="${doc.data().imagen}" alt="${doc.data().nombre}">
                    <p>${doc.data().nombre}</p>
                    <p>$${doc.data().precio}</p>
                </div>
            `;
            html += col;
        });
        gameList.innerHTML = html;
    }
    else {
        gameList.innerHTML = '<p>Ingrese para ver nuestro catálogo de videojuegos</p>';
    }
}