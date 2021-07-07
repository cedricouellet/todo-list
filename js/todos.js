const TODOS = "todos";
let nextId;

export const createTodo = (title) => {
  const todo = {
    id: nextId,
    title: title,
    complete: false,
  };

  return todo;
};

export const getTodos = () => {
  let todos = JSON.parse(localStorage.getItem(TODOS));
  if (todos.length === 0) {
    nextId = 1;
    return [];
  }
  nextId = 1 + todos.slice(-1)[0].id;
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
