function renderProductos(doc) {
    let tr = document.createElement('tr');
    let spanNombre = document.createElement('span');
    let spanCodigo = document.createElement('span');
    let btnBorrar = document.createElement('button');
    let btnEditar = document.createElement('button');
    let trashIcon = document.createElement('i');
    let editIcon = document.createElement('i');
    let inputNombre = document.createElement('input');
    let inputCodigo = document.createElement('input');
    let td1 = document.createElement('td');
    let td2 = document.createElement('td');
    let td3 = document.createElement('td');
    let td4 = document.createElement('td');

    spanNombre.textContent = doc.data().nombre;
    spanCodigo.textContent = doc.data().codigo;

    trashIcon.className = 'far fa-trash-alt';
    btnBorrar.appendChild(trashIcon);

    editIcon.className = 'far fa-check-circle';
    btnEditar.appendChild(editIcon);

    btnBorrar.className = 'btn btn-danger';
    btnBorrar.addEventListener('click', evt => {
        db.collection('productos').doc(doc.id).delete();
    });

    btnEditar.className = 'btn btn-warning';
    btnEditar.disabled = true;
    btnEditar.addEventListener('click', evt => {
        btnEditar.disabled = true;

        db.collection('productos').doc(doc.id).update({
            nombre: inputNombre.value,
            codigo: inputCodigo.value
        });

        spanNombre.textContent = inputNombre.value;
        spanCodigo.textContent = inputCodigo.value;

        td1.replaceChild(spanNombre, inputNombre);
        td2.replaceChild(spanCodigo, inputCodigo);
    });

    td1.appendChild(spanNombre);
    td2.appendChild(spanCodigo);
    td3.appendChild(btnBorrar);
    td4.appendChild(btnEditar);

    td1.onclick = td2.onclick = evt => {
        inputNombre.type = 'text';
        inputCodigo.type = 'text';

        inputNombre.value = spanNombre.textContent;
        inputCodigo.value = spanCodigo.textContent;

        inputNombre.className = 'form-control text-center';
        inputCodigo.className = 'form-control text-center';

        td1.replaceChild(inputNombre, spanNombre);
        td2.replaceChild(inputCodigo, spanCodigo);

        inputNombre.focus();

        btnEditar.disabled = false;
    };

    tr.id = doc.id;

    tr.appendChild(td1);
    tr.appendChild(td2);
    tr.appendChild(td3);
    tr.appendChild(td4);

    if (document.querySelector(`#${doc.id}`)) {
        tabla.replaceChild(tr, document.querySelector(`#${doc.id}`));
    } 
    else {
        tabla.appendChild(tr);
    }
}