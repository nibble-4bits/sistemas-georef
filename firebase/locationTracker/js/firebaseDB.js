class FirebaseDB {
    constructor() {
        this.db = null;
    }

    init() {
        firebase.initializeApp({
            apiKey: "AIzaSyCYVULfajsxYfUrUmspWsUo3f7y03T7hjs",
            authDomain: "location-tracker-65746.firebaseapp.com",
            databaseURL: "https://location-tracker-65746.firebaseio.com",
            projectId: "location-tracker-65746",
            storageBucket: "location-tracker-65746.appspot.com",
            messagingSenderId: "676486729818",
            appId: "1:676486729818:web:f1cde92f3889d45a2e8863"
        });

        this.db = firebase.firestore();
        this.markers = {};
        this.__addOnSnapshotListener();
    }

    __addOnSnapshotListener() {
        this.db.collection('user_locations').onSnapshot(snapshot => {
            snapshot.docChanges().forEach(change => {
                const doc = change.doc.data();
                let coords = new globalThis.google.maps.LatLng(doc.lat, doc.lng);

                if (change.type === 'added') {
                    let icon = {
                        url: 'https://cdn1.iconfinder.com/data/icons/Map-Markers-Icons-Demo-PNG/256/Map-Marker-Ball-Pink.png',
                        scaledSize: new globalThis.google.maps.Size(48, 48),
                        origin: new globalThis.google.maps.Point(0, 0)
                    };

                    let marker = new globalThis.google.maps.Marker({
                        position: coords,
                        map: globalThis.map,
                        icon
                    });

                    this.markers[change.doc] = marker;
                }
                else if (change.type === 'modified') {
                    this.markers[change.doc].setPosition(coords);
                }
                else if (change.type === 'removed') {
                    this.markers[change.doc].setMap(null);
                }
            });
        });
    }
}

export { FirebaseDB };