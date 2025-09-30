let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
let timerInterval;
let totalSeconds = 0;
let remainingSeconds = 0;

function saveTasks() {
localStorage.setItem("tasks", JSON.stringify(tasks));
renderTasks();
}

function addTask() {
let title = prompt("Enter task title:");
if (!title) return;
tasks.push({
title: title,
status: "Not Started",
priority: "Medium",
dueDate: "",
doNow: false
 });
saveTasks();
}
function updateTask(index, field, value) {
      tasks[index][field] = value;
      saveTasks();
    }
function toggleDoNow(index) {
      let count = tasks.filter(t => t.doNow).length;
      if (!tasks[index].doNow && count >= 10) {
        alert("You can only select up to 10 tasks in Do Now!");
        return;
      }
      tasks[index].doNow = !tasks[index].doNow;
      saveTasks();
    }
function renderTasks() {
      let taskList = document.getElementById("taskList");
      taskList.innerHTML = "";

      tasks.forEach((task, index) => {
        let div = document.createElement("div");
        div.className = "task";
        div.innerHTML = `
          <h4>${task.title}</h4>
          <select onchange="updateTask(${index}, 'status', this.value)" class="status ${task.status.toLowerCase().replace(' ','-')}">
            <option ${task.status==="Done"?"selected":""}>Done</option>
            <option ${task.status==="In Progress"?"selected":""}>In Progress</option>
            <option ${task.status==="Not Started"?"selected":""}>Not Started</option>
          </select>

          <select onchange="updateTask(${index}, 'priority', this.value)" class="priority ${task.priority.toLowerCase()}">
            <option ${task.priority==="High"?"selected":""}>High</option>
            <option ${task.priority==="Medium"?"selected":""}>Medium</option>
            <option ${task.priority==="Low"?"selected":""}>Low</option>
          </select>
          <br>
          <label>Due Date: <input type="date" value="${task.dueDate}" onchange="updateTask(${index}, 'dueDate', this.value)"></label>
          <br>
          <button onclick="toggleDoNow(${index})">${task.doNow ? "Remove from Do Now" : "Move to Do Now"}</button>
          <button onclick="removeTask(${index})" "> Remove Task</button>
        `
        ;
        taskList.appendChild(div);
      }); 
document.getElementById("totalTasks").innerText = tasks.length + " Task";
document.getElementById("inProgressTasks").innerText = tasks.filter(t=>t.status==="In Progress").length + " In progress";
document.getElementById("doneTasks").innerText = tasks.filter(t=>t.status==="Done").length + " Done";  
      let doNowList = document.getElementById("doNowList");
      doNowList.innerHTML = "";
      tasks.filter(t=>t.doNow).forEach(task=>{
        let d = document.createElement("div");
        d.innerHTML = `<h4>${task.title}</h4> <br>
      <span class="status ${task.status.toLowerCase().replace(' ','-')}">${task.status}</span>
      <span class="priority ${task.priority.toLowerCase()}">${task.priority}</span>
      `;
      doNowList.appendChild(d);
    });
      document.getElementById("doNowCount").innerText = tasks.filter(t=>t.doNow).length;
    }
    function setTimer() {
      let minutes = prompt("Enter timer duration in minutes:");
      if (!minutes || isNaN(minutes) || minutes <= 0) return;
      clearInterval(timerInterval);
      totalSeconds = minutes * 60;
      remainingSeconds = totalSeconds;
      updateTimerDisplay();
      document.getElementById("timerControls").style.display = "block";
      setTimer
    }
    function startTimer() {
      clearInterval(timerInterval);
      timerInterval = setInterval(() => {
        if (remainingSeconds <= 0) {
          clearInterval(timerInterval);
          alert(" Time's up!");
        } else {
          remainingSeconds--;
          updateTimerDisplay();
          setTimer
        }
      }, 1000);
      setTimer
    }
    function pauseTimer() {
      clearInterval(timerInterval);
      setTimer
    }
    function resetTimer() {
      clearInterval(timerInterval);
      remainingSeconds = totalSeconds;
      updateTimerDisplay();
      setTimer
    }
    function updateTimerDisplay() {
      let min = Math.floor(remainingSeconds / 60);
      let sec = remainingSeconds % 60;
      document.getElementById("timerDisplay").innerText =
        (min < 10 ? "0" + min : min) + ":" + (sec < 10 ? "0" + sec : sec);
    }
    if (remainingSeconds > 0) {
  updateTimerDisplay();
  if (timerData.isRunning) {
    startTimer();
  }
}
function removeTask(index) {
  if (confirm("Are you sure you want to delete this task?")) {
    tasks.splice(index, 1);  
    saveTasks();             
  }
}
renderTasks();
