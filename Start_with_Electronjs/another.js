const remote = require('electron').remote;
const main = remote.require('./main.js');

let button = document.createElement('button');
button.textContent = 'Switch Windows';
button.addEventListener('click', ()=>{
  let win = remote.getCurrentWindow();
  main.openWindow('index');
  win.close();
}, false);
document.body.appendChild(button);