let divPaises = document.getElementById('paises');
let urlCoronavirusAPI = 'https://corona.lmao.ninja/countries';

fetch(urlCoronavirusAPI)
    .then(res => {
        res.json().then(paises => {
            paises.forEach(pais => {
                let row = document.createElement('div');
                row.className = 'row border bg-light';
                divPaises.appendChild(row);

                let col = document.createElement('div');
                col.className = 'col-12';
                row.appendChild(col);

                let pNombre = document.createElement('p');
                pNombre.textContent = `País: ${pais.country}, casos: ${pais.cases}`;
                col.appendChild(pNombre);
            });
        })
    })
    .catch(err => {
        console.log(err);
    });