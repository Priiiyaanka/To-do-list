//This is for local storage
window.onload = function () {
  loadTasks();
};

//This function adds particular task in the list
function addTask() {
  let taskInput = document.getElementById('taskInput').value.trim();
  let priorityInput = document.getElementById('priorityInput').value;
  let dueDateInput = document.getElementById('dueDateInput').value;

  if (!taskInput) {
      alert("Task cannot be empty!");
      return;
  }

  let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
  tasks.push({ description: taskInput, priority: priorityInput, dueDate: dueDateInput, completed: false });
  localStorage.setItem('tasks', JSON.stringify(tasks));

  document.getElementById('taskInput').value = "";
  document.getElementById('priorityInput').value = "low";
  document.getElementById('dueDateInput').value = "";

  loadTasks();
}


function loadTasks() {
  let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
  let taskList = document.getElementById('taskList');
  taskList.innerHTML = "";

  tasks.forEach((task, index) => {
      let listItem = document.createElement('li');
      let checkbox = document.createElement('input');
      checkbox.type = "checkbox";
      checkbox.checked = task.completed;
      checkbox.onchange = function () {
          tasks[index].completed = checkbox.checked;
          localStorage.setItem('tasks', JSON.stringify(tasks));
      };

      //This creates the Edit button also I have added some inline css for the button
      let editBtn = document.createElement('button');
      editBtn.innerText = "Edit";
      editBtn.style.backgroundColor = "#fff";
      editBtn.style.borderRadius = "15px";
      editBtn.style.border = "1.5px solid rgb(255, 0, 153)";
      editBtn.onclick = function () {
          let newDesc = prompt("Enter new task description:", task.description);
          if (newDesc !== null) {
              tasks[index].description = newDesc;
              localStorage.setItem('tasks', JSON.stringify(tasks));
              loadTasks();
          }
      };
      //This creates the delete button also I have added some inline css for the button
      let deleteBtn = document.createElement('button');
      deleteBtn.innerText = "Delete";
      deleteBtn.style.backgroundColor = "#fff";
      deleteBtn.style.borderRadius = "15px";
      deleteBtn.style.border = "1.5px solid rgb(255, 0, 153)";

      deleteBtn.onclick = function () {
          tasks.splice(index, 1);
          localStorage.setItem('tasks', JSON.stringify(tasks));
          loadTasks();
      };

      listItem.appendChild(checkbox);
      listItem.appendChild(document.createTextNode(task.description + " | Priority: " + task.priority + " | Due Date: " + (task.dueDate || "Not set") + " "));
      listItem.appendChild(editBtn);
      listItem.appendChild(deleteBtn);
      taskList.appendChild(listItem);
  });
}
