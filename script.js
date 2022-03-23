const list = document.getElementById('lista-tarefas');
const allItems = list.getElementsByTagName('li');
list.innerHTML = localStorage.getItem('savedTasks');

function createItem() {
  const userInput = document.getElementById('texto-tarefa');
  const newItem = document.createElement('li');
  newItem.innerText = userInput.value;
  list.appendChild(newItem);
  userInput.value = '';
}

function resetSelected() {
  Object.keys(allItems).forEach((key) => {
    allItems[key].classList.remove('selected');
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

function taskSelector(event) {
  const clicked = event.target;
  if (clicked.tagName === 'LI' && clicked.classList.contains('selected') !== true) {
    resetSelected();
    clicked.classList.add('selected');
  } /* else {
      resetSelected();
    } */
}

function findCurrentSelected() {
  for (let index = 0; index < allItems.length; index += 1) {
    if (allItems[index].classList.contains('selected')) {
      return index;
    }
  }
}

function moveUp(event) {
  const clicked = event.target;
  if (clicked.id === 'mover-cima') {
    const index = findCurrentSelected();

    if (index - 1 >= 0) {
      const position = allItems[index].innerHTML;
      allItems[index].innerHTML = allItems[index - 1].innerHTML;
      allItems[index - 1].innerHTML = position;

      const pClass = allItems[index].className;
      allItems[index].className = allItems[index - 1].className;
      allItems[index - 1].className = pClass;
    }
  }
}

function moveDown(event) {
  const clicked = event.target;
  if (clicked.id === 'mover-baixo') {
    const index = findCurrentSelected();

    if (index + 1 < allItems.length) {
      const position = allItems[index].innerHTML;
      allItems[index].innerHTML = allItems[index + 1].innerHTML;
      allItems[index + 1].innerHTML = position;

      const pClass = allItems[index].className;
      allItems[index].className = allItems[index + 1].className;
      allItems[index + 1].className = pClass;
    }
  }
}

function moveTask(event) {
  moveUp(event);
  moveDown(event);
}

function removeSelected(event) {
  const clicked = event.target;
  if (clicked.id === 'remover-selecionado') {
    const index = findCurrentSelected();
    list.removeChild(allItems[index]);
  }
}

function otherListFeatures(event) {
  taskRemover(event);
  taskSelector(event);
  moveTask(event);
  removeSelected(event);
}

document.addEventListener('click', (event) => {
  const clicked = event.target;
  if (clicked.id === 'criar-tarefa') {
    createItem();
  } else if (clicked.id === 'salvar-tarefas') {
    localStorage.setItem('savedTasks', list.innerHTML);
  } else {
    otherListFeatures(event);
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
