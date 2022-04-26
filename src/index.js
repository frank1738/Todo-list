import './style.css';

const todoContainer = document.querySelector('.tasks');
const todoItems = [
  {
    description: 'wash the dishes',
    completed: false,
    index: 1,
  },
  {
    description: 'complete To Do list project',
    completed: false,
    index: 2,
  },
];

const loadTodos = () => {
  for (let i = 0; i < todoItems.length; i += 1) {
    const taskElement = document.createElement('div');
    taskElement.classList.add('task');
    taskElement.setAttribute('id', todoItems[i].index);
    taskElement.innerHTML = `
          <input type="checkbox" name="" id="${todoItems[i].index}" class="check-box" />
          <p class="description">${todoItems[i].description}</p>
          <i class="fa-solid fa-ellipsis-vertical"></i>
          `;
    todoContainer.appendChild(taskElement);
  }
};

loadTodos();
