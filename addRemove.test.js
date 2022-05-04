const myModule = require('./__mocks__/addRemove.js');
jest.spyOn(window.localStorage.__proto__, 'setItem');
window.localStorage.__proto__.setItem = jest.fn();
const addTask = myModule.add;
const deleteData = myModule.delete;
jest.mock('./src/modules/addRemove.js');
describe('add task', () => {
  test('test if task is added', () => {
    expect(addTask().length).toBe(1);
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
