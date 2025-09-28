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
