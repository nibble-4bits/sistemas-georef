let divPaises = document.getElementById('paises');

fetch('../datos.json')
    .then(res => {
        res.json().then(paises => {
            paises.forEach(pais => {
                let pNombre = document.createElement('p');
                pNombre.textContent = `País: ${pais.country}, casos: ${pais.cases}`;
                divPaises.appendChild(pNombre);
            });
        })
    })
    .catch(err => {
        console.log(err);
    });