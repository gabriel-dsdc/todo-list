function createItem() {
  const userInput = document.getElementById('texto-tarefa');
  const newItem = document.createElement('li');
  newItem.innerText = userInput.value;
  document.getElementById('lista-tarefas').appendChild(newItem);
  userInput.value = '';
}
document.getElementById('criar-tarefa').addEventListener('click', createItem);
