import './style.css';
import { addTask, removeItem } from './modules/addRemove.js';

const addData = document.querySelector('.input');
const todoContainer = document.querySelector('.tasks');
const submit = document.querySelector('.fa-arrow-down');

const loadTasks = () => {
  if (!localStorage.getItem('tasks')) {
    const taskList = [];
    localStorage.setItem('tasks', JSON.stringify(taskList));
  } else {
    const localItems = JSON.parse(localStorage.getItem('tasks'));
    for (let i = 0; i < localItems.length; i += 1) {
      const taskElement = document.createElement('div');
      taskElement.classList.add('task');
      taskElement.setAttribute('id', localItems[i].index);
      taskElement.innerHTML = `
                    <input type="checkbox" name="" id="${localItems[i].index}" class="check-box" />
                    <input type="text" class="description">
                    <i class="fa-solid fa-ellipsis-vertical"></i>
                    `;
      const taskDescription = taskElement.querySelector('.description');
      taskDescription.value = localItems[i].description;
      todoContainer.appendChild(taskElement);
      const edit = taskElement.querySelector('.description');
      edit.addEventListener('click', removeItem);
    }
  }
};

submit.addEventListener('click', addTask);

addData.addEventListener('keypress', (e) => {
  if (e.key === 'Enter') {
    addTask();
  }
});
loadTasks();
