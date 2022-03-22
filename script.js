function createItem() {
  const userInput = document.getElementById('texto-tarefa');
  const newItem = document.createElement('li');
  newItem.innerText = userInput.value;
  document.getElementById('lista-tarefas').appendChild(newItem);
  userInput.value = '';
}

document.addEventListener('click', (event) => {
  const clicked = event.target;
  if (clicked.id === 'criar-tarefa') {
    createItem();
  }
  if (clicked.tagName === 'LI') {
    clicked.style.backgroundColor = 'gray';
  }
}, false);
