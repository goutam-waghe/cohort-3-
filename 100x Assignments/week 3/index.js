const fs = require("fs");

const filePath = "./todo.json";
//laod todo
function loadtodo() {
  const dataBuffer = fs.readFileSync(filePath);
  const dataJSON = dataBuffer.toString();
  return JSON.parse(dataJSON);
}

// save todo
const saveTodos = (todos) => {
  const dataJSON = JSON.stringify(todos, null, 1);
  fs.writeFileSync(filePath, dataJSON);
};

//function for add todo
function addtodo(todo) {
  const todos = loadtodo();
  todos.push({ task: todo, done: false });
  saveTodos(todos);
  console.log(`added new task ${todo}`);
}
//delete todo

function deleteTodo(index) {
  const todos = loadtodo();
  if (todos.length === 0) return;
  if (index >= 0 && index < todos.length) {
    const deletedtask = todos.splice(index, 1);
    saveTodos(todos);
    console.log(`task deleted ${deletedtask[0].task}`);
    console.log(todos);
  } else {
    console.log(`enter vailid index`);
  }
}
// done

function doneMark(index) {
  const todos = loadtodo();
  if (index >= 0 && index < todos.length) {
    todos[index].done = true;
    saveTodos(todos);
  } else {
    console.log(`invailid index`);
  }
}

//creating commmande  line interface

const argument = process.argv.slice(2);
const command = argument[0];
const task = argument.slice(1).join(" ");
console.log(command);

if (command === "add") {
  addtodo(task);
} else if (command === "delete") {
  if (!isNaN(task)) {
    deleteTodo(task);
  } else {
    console.log(`inter valid index`);
  }
} else if (command === "done") {
  if (!isNaN(task)) {
    doneMark(task);
  } else {
    console.log(`inter valid index`);
  }
} else {
  console.log("invailid command");
}
