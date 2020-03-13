import { FirebaseDB } from './firebaseDB.js';
import util from './util.js';

const firebaseDB = new FirebaseDB();
firebaseDB.init();

if (!localStorage.getItem('user_id')) {
    localStorage.setItem('user_id', util.uuid());
}
const userId = localStorage.getItem('user_id');

window.addEventListener('beforeunload', evt => {
    firebaseDB.db.collection('user_locations').doc(userId).delete();
});

if (navigator.geolocation) {
    function sharePosition() {
        navigator.geolocation.getCurrentPosition(pos => {
            firebaseDB.db.collection('user_locations').doc(userId).set({
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