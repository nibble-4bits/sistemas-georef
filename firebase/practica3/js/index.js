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