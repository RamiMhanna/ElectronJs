const {app, Menu, ipcMain, Notification} = require('electron');
const path = require('path');
const Window = require('./Window');
const DataStore = require('./DataStore');
let listData;
const fs = require('fs');
require('electron-reload')(__dirname);
let win;

function createWindow() {
  win = new Window({
    file: path.join(__dirname, 'index.html')
  });

  listData = new DataStore({name: 'ListData1'}, win.webContents);

  let addItemWin;
  let helpWindow;
  win.once('show', () => {
    listData.getList();
  });

  ipcMain.on('add-new-list', () => {
    if (!addItemWin) {
      addItemWin = new Window({
        file: path.join(__dirname, 'add.html'),
        width: 400,
        height: 200,
        frame: false,
        maximizable: false,
        parent: win
      });

      ipcMain.on('close-subWindow', () => {
        if (addItemWin !== null) {
          addItemWin.close();
        }
      });

      addItemWin.on('closed', () => {
        addItemWin = null
      });
    }
  });

  win.webContents.openDevTools();
  win.on('closed', () => {
    win = null;
  });

  //build the menu bar.
  let menu = Menu.buildFromTemplate([
    {
      label: 'menu',
      submenu: [
        {
          label: 'export', click() {
            win.webContents.printToPDF();
              fs.writeFile('/tmp/print.pdf');
          }
        },
        {
          label: 'import'
        },
        {
          label: 'print', click() {
            win.webContents.print();
          }
        },
        {
          label: 'exit', click() {
            app.quit();
          }
        }
      ]
    },
    {
      label: 'help', click() {
        if (!helpWindow) {
          helpWindow = new Window({
            file: path.join(__dirname, 'help.html'),
            width: 300,
            height: 300,
            frame: true,
            parent: win
          });

          helpWindow.on('closed', () => {
            helpWindow = null;
          });
        }
      }
    }
  ]);

  Menu.setApplicationMenu(menu);
}

ipcMain.on('add-new-item', (event, item) => {
  listData.addItem(item);
});

ipcMain.on('delete-list-item', (event, index) => {
  listData.deleteItem(index);
});

app.on('ready', createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (win === null) {
    createWindow();
  }
});
