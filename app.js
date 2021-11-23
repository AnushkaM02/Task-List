//Define UI variables
const form = document.querySelector("#task-form");  //add task form
const taskList = document.querySelector(".collection");   //ul
const clearBtn = document.querySelector(".clear-tasks");   //clear button
const filter = document.querySelector("#filter");   //filter tasks
const taskInput = document.querySelector("#task");  //new task input

//Load all event listeners
loadEventListeners();

//Load all event listeners function
function loadEventListeners(){

    //DOM load event
    document.addEventListener('DOMContentLoaded', getTasks);

    //Add task form
    form.addEventListener('submit', addTask);

    //Remove task event
    taskList.addEventListener('click', removeTask);

    //Clear task event
    clearBtn.addEventListener('click', clearTasks);

    //Filter tasks event 
    filter.addEventListener('keyup', filterTasks);
}

//Get tasks from local storage
function getTasks(){
    let tasks;
    if (localStorage.getItem('tasks') === null){
        tasks = [];
    }
    else{
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }

    tasks.forEach(function(task){
        //Create li element
        const li = document.createElement('li');

        //Add class
        //When using materialise, to make uls look good, they should have a class collection
        //li should have class collection-item
        li.className = 'collection-item';

        //Create text node and append to li
        li.appendChild(document.createTextNode(task));

        //Create new link element
        const link = document.createElement('a');
        //Add class
        //to have something to the right of li use secondary-content
        link.className = 'delete-item secondary-content';

        //Add icon html (x mark icon)
        link.innerHTML = '<i class="fa fa-remove"</i>';

        //Append the link to li
        li.appendChild(link);

        //Append li to ul
        taskList.appendChild(li);
    })
}

//Add Task - event handler
function addTask(e){

    if(taskInput.value != ''){
        //Create li element
        const li = document.createElement('li');

        //Add class
        //When using materialise, to make uls look good, they should have a class collection
        //li should have class collection-item
        li.className = 'collection-item';

        //Create text node and append to li
        li.appendChild(document.createTextNode(taskInput.value));

        //Create new link element
        const link = document.createElement('a');
        //Add class
        //to have something to the right of li use secondary-content
        link.className = 'delete-item secondary-content';

        //Add icon html (x mark icon)
        link.innerHTML = '<i class="fa fa-remove"</i>';

        //Append the link to li
        li.appendChild(link);

        //Append li to ul
        taskList.appendChild(li);

        //Store in local storage
        storeTaskInLocalStorage(taskInput.value);

        //Clear input
        taskInput.value = '';

        e.preventDefault();  //prevent default form submit
    }   

    else{     //If nothing is entered
        alert("Add a task");
    }
}

//Store Task
//F12 - applications - local storage
function storeTaskInLocalStorage(task){
    let tasks;
    if (localStorage.getItem('tasks') === null){
        tasks = [];
    }
    else{
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }
    tasks.push(task);

    localStorage.setItem('tasks', JSON.stringify(tasks));
    }

//Remove task
function removeTask(e){
    //If x icon is clicked
    if (e.target.parentElement.classList.contains('delete-item')){
        if (confirm('Are you sure?')){
            //whole task is removed on clicking x
            e.target.parentElement.parentElement.remove();

            //remove from local storage
            removeTaskFromLocalStorage(e.target.parentElement.parentElement);
    }
    }
}

//Remove from local storage
function removeTaskFromLocalStorage(taskItem){
    let tasks;
    if (localStorage.getItem('tasks') === null){
        tasks = [];
    }
    else{
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }

    tasks.forEach(function(task, index){
        if (taskItem.textContent === task){
            tasks.splice(index, 1);  
        }
    });

    localStorage.setItem('tasks', JSON.stringify(tasks));
}

//Clear tasks
function clearTasks(){
    //Method 1
    //taskList.innerHTML = '';

    //Method 2 - using while loop, is faster
    while (taskList.firstChild){    //while there is still a first child (task)
        taskList.removeChild(taskList.firstChild);
    }

    //Clear from local storage
    clearTasksFromLocalStorage();
}

//Clear tasks from local storage
function clearTasksFromLocalStorage(){
    localStorage.clear();
}

//Filter tasks
function filterTasks(e){
    const text = e.target.value.toLowerCase();

    //querySelectorAll returns a node list
    //task is the iterator
    document.querySelectorAll('.collection-item').forEach
    (function(task){
        const item = task.firstChild.textContent;
        
        if (item.toLowerCase().indexOf(text) != -1){
            task.style.display = 'block';
        }
        else{
            task.style.display = 'none';
        }
    });
    }