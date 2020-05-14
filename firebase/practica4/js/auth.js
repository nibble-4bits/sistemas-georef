const loginForm = document.getElementById('loginForm');
const signupForm = document.getElementById('signupForm');
const btnSalir = document.getElementById('btnSalir');

auth.onAuthStateChanged(user => {
    if (user) {
        showAccountInfo(user);
        db.collection('usuarios').onSnapshot(snapshot => {
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
    else {
        showGames();
    }
    updateNavbar(user);
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
                M.toast({html: 'Usuario no encontrado.'})
                break;
            case 'auth/wrong-password':
                M.toast({html: 'La contraseña introducida es incorrecta.'})
                break;
            default:
                M.toast({html: 'Ha ocurrido un error.'})
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
                M.toast({html: 'Contraseña insegura. Su contraseña debe contener al menos 6 carácteres'})
                break;
            case 'auth/email-already-in-use':
                M.toast({html: 'El correo que está intentando utilizar ya ha sido registrado.'})
                break;
            default:
                M.toast({html: 'Ha ocurrido un error.'})
                break;
        }
    }
});

btnSalir.addEventListener('click', async e => {
    e.preventDefault();

    await auth.signOut();
    alert('salio')
});
