import './style.css';
import {
  addTask,
  removeItem,
  updateLocal,
  deleteData,
} from './modules/addRemove.js';
import { Mark, deletAll } from './modules/interactive.js';

const addData = document.querySelector('.input');
const todoContainer = document.querySelector('.tasks');
const submit = document.querySelector('.fa-arrow-down');
const deletAllItems = document.querySelector('.del');
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
                    <i class="fa-solid fa-trash-can hide"></i>
                    `;
      const taskDescription = taskElement.querySelector('.description');
      taskDescription.value = localItems[i].description;
      todoContainer.appendChild(taskElement);
      const Input = taskElement.querySelector('.description');
      const checkBox = taskElement.querySelector('.check-box');
      checkBox.addEventListener('change', Mark);
      if (localItems[i].completed === true) {
        checkBox.checked = true;
        Input.classList.toggle('mark');
      }
      const deleteBtn = taskElement.querySelector('.fa-trash-can');

      Input.addEventListener('click', removeItem);
      Input.addEventListener('input', updateLocal);
      deleteBtn.addEventListener('click', deleteData);
      Input.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
          deleteData(e);
        }
      });
    }
  }
};

submit.addEventListener('click', addTask);

addData.addEventListener('keypress', (e) => {
  if (e.key === 'Enter') {
    addTask();
  }
});
deletAllItems.addEventListener('click', deletAll);

loadTasks();
