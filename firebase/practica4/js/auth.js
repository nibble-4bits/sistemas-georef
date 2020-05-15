let markers = {};

auth.onAuthStateChanged(user => {
    updateNavbar(user);

    if (user) {
        mapContainer.innerHTML = null;
        gmaps.src = 'https://maps.googleapis.com/maps/api/js?key=AIzaSyADjOfdGIg-7JiqjoTstMN9el4g-nLhxxA&callback=initMap';
        showAccountInfo(user);
        sharePosition(user);

        db.collection('usuarios').onSnapshot(snapshot => {
            snapshot.docChanges().forEach(change => {
                const doc = change.doc.data();
                let coords = new google.maps.LatLng(doc.lat, doc.lng);
                let iconUrl = new Date().getTime() > doc.lastConnection + 60000 ?
                    'https://cdn1.iconfinder.com/data/icons/Map-Markers-Icons-Demo-PNG/256/Map-Marker-Ball-Pink.png' :
                    'https://segat.gob.pe/images/marker_router.png';

                const marker = new google.maps.Marker({
                    position: coords,
                    map: map,
                    icon: {
                        url: iconUrl,
                        scaledSize: new google.maps.Size(40, 40),
                        origin: new google.maps.Point(0, 0)
                    }
                });

                if (change.type === 'added') {
                    markers[user.uid] = marker;
                    const infoWindow = new google.maps.InfoWindow({
                        content: doc.name
                    });
                    infoWindow.open(map, marker);
                }
                else if (change.type === 'modified') {
                    markers[user.uid].setPosition(coords);
                }
                else if (change.type === 'removed') {
                    markers[user.uid].setMap(null);
                }
            });
        });
    }
    else {
        clearWatch();
        gmaps.src = '';
        mapContainer.innerHTML = null;
        mapContainer.innerHTML = '<h4 class="center-align">Ingrese para ver el mapa de rastreados</h4>';
    }
});

loginForm.addEventListener('submit', async function (e) {
    e.preventDefault();

    const email = this['email'].value;
    const password = this['password'].value;

    try {
        const creds = await auth.signInWithEmailAndPassword(email, password);

        M.Modal.getInstance(document.querySelector('#modalIngresar')).close();
        this.reset();
    } catch (err) {
        switch (err.code) {
            case 'auth/user-not-found':
                M.toast({ html: 'Usuario no encontrado.' })
                break;
            case 'auth/wrong-password':
                M.toast({ html: 'La contraseña introducida es incorrecta.' })
                break;
            default:
                M.toast({ html: 'Ha ocurrido un error.' })
                break;
        }
    }
});

signupForm.addEventListener('submit', async function (e) {
    e.preventDefault();

    const email = this['remail'].value;
    const password = this['rpassword'].value;

    try {
        const creds = await auth.createUserWithEmailAndPassword(email, password);
        await db.collection('usuarios').doc(creds.user.uid).set({
            name: signupForm['rname'].value,
            phone: signupForm['rphone'].value,
            address: signupForm['raddress'].value,
        });

        M.Modal.getInstance(document.querySelector('#modalRegistrate')).close();
        this.reset();
    } catch (err) {
        switch (err.code) {
            case 'auth/weak-password':
                M.toast({ html: 'Contraseña insegura. Su contraseña debe contener al menos 6 carácteres' })
                break;
            case 'auth/email-already-in-use':
                M.toast({ html: 'El correo que está intentando utilizar ya ha sido registrado.' })
                break;
            default:
                M.toast({ html: 'Ha ocurrido un error.' })
                break;
        }
    }
});

btnSalir.addEventListener('click', async e => {
    e.preventDefault();

    await auth.signOut();
    alert('Sesión cerrada')
});
