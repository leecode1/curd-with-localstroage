/** @format */

let form = document.getElementById("form");
let textInput = document.getElementById("textInput");
let msg = document.getElementById("msg");
let dateInput = document.getElementById("dateInput");
let textArea = document.getElementById("textArea");
let tasks = document.getElementById("tasks");
let add = document.getElementById("add");

form.addEventListener("submit", (e) => {
  e.preventDefault();
  formValidation();
  //   console.log(textInput.value);
});

let formValidation = () => {
  if (textInput.value === "") {
    msg.innerHTML = "Please add the name";
  } else {
    msg.innerHTML = "";
    acceptData();
    add.setAttribute("data-bs-dismiss", "modal");
    add.click();

    // (()=> {
    // add.setAttribute("data-bs-dismiss", "");
    // })()
  }
};

// Store the data
let data = [];

let acceptData = () => {
  data.push({
    text: textInput.value,
    date: dateInput.value,
    description: textArea.value,
  });

  localStorage.setItem("datakey", JSON.stringify(data)); //It is used to set items
  createTask();

  console.log(data);
};

// To see in screen
let createTask = () => {
  tasks.innerHTML = "";
  data.forEach((x, y) => {
    return (tasks.innerHTML += `
     <div id=${y}>
                    <span class="fw-bold">${x.text}</span>
                    <span class="small text-secondary">${x.date}</span>
                    <p>${x.description}</p>
                    <span class="options">
                        <i onClick = 'editTask(this)' data-bs-toggle="modal" data-bs-target="#form" class="fas fa-edit"></i>
                        <i onClick='deleteTask(this)' class="fas fa-trash-alt"></i>
                    </span>
                </div>
    `);
  });

  restForm();
};

// delete
let deleteTask = (e) => {
  e.parentElement.parentElement.remove();
  data.splice(e.parentElement.parentElement.id, 1);
  localStorage.setItem("datakey", JSON.stringify(data)); //It is used to set items
};

// Editing function

let editTask = (e) => {
  let selectedTask = e.parentElement.parentElement;
  textInput.value = selectedTask.children[0].innerHTML;
  dateInput.value = selectedTask.children[1].innerHTML;
  textArea.value = selectedTask.children[2].innerHTML;
  deleteTask(e);
};

// Reseting in the form
let restForm = () => {
  textInput.value = "";
  dateInput.value = "";
  textArea.value = "";
};

(() => {
  data = JSON.parse(localStorage.getItem("datakey")) || [];
  createTask();
  console.log(data);
})();

// When ever the local storage is emty it will throw some error
// we can avoid it by adding || [ ]
