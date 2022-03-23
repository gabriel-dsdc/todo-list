const list = document.getElementById('lista-tarefas');
list.innerHTML = localStorage.getItem('savedTasks');

function createItem() {
  const userInput = document.getElementById('texto-tarefa');
  const newItem = document.createElement('li');
  newItem.innerText = userInput.value;
  list.appendChild(newItem);
  userInput.value = '';
}

function resetBackgroundColor() {
  const allItems = list.getElementsByTagName('li');
  Object.keys(allItems).forEach((key) => {
    allItems[key].style.backgroundColor = null;
  });
}

function removeFinishedTasks() {
  const allFinished = list.querySelectorAll('.completed');
  Object.keys(allFinished).forEach((key) => {
    list.removeChild(allFinished[key]);
  });
}

function taskRemover(event) {
  const clicked = event.target;
  if (clicked.id === 'apaga-tudo') {
    list.innerHTML = null;
  }
  if (clicked.id === 'remover-finalizados') {
    removeFinishedTasks();
  }
}

document.addEventListener('click', (event) => {
  const clicked = event.target;
  if (clicked.id === 'criar-tarefa') {
    createItem();
  } else if (clicked.id === 'salvar-tarefas') {
    localStorage.setItem('savedTasks', list.innerHTML);
  } else if (clicked.tagName === 'LI') {
    resetBackgroundColor();
    clicked.style.backgroundColor = 'gray';
  } else {
    taskRemover(event);
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
