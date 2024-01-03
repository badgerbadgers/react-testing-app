import { render, screen, cleanup } from '@testing-library/react';
import Todo from '../todo';
//snapshot checks component has not changed since last run test
import renderer from 'react-test-renderer';

//aftermethod runs cleanup after each test is run
afterEach(() => {
  cleanup();
});

//test for non-completed todo
test('should render non-completed todo component', () => {
  const todo = { id: 1, title: 'wash dishes', completed: false }
  render(<Todo todo={todo} />);
  //uses screen retrieves component from tree using test id
  const todoElement = screen.getByTestId('todo-1');
  //now use assertions:
  //assertion that ele exists in todo.js
  expect(todoElement).toBeInTheDocument();
  expect(todoElement).toHaveTextContent('wash dishes');
  expect(todoElement).not.toContainHTML('<strike>');
})

//test for completed todo
test('should render completed todo component', () => {
  const todo =     { id: 2, title: 'wash car', completed: true }
  render(<Todo todo={todo} />);
  //uses screen retrieves component from tree using test id
  const todoElement = screen.getByTestId('todo-2');
  //now use assertions:
  //assertion that ele exists in todo.js
  expect(todoElement).toBeInTheDocument();
  expect(todoElement).toHaveTextContent('wash car');
  // expect(todoElement).toContainHTML('<strike>');
  expect(todoElement).not.toContainHTML('<strike>');
})

test('matches snapshot', () => {
  const todo = { id: 1, title: 'wash dishes', completed: false }
  //create tree
  const tree = renderer.create(<Todo todo={todo} />).toJSON();
  // console.log('tree', tree)
  //use snapshot will be run in test that contains tree
  expect(tree).toMatchSnapshot();
})