let localList = [];
const addTask = () => {
  const task = {
    description: 'coding',
    completed: false,
    index: localList.length + 1,
  };
  document.body.innerHTML = '<div>' + '  <div class="tasks"></div>' + '</div>';
  const tasks = document.querySelector('.tasks');
  const taskElement = document.createElement('div');
  taskElement.classList.add('task');
  taskElement.setAttribute('id', task.index);
  tasks.appendChild(taskElement);
  localList.push(task);
  localStorage.setItem('tasks', JSON.stringify(localList));
  const myTasks = document.querySelectorAll('.task');
  return myTasks;
};

const updateLocal = () => {
  const div = document.querySelector('.task');
  const key = Number(div.id);
  const localData = localList;
  localData[key - 1].description = 'play football';
  const editedTask = localData[key - 1].description;
  localStorage.setItem('tasks', JSON.stringify(localData));
  return editedTask;
};

const deleteData = () => {
  const div = document.querySelector('.task');
  const key = div.id;
  const filtered = localList.filter((item) => item.index !== key);
  localStorage.setItem('tasks', JSON.stringify(filtered));
  div.remove();
  const divs = document.querySelectorAll('.task');
  return divs;
};

const Mark = () => {
  const div = document.querySelector('.task');
  const key = div.id;
  const localData = localList;
  localData[key - 1].completed = true;
  const completedStatus = localData[key - 1].completed;
  localStorage.setItem('tasks', JSON.stringify(localData));
  return completedStatus;
};

const deletAll = () => {
  const div = document.querySelector('.task');
  const key = div.id;
  const localData = localList;
  const filtered = localData.filter((item) => item.completed === false);
  localStorage.setItem('tasks', JSON.stringify(filtered));
  const completedStatus = localData[key - 1].completed;
  if (completedStatus === true) {
    div.remove();
  }
  const divs = document.querySelectorAll('.task');
  return divs;
};

module.exports = {
  edit: updateLocal,
  add: addTask,
  delete: deleteData,
  complete: Mark,
  clear: deletAll,
};
