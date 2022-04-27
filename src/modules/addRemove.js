const addData = document.querySelector('.input');
const todoContainer = document.querySelector('.tasks');
const divContainer = [];
let prev = '';
let prevInput = '';
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
                `;
  const taskDescription = taskElement.querySelector('.description');
  taskDescription.value = task.description;
  todoContainer.appendChild(taskElement);
  divContainer.push(taskElement);
  divContainer.forEach((item) => {
    const editText = item.querySelector('.description');
    editText.addEventListener('click', removeItem);
  });
  localList.push(task);
  localStorage.setItem('tasks', JSON.stringify(localList));
  addData.value = '';
};

export const removeItem = (item) => {
  if (prev) {
    const prevIcon = prev.querySelector('.fa-solid');
    prevIcon.classList.remove('fa-trash-can');
    prev.classList.remove('background');
    prevInput.classList.remove('background');
  }
  const div = item.target.closest('div');
  const divIcon = div.querySelector('.fa-solid');
  divIcon.classList.add('fa-trash-can');
  div.classList.add('background');
  item.target.classList.add('background');
  prevInput = item.target;
  prev = div;
  item.target.addEventListener('input', (e) => {
    const recentData = JSON.parse(localStorage.getItem('tasks'));
    recentData[div.id - 1].description = e.target.value;
    localStorage.setItem('tasks', JSON.stringify(recentData));
  });
  divIcon.addEventListener('click', () => {
    if (item.target.value === '') {
      const localtasks = JSON.parse(localStorage.getItem('tasks'));
      const filteredTasks = localtasks.filter(
        (item) => item.index !== Number(div.id)
      );
      localStorage.setItem('tasks', JSON.stringify(filteredTasks));
      div.remove();
      newIndex();
    }
  });
};

const newIndex = () => {
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
