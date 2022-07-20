let form = document.querySelector('#task_form');
let taskList = document.querySelector('#tasks');
let taskInput = document.querySelector('#newtask');
let filter = document.querySelector('#task_filter');
let clearTask = document.querySelector('#clear_task_btn')


form.addEventListener('submit', addTaskList);
clearTask.addEventListener('click', clearAllTask);
taskList.addEventListener('click', removeTask);
taskList.addEventListener('click', completeTask);
filter.addEventListener('keyup', filterTask)
document.addEventListener('DOMContentLoaded', getTasks)

// function addTaskList(e) {
//   e.preventDefault();
//   if(taskInput.value === ''){
//     alert('add a task first🙏');
//   }else{
//     let li = document.createElement('li');
//     li.append(taskInput.value);
//     taskList.appendChild(li)
//     taskInput.value = '';
//   }     &#10006
// }
function addTaskList(e) {
  e.preventDefault();
  if(taskInput.value === ''){
    alert('add a task first🙏');
  }else{
    let li = document.createElement('li');
    li.appendChild(document.createTextNode(taskInput.value + " "));
    taskList.appendChild(li)
    let link = document.createElement('a');
    link.setAttribute('href', '#');
    link.innerHTML = "&#10006";
    li.append(link);
    link.style.textDecoration = 'none';
    link.style.marginLeft = '15px';
    link.style.color = '#FF6363';
    storeTaskInLS(taskInput.value);
    taskInput.value = '';
  } 
}

function clearAllTask(){
  taskList.innerHTML = "";
  localStorage.clear();
}

function removeTask(e){
  if(e.target.hasAttribute('href')){
    if(confirm('Are you sure to delete task 🤨?')){
      let elem = e.target.parentElement;
      elem.remove();
      removeFromLS(elem);
    }
  }
}

function completeTask(e) {
  // e.stopPropagation()
  if(e.target.tagName === "LI"){
    let elem = e.target;
    elem.classList.toggle("line_through");
  }
}

function filterTask(e){
  let text = e.target.value.toLowerCase();
  document.querySelectorAll('li').forEach( task => {
    let item = task.firstChild.textContent;
    if(item.toLowerCase().indexOf(text) != -1){
      task.style.display = 'block'
    }else{
      task.style.display = 'none'
    }
  })
}

function storeTaskInLS(task) {
  let tasks;
  if(localStorage.getItem('tasks') === null) {
    tasks = [];
  }else {
    tasks = JSON.parse(localStorage.getItem('tasks'))
  }
  tasks.push(task)
  localStorage.setItem('tasks', JSON.stringify(tasks))
}

function getTasks() {
  let tasks;
  if(localStorage.getItem('tasks') === null) {
    tasks = [];
  }else {
    tasks = JSON.parse(localStorage.getItem('tasks'))
  }
  tasks.forEach(task => {
    let li = document.createElement('li');
    li.appendChild(document.createTextNode(task + " "));
    taskList.appendChild(li)
    let link = document.createElement('a');
    link.setAttribute('href', '#');
    link.innerHTML = "&#10006";
    li.append(link);
    link.style.textDecoration = 'none';
    link.style.marginLeft = '15px';
    link.style.color = '#FF6363';
  })
}

function removeFromLS(taskItem){
  let tasks;
  if(localStorage.getItem('tasks') === null) {
    tasks = [];
  }else {
    tasks = JSON.parse(localStorage.getItem('tasks'))
  }
  let li = taskItem;
  li.removeChild(li.lastChild);
  tasks.forEach((task, index) => {
    if(li.textContent.trim() === task){
      tasks.splice(index, 1)
    }
  })
  localStorage.setItem('tasks', JSON.stringify(tasks))
}