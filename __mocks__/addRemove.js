let localList=[]
const addTask = () => {
  const task = {
    description: 'coding',
    completed: false,
    index: 1,
  };
  document.body.innerHTML = '<div>' + '  <div class="tasks"></div>' + '</div>';
  const tasks = document.querySelector('.tasks');
  const taskElement = document.createElement('div');
  taskElement.classList.add('task');
  taskElement.setAttribute('id', task.index);
  tasks.appendChild(taskElement);
  localList.push(task)
  localStorage.setItem('tasks', JSON.stringify(localList));
  const myTasks = document.querySelectorAll('.task');
  return myTasks;
};

const deleteData = () => {
  const div = document.querySelector('.task');
  const key=div.id
  const filtered = localList.filter((item) => item.index !== key);
  localStorage.setItem('tasks', JSON.stringify(filtered));
  div.remove();
  const divs = document.querySelectorAll('.task');
  return divs;
};

module.exports = {
  add: addTask,
  delete: deleteData,
};
