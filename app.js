//Document is the DOM can be accessed in the console with document.window.
// Tree is from the top, html, body, p etc.

//Problem: User interaction does not provide the correct results.
//Solution: Add interactivity so the user can manage daily tasks.
//Break things down into smaller steps and take each step at a time.


// Event handling, user interaction is what starts the code execution.

const taskInput = document.getElementById("new-task");//Add a new task.
const addButton = document.getElementsByTagName("button")[0];//first button
const incompleteTaskHolder = document.getElementById("incomplete-tasks");//ul of #incompleteTasks
const completedTasksHolder = document.getElementById("completed-tasks");//completed-tasks


//New task list item
const createNewTaskElement = function (taskString) {
  console.log("Add Task...");
  const listItem = document.createElement("li");
  listItem.classList.add("todo-task");

  //input (checkbox)
  const checkBox = document.createElement("input");
  checkBox.className = "checkbox";
  //label
  const label = document.createElement("label");//label
  //input (text)
  const editInput = document.createElement("input");//text
  //button.edit
  const editButton = document.createElement("button");//edit button

  //button.delete
  const deleteButton = document.createElement("button");//delete button
  const deleteButtonImg = document.createElement("img");//delete button image

  label.innerText = taskString;
  label.className = 'task-size caption';

  //Each elements, needs appending
  checkBox.type = "checkbox";
  checkBox.className = "checkbox";
  editInput.type = "text";
  editInput.className = "text-data task-size text-item hide-edit";

  editButton.innerText = "Edit"; //innerText encodes special characters, HTML does not.
  editButton.className = "btn btn-edit";

  deleteButton.className = "btn btn-delete";
  deleteButtonImg.src = './remove.svg';
  deleteButtonImg.className = "btn-img";
  deleteButton.appendChild(deleteButtonImg);


  //and appending.
  listItem.appendChild(checkBox);
  listItem.appendChild(label);
  listItem.appendChild(editInput);
  listItem.appendChild(editButton);
  listItem.appendChild(deleteButton);
  return listItem;
}



const addTask = function () {
  //Create a new list item with the text from the #new-task:
  if (!taskInput.value) return;
  const listItem = createNewTaskElement(taskInput.value);

  //Append listItem to incompleteTaskHolder
  incompleteTaskHolder.appendChild(listItem);
  bindTaskEvents(listItem, taskCompleted);

  taskInput.value = "";

}

//Edit an existing task.

const editTask = function () {
  const listItem = this.parentNode;
  const editInput = listItem.querySelector('input[type=text]');
  const label = listItem.querySelector("label");
  const editBtn = listItem.querySelector(".btn-edit");
  const containsClass = listItem.classList.contains("edit-mode");
  //If class of the parent is .editmode
  if (containsClass) {
    console.log("Edited");
    console.log("Change 'save' to 'edit'");
    //switch to .editmode
    //label becomes the inputs value.
    label.innerText = editInput.value;
    editBtn.innerText = "Edit";
    // add class names
    label.classList.remove("edit-mode-caption");
    label.classList.add("caption");
    editInput.classList.remove("edit-mode-text");
  } else {
    console.log("Edit Task...");
    console.log("Change 'edit' to 'save'");
    editInput.value = label.innerText;
    editBtn.innerText = "Save";
    // add class names
    label.classList.add("edit-mode-caption");
    editInput.classList.add("edit-mode-text");
  }

  //toggle .editmode on the parent.
  listItem.classList.toggle("edit-mode");
};


//Delete task.
const deleteTask = function () {
  console.log("Delete Task...");

  const listItem = this.parentNode;
  const ul = listItem.parentNode;
  //Remove the parent list item from the ul.
  ul.removeChild(listItem);

}


//Mark task completed
const taskCompleted = function () {
  console.log("Complete Task...");

  //Append the task list item to the #completed-tasks
  const listItem = this.parentNode;
  // add class names
  const label = listItem.querySelector("label");
  label.classList.add("completed-caption");
  completedTasksHolder.appendChild(listItem);
  bindTaskEvents(listItem, taskIncomplete);

}


const taskIncomplete = function () {
  console.log("Incomplete Task...");
  //Mark task as incomplete.
  //When the checkbox is unchecked
  //Append the task list item to the #incompleteTasks.
  const listItem = this.parentNode;
  // add class names
  const label = listItem.querySelector("label");
  label.classList.remove("completed-caption");
  incompleteTaskHolder.appendChild(listItem);
  bindTaskEvents(listItem, taskCompleted);
}



const ajaxRequest = function () {
  console.log("AJAX Request");
}

//The glue to hold it all together.


//Set the click handler to the addTask function.
addButton.onclick = addTask;
addButton.addEventListener("click", addTask);
addButton.addEventListener("click", ajaxRequest);


const bindTaskEvents = function (taskListItem, checkBoxEventHandler) {
  console.log("bind list item events");
  //select ListItems children
  const checkBox = taskListItem.querySelector("input[type=checkbox]");
  const editButton = taskListItem.querySelector("button.btn-edit");
  const deleteButton = taskListItem.querySelector("button.btn-delete");


  //Bind editTask to edit button.
  editButton.onclick = editTask;
  //Bind deleteTask to delete button.
  deleteButton.onclick = deleteTask;
  //Bind taskCompleted to checkBoxEventHandler.
  checkBox.onchange = checkBoxEventHandler;
}

//cycle over incompleteTaskHolder ul list items
//for each list item
for (let i = 0; i < incompleteTaskHolder.children.length; i++) {

  //bind events to list items chldren(tasksCompleted)
  bindTaskEvents(incompleteTaskHolder.children[i], taskCompleted);
}




//cycle over completedTasksHolder ul list items
for (let i = 0; i < completedTasksHolder.children.length; i++) {
  //bind events to list items chldren(tasksIncompleted)
  bindTaskEvents(completedTasksHolder.children[i], taskIncomplete);
}




// Issues with usability don't get seen until they are in front of a human tester.

//prevent creation of empty tasks.

//Change edit to save when you are in edit mode.