firebase.initializeApp({
    apiKey: "AIzaSyCYVULfajsxYfUrUmspWsUo3f7y03T7hjs",
    authDomain: "location-tracker-65746.firebaseapp.com",
    databaseURL: "https://location-tracker-65746.firebaseio.com",
    projectId: "location-tracker-65746",
    storageBucket: "location-tracker-65746.appspot.com",
    messagingSenderId: "676486729818",
    appId: "1:676486729818:web:f1cde92f3889d45a2e8863"
});

let db = firebase.firestore();
let markers = {};

class FirebaseDB {
    static addOnSnapshotListener() {
        db.collection('user_locations').onSnapshot(snapshot => {
            snapshot.docChanges().forEach(change => {
                const doc = change.doc.data();
                let coords = new globalThis.google.maps.LatLng(doc.lat, doc.lng);
                let iconUrl = null;

                if (localStorage.getItem('user_id') === change.doc.id) iconUrl = 'https://segat.gob.pe/images/marker_router.png';
                else iconUrl = 'https://cdn1.iconfinder.com/data/icons/Map-Markers-Icons-Demo-PNG/256/Map-Marker-Ball-Pink.png';

                let icon = {
                    url: iconUrl,
                    scaledSize: new globalThis.google.maps.Size(48, 48),
                    origin: new globalThis.google.maps.Point(0, 0)
                };

                let marker = new globalThis.google.maps.Marker({
                    position: coords,
                    map: globalThis.map,
                    icon
                });

                if (change.type === 'added') {
                    markers[change.doc] = marker;
                }
                else if (change.type === 'modified') {
                    markers[change.doc].setPosition(coords);
                }
                else if (change.type === 'removed') {
                    markers[change.doc].setMap(null);
                }
            });
        });
    }
}

FirebaseDB.db = db;

export { FirebaseDB };