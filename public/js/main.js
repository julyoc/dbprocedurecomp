
var update = () => {
    window.ipc.send('getall', []);
    window.ipc.on('data', (event, data) => {
        console.log(data);
        document.getElementById('rows').innerHTML = '';
        data.forEach(element => {
            document.getElementById('rows').innerHTML += `<tr>
        <th scope="row">${element.codigo_user}</th>
        <td>${element.nombre_user}</td>
        <td>${element.apellido_user}</td>
        <td>${element.fechanac_user.getDate() +'-'+ element.fechanac_user.getMonth() + '-' + element.fechanac_user.getFullYear()}</td>
        <td>${element.cedula_user}</td>
        <td>${element.mail_user}</td>
        </tr>`;
        });
    });
}
update();
var saveData = () => {
    alert('se enviaran los datos '.concat($('#numreg').val(), ' veces.'));
    window.ipc.send('saveData', [$('#numreg').val(), $('#nombre').val(), $('#apellido').val(), $('#cedula').val(), $('#fechanac').val(), $('#mail').val()]);
    window.ipc.on('t', (event, data) => {
        console.log(data);
        $('#t').text(data);
    });
    update();
}
var saveDataProcess = () => {
    alert('se enviaran los datos '.concat($('#numreg').val(), ' veces.'));
    window.ipc.send('saveDataProcess', [$('#numreg').val(), $('#nombre').val(), $('#apellido').val(), $('#cedula').val(), $('#fechanac').val(), $('#mail').val()]);
    window.ipc.on('td', (event, data) => {
        console.log(data);
        $('#tp').text(data);
    });
    update();
}