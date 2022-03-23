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

function removeFinishedTasks(list) {
  const allFinished = list.querySelectorAll('.completed');
  Object.keys(allFinished).forEach((key) => {
    list.removeChild(allFinished[key]);
  });
}

document.addEventListener('click', (event) => {
  const clicked = event.target;
  const list = document.getElementById('lista-tarefas');
  if (clicked.id === 'criar-tarefa') {
    createItem();
  }
  if (clicked.tagName === 'LI') {
    resetBackgroundColor();
    clicked.style.backgroundColor = 'gray';
  }
  if (clicked.id === 'apaga-tudo') {
    list.innerHTML = null;
  }
  if (clicked.id === 'remover-finalizados') {
    removeFinishedTasks(list);
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
