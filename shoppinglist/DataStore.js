const Store = require('electron-store');

class DataStore extends Store {
  constructor(settings, webContents) {
    super(settings);

    this.list = [];
    this.webContents = webContents;
  }

  saveList() {
    this.set('list', this.list);
  }

  getList() {
    this.list = this.get('list') || [];
    this.webContents.send('list', this.list);
  }

  addItem(item) {
    this.list = [...this.list, item];
    this.saveList();
    this.webContents.send('list', this.list);
  }

  deleteItem(index) {
    this.list.splice(index, 1);
    this.saveList();
    this.webContents.send('list', this.list);
  }
}

module.exports = DataStore;
