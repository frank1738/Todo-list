const myModule = require('./__mocks__/addRemove.js');
jest.spyOn(window.localStorage.__proto__, 'setItem');
window.localStorage.__proto__.setItem = jest.fn();
const addTask = myModule.add;
const deleteData = myModule.delete;
const updateLocal = myModule.edit;
const deletAll = myModule.clear;
const mark = myModule.complete;
jest.mock('./src/modules/addRemove.js');
jest.mock('./src/modules/interactive.js');
describe('add task', () => {
  test('test if task is added', () => {
    expect(addTask().length).toBe(1);
  });
  test('test if local storage is updated', () => {
    expect(localStorage.setItem).toHaveBeenCalled();
  });
});

describe('Edit task description', () => {
  test('edit task description to play football', () => {
    expect(updateLocal()).toBe('play football');
  });
  test('test if local storage is updated', () => {
    expect(localStorage.setItem).toHaveBeenCalled();
  });
});

describe('testing completed status', () => {
  test('completed status should be true', () => {
    expect(mark()).toBe(true);
  });
  test('test if local storage is updated', () => {
    expect(localStorage.setItem).toHaveBeenCalled();
  });
});

describe('delete task', () => {
  test('test if task is deleted', () => {
    expect(deleteData().length).toBe(0);
  });
  test('test if local storage is updated', () => {
    expect(localStorage.setItem).toHaveBeenCalled();
  });
});

describe('clear all completed', () => {
  test('test if completed task is deleted', () => {
    addTask();
    mark();
    expect(deletAll().length).toBe(0);
  });
  test('test if local storage is updated', () => {
    expect(localStorage.setItem).toHaveBeenCalled();
  });
});
