const form = document.querySelector('form');
const userInput = document.querySelector('#texto-tarefa');
const list = document.getElementById('lista-tarefas');
const allTasks = list.querySelectorAll('li');

function load() {
  list.innerHTML = localStorage.getItem('savedTasks');
  document.querySelectorAll('input[type=checkbox]').forEach((checkbox) => {
    checkbox.checked = checkbox.closest('li').classList.contains('completed');
  });
}

window.onload = load;

function resetSelected() {
  document.querySelectorAll('.selected').forEach((task) => {
    task.classList.remove('selected');
  });
}

function taskSelector(event) {
  const clicked = event.target.closest('li');
  if (clicked && !clicked.classList.contains('selected')) {
    resetSelected();
    clicked.classList.add('selected');
  }
}

function toggleCompleted(event) {
  const clicked = event.target.closest('li');
  if (clicked && !clicked.classList.contains('completed')) {
    clicked.classList.add('completed');
    clicked.querySelector('input[type=checkbox]').checked = true;
  } else if (clicked) {
    clicked.classList.remove('completed');
    clicked.querySelector('input[type=checkbox]').checked = false;
  }
}

function toggleCheckbox(event) {
  const clicked = event.target;
  if (clicked.type === 'checkbox') {
    const task = clicked.closest('li');
    clicked.checked && task.classList.add('completed');
    !clicked.checked && task.classList.remove('completed');
  }
}

function createTask(event) {
  event.preventDefault();
  const newItem = document.createElement('li');
  newItem.tabIndex = "0";
  list.appendChild(newItem);

  const newCheckbox = document.createElement('input');
  newCheckbox.type = 'checkbox';
  newCheckbox.tabIndex = '-1';
  newCheckbox.title = userInput.value.trim();
  newItem.appendChild(newCheckbox);

  const span = document.createElement('span');
  span.textContent = userInput.value.trim();
  newItem.appendChild(span);

  userInput.value = '';
}

function removeSelected() {
  const selected = document.querySelector('.selected');
  if (selected) {
    list.removeChild(selected);
  }
}

function removeFinishedTasks() {
  list.querySelectorAll('.completed').forEach((task) => {
    task.remove();
  });
}

function taskRemover(event) {
  const clicked = event.target;
  if (clicked.id === 'remover-selecionado') {
    removeSelected();
  }
  if (clicked.id === 'remover-finalizados') {
    removeFinishedTasks();
  }
  if (clicked.id === 'apaga-tudo') {
    list.innerHTML = '';
  }
}

function moveTaskUp() {
  const selected = document.querySelector('.selected');
  list.insertBefore(selected, selected.previousElementSibling);
}

function moveTaskDown() {
  const selected = document.querySelector('.selected');
  if (selected.nextElementSibling) {
    list.insertBefore(selected.nextElementSibling, selected);
  } else {
    list.insertBefore(selected, list.firstChild);
  }
}

function moveTask(event) {
  const clicked = event.target;
  if (clicked.id === 'mover-cima') {
    moveTaskUp();
  } else if (clicked.id === 'mover-baixo') {
    moveTaskDown();
  }
}

function otherListFeatures(event) {
  taskSelector(event);
  moveTask(event);
  taskRemover(event);
}

form.addEventListener('submit', (event) => {
  event.preventDefault();
  createTask(event);
});

document.addEventListener('click', (event) => {
  const clicked = event.target;
  if (clicked.id === 'salvar-tarefas') {
    localStorage.setItem('savedTasks', list.innerHTML);
    saveTasksBtn = document.querySelector('#salvar-tarefas')
    saveTasksBtn.textContent = 'Lista salva!';
    const notify = setTimeout(() => {
      saveTasksBtn.textContent = 'Salvar Lista';
      clearTimeout(notify);
    }, 1000);
  } else {
    otherListFeatures(event);
  }
}, false);
document.addEventListener('change', toggleCheckbox, false);
document.addEventListener('dblclick', toggleCompleted, false);
