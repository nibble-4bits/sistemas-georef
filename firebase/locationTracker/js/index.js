import { FirebaseDB } from './firebaseDB.js';
import util from './util.js';

if (!localStorage.getItem('user_id')) {
    localStorage.setItem('user_id', util.uuid());
}

if (navigator.geolocation) {
    function sharePosition() {
        navigator.geolocation.getCurrentPosition(pos => {
            const userId = localStorage.getItem('user_id');
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

const firebaseDB = new FirebaseDB();
firebaseDB.init();