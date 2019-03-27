const { ipcRenderer } = require('electron');

const deleteListItem = (index) => {
  console.log(`deleteListItem(${index})`);
  ipcRenderer.send('delete-list-item', index);
};

document.getElementById('create').addEventListener('click', () => {
  ipcRenderer.send('add-new-list')
});

ipcRenderer.on('list', (event, list) => {
  const shoppingList = document.getElementById('ListItem');

  const listItems = list.reduce((html, list) => {
    html += `<li class="listItem"><span>${list.name}</span> <span>${list.qnt}</span></li>`;

    return html
  }, '');

  shoppingList.innerHTML = listItems;

  shoppingList.querySelectorAll('.listItem').forEach((item, index) => {
    item.addEventListener('click', () => deleteListItem(index))
  })
});

ipcRenderer.on('list', (event, list) => {
  console.log(list);
});
