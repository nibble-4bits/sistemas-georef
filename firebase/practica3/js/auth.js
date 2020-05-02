const loginForm = document.getElementById('loginForm');
const signupForm = document.getElementById('signupForm');
const btnSalir = document.getElementById('btnSalir');

auth.onAuthStateChanged(user => {
    if (user) {
        showAccountInfo(user);
        db.collection('juegos').onSnapshot(snapshot => {
            showGames(snapshot.docs);
        });
    }
    else {
        showGames();
        showAccountInfo();
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
        console.error(err);
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
        console.error(err);
    }
});

btnSalir.addEventListener('click', async e => {
    e.preventDefault();

    await auth.signOut();
    alert('salio')
});

async function entrarGoogle() {
    const provider = new firebase.auth.GoogleAuthProvider();
    const res = await firebase.auth().signInWithPopup(provider);
    const token = res.credential.accessToken;
    console.log(token);
}