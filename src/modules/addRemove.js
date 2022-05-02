import { Mark } from './interactive.js';

const addData = document.querySelector('.input');
const todoContainer = document.querySelector('.tasks');
const divContainer = [];
let prev = '';
let prevInput = '';
let prevDit = '';
let prevDot = '';

export const newIndex = () => {
  let count = 1;
  const myData = JSON.parse(localStorage.getItem('tasks'));
  const remDivs = document.querySelectorAll('.task');
  for (let i = 0; i < myData.length; i += 1) {
    myData[i].index = count;
    remDivs[i].setAttribute('id', count);
    count += 1;
  }
  localStorage.setItem('tasks', JSON.stringify(myData));
};

export const removeItem = (e) => {
  const div = e.target.closest('div');
  const Input = e.target;
  const dotBtn = div.querySelector('.fa-ellipsis-vertical');
  const deleteBtn = div.querySelector('.fa-trash-can');
  if (prev) {
    prevDit.classList.add('hide');
    prevDot.classList.remove('hide');
    prev.classList.remove('background');
    prevInput.classList.remove('background');
  }
  deleteBtn.classList.remove('hide');
  dotBtn.classList.add('hide');
  div.classList.add('background');
  Input.classList.add('background');
  prev = div;
  prevInput = Input;
  prevDot = dotBtn;
  prevDit = deleteBtn;
};

export const addTask = () => {
  if (addData.value === '') {
    return;
  }
  const localList = JSON.parse(localStorage.getItem('tasks'));
  const task = {
    description: addData.value,
    completed: false,
    index: localList.length + 1,
  };

  const taskElement = document.createElement('div');
  taskElement.classList.add('task');
  taskElement.setAttribute('id', task.index);
  taskElement.innerHTML = `
                <input type="checkbox" name="" id="${task.index}" class="check-box" />
                <input type="text" class="description">
                <i class="fa-solid fa-ellipsis-vertical"></i>
                <i class="fa-solid fa-trash-can hide"></i>
                `;
  const taskDescription = taskElement.querySelector('.description');
  taskDescription.value = task.description;
  todoContainer.appendChild(taskElement);
  divContainer.push(taskElement);
  divContainer.forEach((item) => {
    const deleteBtn = item.querySelector('.fa-trash-can');
    const chekBox = item.querySelector('.check-box');
    chekBox.addEventListener('change', Mark);
    const Input = item.querySelector('.description');
    Input.addEventListener('click', removeItem);
    Input.addEventListener('input', updateLocal);
    deleteBtn.addEventListener('click', deleteData);
    Input.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') {
        deleteData(e);
      }
    });
  });
  localList.push(task);
  localStorage.setItem('tasks', JSON.stringify(localList));
  addData.value = '';
};

export const deleteData = (e) => {
  const div = e.target.closest('div');
  const key = Number(div.id);
  const Input = div.querySelector('.description');
  const localData = JSON.parse(localStorage.getItem('tasks'));
  const filtered = localData.filter((item) => item.index !== key);
  localStorage.setItem('tasks', JSON.stringify(filtered));
  div.remove();
  newIndex();
};

export const updateLocal = (e) => {
  const div = e.target.closest('div');
  const key = Number(div.id);
  const localData = JSON.parse(localStorage.getItem('tasks'));
  localData[key - 1].description = e.target.value;
  localStorage.setItem('tasks', JSON.stringify(localData));
};