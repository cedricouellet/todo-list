/*
 * Author : Cedric-Antoine Ouellet
 * Date   : 2021/07/06
 */

import {
  createTodo,
  storeTodo,
  getTodos,
  setComplete,
  removeTodo,
} from "./todos.js";

const CHECK_BTN_TEXT = "✓";
const DELETE_BTN_TEXT = "-";

const todoInput = document.getElementById("todoInput");
const todoInputBtn = document.getElementById("todoInputBtn");
const todosContainer = document.getElementById("todosContainer");
const clearBtn = document.getElementById("clearBtn");

// Initial render
renderTodos();

// Main event listeners
clearBtn.onclick = () => handleClearBtnClick();
todoInputBtn.onclick = () => handleSubmit();

todoInput.addEventListener("keyup", (e) => {
  if (e.key === "Enter" || e.keyCode === 13) {
    handleSubmit();
  }
});

// --- Functions ---
function handleClearBtnClick() {
  const isSure = confirm("Are you sure you want to clear all todos?");
  if (!isSure) return;
  clearTodos();
}

function clearTodos() {
  getTodos().forEach((todo) => {
    removeTodo(todo.id);
  });
  todosContainer.innerHTML = "";
}

function handleSubmit() {
  const text = todoInput.value.trim();
  todoInput.value = "";
  if (!text || text === "") return alert("Input must not be empty");

  storeTodo(createTodo(text));
  renderTodos();
}

function renderTodos() {
  todosContainer.innerHTML = "";
  getTodos().forEach((todo) => renderTodo(todo));
}

function createElem(name) {
  return document.createElement(name);
}

function renderTodo(todo) {
  const { id, title, complete } = todo;

  const div = createElem("div"),
    text = createElem("p"),
    checkBtn = createElem("button"),
    deleteBtn = createElem("button");

  div.dataset.title = title;
  div.dataset.id = id;
  div.dataset.complete = complete;

  text.innerText = todo.title;
  checkBtn.innerText = CHECK_BTN_TEXT;
  deleteBtn.innerText = DELETE_BTN_TEXT;

  let _;
  complete
    ? !div.classList.contains("complete")
      ? div.classList.add("complete")
      : _
    : div.classList.contains("complete")
    ? div.classList.remove("complete")
    : _;

  div.classList.add("todo");
  text.classList.add("todoTitle");
  checkBtn.classList.add("todoCheckBtn");
  deleteBtn.classList.add("todoDeleteBtn");

  checkBtn.onclick = (e) => handleCheckBtnClick(e);
  deleteBtn.onclick = (e) => handleDeleteBtnClick(e);

  div.appendChild(text);
  div.appendChild(checkBtn);
  div.appendChild(deleteBtn);
  todosContainer.appendChild(div);
}

function handleCheckBtnClick(e) {
  const parentElem = e.target.parentElement;
  const data = { ...parentElem.dataset };

  // Convert strings back to their intended format
  data.id = parseInt(data.id);
  data.complete = data.complete === "true";

  setComplete(data.id, !data.complete);
  renderTodos();
}

function handleDeleteBtnClick(e) {
  const parentElem = e.target.parentElement;
  const id = parseInt(parentElem.dataset.id);
  removeTodo(id);
  renderTodos();
}
