import { FirebaseDB } from './firebaseDB.js';
import util from './util.js';

if (!localStorage.getItem('user_id')) {
    localStorage.setItem('user_id', util.uuid());
}
const userId = localStorage.getItem('user_id');

const btnStopSpying = document.getElementById('btnStopSpying');

window.addEventListener('beforeunload', evt => {
    evt.preventDefault();
    evt.returnValue = '';
    FirebaseDB.db.collection('user_locations').doc(userId).delete();
});
window.addEventListener('unload', evt => {
    evt.preventDefault();
    evt.returnValue = '';
    FirebaseDB.db.collection('user_locations').doc(userId).delete();
});

if (navigator.geolocation) {
    function sharePosition() {
        navigator.geolocation.getCurrentPosition(pos => {
            FirebaseDB.db.collection('user_locations').doc(userId).set({
                lat: pos.coords.latitude,
                lng: pos.coords.longitude
            });
        });
    }

    sharePosition();
    setInterval(() => {
        sharePosition();
    }, 2000);
}