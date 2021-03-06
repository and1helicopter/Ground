const electron = require('electron');
const app = electron.app;

const path = require('path');
const url = require('url');

const BrowserWindow = electron.BrowserWindow;

var mainWindow;
app.on('ready',function(){
    mainWindow = new BrowserWindow({width: 1024, height: 768, webPreferences: {
        plugins: true,
        nodeIntegration: false // also, look at the preload option
      }});
    mainWindow.loadURL(url.format({
        pathname: path.join(__dirname, 'index.html'),
        protocol: 'file',
        slashes: true
    }));
});
app.on('window-all-closed', app.quit);

