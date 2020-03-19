db.collection('productos').onSnapshot(snapshot => {
    let changes = snapshot.docChanges();    

    changes.forEach(change => {
        if (change.type === 'added' || change.type === 'modified') {
            renderProductos(change.doc);
        }
        else if (change.type === 'removed') {
            tabla.removeChild(document.getElementById(change.doc.id));
        }
    });
});