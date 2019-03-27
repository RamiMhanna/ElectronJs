const { ipcRenderer } = require('electron');

document.getElementById('addListItem').addEventListener('submit', (evt) => {

  evt.preventDefault();

  const input = evt.target[0];
  const qntInput = document.getElementById('add-qnt');
  ipcRenderer.send('add-new-item', {name:input.value, qnt:qntInput.value});
  input.value = '';
  qntInput.value = '';
});

document.getElementById('option').addEventListener('click', () => {
  ipcRenderer.send('close-subWindow');
});


