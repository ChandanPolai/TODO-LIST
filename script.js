const textBox = document.querySelector("#text-box");
const addBtn = document.querySelector(".add-btn");
const allTasks = document.querySelector(".tasks");

let myTasks = []; // Use an array to store tasks

function addTask() {
  // Create a function to handle the addition of tasks
  const taskText = textBox.value.trim(); // Get the value and remove extra spaces

  if (taskText !== "") {
    // Check if the input is not empty
    myTasks.push(taskText); // Add the task to the tasks array
    textBox.value = ""; // Clear the input field

    displayTasks(); // Call the function to display tasks
  }
}

function displayTasks() {
  allTasks.innerHTML = ""; // Clear the task list before displaying updated tasks

  myTasks.forEach(function (task) {
    const taskContainer = document.createElement("div"); // Create a container for each task

    const taskElement = document.createElement("p"); // Create a paragraph element for the task
    taskElement.textContent = task; // Set its text content to the task

    const checkIcon = document.createElement("span");
    checkIcon.className = "bx bx-check-square";
    checkIcon.classList.add("checkicon");
    checkIcon.addEventListener("click", function () {
      taskElement.classList.toggle("checkTasks");
    });

    const editIcon = document.createElement("span"); // Create an edit icon
    editIcon.className = "bx bxs-edit-alt"; // You can replace this with an icon class or an actual icon HTML
    editIcon.classList.add("edit");
    // 🐍🐍chatgpt edit code
    editIcon.addEventListener("click", function () {
      const newText = prompt("Edit task:", taskElement.textContent);
      // ⬇️check when the our tasks is not blank
      if (newText !== null) {
        taskElement.textContent = newText.trim();
        myTasks[myTasks.indexOf(task)] = newText.trim();
        // ⬇️when the promot box is open and the user erase the tasks the tasks was deleted
        if (newText == "") {
          taskContainer.remove();
          myTasks.splice(myTasks.indexOf(task), 1);
        }
      }
    });

    const removeIcon = document.createElement("span"); // Create a remove icon
    removeIcon.className = "bx bx-message-square-x"; // You can replace this with an icon class or an actual icon HTML
    removeIcon.classList.add("remove");

    // 🚀all the tasks was removed
    removeIcon.addEventListener("click", function () {
      const confirmation = confirm(
        "Are you sure you want to delete this task?"
      );
      if (confirmation) {
        taskContainer.remove();
        myTasks.splice(myTasks.indexOf(task), 1);
      }
    });

    taskContainer.appendChild(taskElement); // Append the task element to the task container
    taskContainer.appendChild(checkIcon); // Append the check icon to the task container
    taskContainer.appendChild(editIcon); // Append the edit icon to the task container
    taskContainer.appendChild(removeIcon); // Append the remove icon to the task container

    allTasks.appendChild(taskContainer); // Append the task container to the task list
  });
}

addBtn.addEventListener("click", addTask);
