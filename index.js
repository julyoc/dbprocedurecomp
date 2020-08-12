const { app, BrowserWindow, screen, ipcMain } = require('electron');
const { join } = require('path');
const { Client } = require('pg');
const { user, password, database, host } = require('./env.json');

const pgcli = new Client({
    user,
    password,
    database,
    host
});
var createWindow = () => {
    var mainWin = new BrowserWindow({
        width: screen.getPrimaryDisplay().size.width,
        height: screen.getPrimaryDisplay().size.height,
        webPreferences: {
            preload: join(__dirname, 'preload.js')
        }
    });
    global.mainWin = mainWin;
    mainWin.loadFile('index.html');
    mainWin.webContents.openDevTools();
}
app.whenReady().then(() => {
    pgcli.connect().then(() => {
        createWindow();
        app.on('activate', () => {
            if (BrowserWindow.getAllWindows().length === 0) createWindow();
        });
    });
});

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit()
        pgcli.end();
    };
});

var saveData = (num, ...args) => {
    console.time('loop:');
    let start = new Date().getTime();
    for (let i = 0; i < num; i++) {
        pgcli.query('insert into usuario (nombre_user, apellido_user, cedula_user, fechanac_user, mail_user) values ($1, $2, $3, $4, $5)', args, (err, res) => {
            if (err) throw err;
        });
    }
    console.timeEnd('loop:');
    let end = new Date().getTime();
    return end - start;
};
var saveDataProcess = (num, ...args) => {
    console.time('loop procedure:');
    let start = new Date().getTime();
    for (let i = 0; i < num; i++) {
        pgcli.query('call saveusr ($1, $2, $3, $4, $5)', args, (err, res) => {
            if (err) throw err;
        });
    }
    console.timeEnd('loop procedure:');
    let end = new Date().getTime();
    return end - start;
}
var getall = () => {
    return pgcli.query('select * from usuario');
}

ipcMain.on('getall', (event, args) => {
    getall().then(value => {
        event.sender.send('data', value.rows);
    }).catch(err => {if (err) throw err});
});

ipcMain.on('saveData', (event, args) => {
    event.sender.send('t', saveData(...args));
})
ipcMain.on('saveDataProcess', (event, args) => {
    event.sender.send('td', saveDataProcess(...args));
});