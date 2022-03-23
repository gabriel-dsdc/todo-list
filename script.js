function createItem() {
  const userInput = document.getElementById('texto-tarefa');
  const newItem = document.createElement('li');
  newItem.innerText = userInput.value;
  document.getElementById('lista-tarefas').appendChild(newItem);
  userInput.value = '';
}

function resetBackgroundColor() {
  const allItems = document.getElementById('lista-tarefas').getElementsByTagName('li');
  Object.keys(allItems).forEach((key) => {
    allItems[key].style.backgroundColor = null;
  });
}

document.addEventListener('click', (event) => {
  const clicked = event.target;
  if (clicked.id === 'criar-tarefa') {
    createItem();
  }
  if (clicked.tagName === 'LI') {
    resetBackgroundColor();
    clicked.style.backgroundColor = 'gray';
  }
  if (clicked.id === 'apaga-tudo') {
    document.getElementById('lista-tarefas').innerHTML = null;
  }
}, false);

document.addEventListener('dblclick', (event) => {
  const clicked = event.target;
  if (clicked.tagName === 'LI' && clicked.classList.contains('completed') !== true) {
    clicked.classList.add('completed');
  } else {
    clicked.classList.remove('completed');
  }
}, false);
