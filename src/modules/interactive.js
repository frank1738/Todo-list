import { newIndex } from './addRemove.js';

const tasksDivs = document.querySelector('.container');
const task = tasksDivs.querySelectorAll('.tasks');
export const Mark = (e) => {
  const div = e.target.closest('div');
  const key = div.id;
  const Input = div.querySelector('.description');
  Input.classList.toggle('mark');
  const localData = JSON.parse(localStorage.getItem('tasks'));
  if (Input.classList.contains('mark')) {
    localData[key - 1].completed = true;
  } else {
    localData[key - 1].completed = false;
  }
  localStorage.setItem('tasks', JSON.stringify(localData));
};

export const deletAll = () => {
  const localData = JSON.parse(localStorage.getItem('tasks'));
  const filtered = localData.filter((item) => item.completed === false);
  localStorage.setItem('tasks', JSON.stringify(filtered));
  const divs = tasksDivs.querySelectorAll('.task');
  divs.forEach((div) => {
    const checkBox = div.querySelector('.check-box');
    if (checkBox.checked === true) {
      div.remove();
      newIndex();
    }
  });
};
