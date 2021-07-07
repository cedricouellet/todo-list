const TODOS = "todos";
const NEXT_ID = "nextId";

const getNextId = () => {
  let nextId = parseInt(localStorage.getItem(NEXT_ID));
  if (!nextId) {
    nextId = 1;
    setNextId(nextId);
  }
  return nextId;
};

const setNextId = (val) => {
  localStorage.setItem(NEXT_ID, val);
};

export const createTodo = (title) => {
  const todo = {
    id: getNextId(),
    title: title,
    complete: false,
  };

  setNextId(getNextId() + 1);

  return todo;
};

export const getTodos = () => {
  let todos = JSON.parse(localStorage.getItem(TODOS));
  if (todos.length === 0) {
    setNextId(1);
    return [];
  }
  setNextId(1 + todos.slice(-1)[0].id);
  console.log(todos);
  return todos;
};

export const storeTodo = (todo) => {
  const todos = getTodos();
  todos.push({
    id: todo.id,
    title: todo.title,
    complete: todo.complete,
  });
  setTodos(todos);
};

export const setTodos = (todos) => {
  localStorage.removeItem(TODOS);
  localStorage.setItem(TODOS, JSON.stringify(todos));
};

export const removeTodo = (id) => {
  const todos = getTodos().filter((todo) => {
    return todo.id !== id;
  });

  setTodos(todos);
};

export const setComplete = (id, val) => {
  const todos = getTodos();
  todos.find((todo) => {
    if (todo.id === id) {
      todo.complete = val;
    }
  });
  setTodos(todos);
};

export default {
  createTodo,
  getTodos,
  storeTodo,
  setComplete,
  removeTodo,
};
