const loginForm = document.getElementById('loginForm');
const signupForm = document.getElementById('signupForm');
const btnSalir = document.getElementById('btnSalir');

const authType = {
    EMAIL: 1,
    GOOGLE: 2
}
let currentAuth;

auth.onAuthStateChanged(user => {
    if (user) {
        showAccountInfo(user);
        db.collection('juegos').onSnapshot(snapshot => {
            showGames(snapshot.docs);
        });
    }
    else {
        showGames();
    }
    updateNavbar(user);
});

loginForm.addEventListener('submit', async function (e) {
    e.preventDefault();

    currentAuth = authType.EMAIL;

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

async function loginGoogleOAuth() {
    currentAuth = authType.GOOGLE;
    const provider = new firebase.auth.GoogleAuthProvider();
    const res = await firebase.auth().signInWithPopup(provider);

    M.Modal.getInstance(document.querySelector('#modalIngresar')).close();
    loginForm.reset();
}