///define UI element
let form =document.querySelector('#task_form');
let tasklist = document.querySelector('ul');
let clearBtn = document.querySelector('#clear_task_btn');
let filter = document.querySelector('#task_filter');
let taskInput = document.querySelector('#new_task');


///define event listerners
form.addEventListener('submit',addtask);
tasklist.addEventListener('click',removetask);
clearBtn.addEventListener('click',cleartask);
filter.addEventListener('keyup',filtertask);
document.addEventListener('DOMContentLoaded',gettasks)


////define functions
///add task
function addtask(e){
    if (taskInput.value === ''){
        alert('add to task');
    }else{
        let li = document.createElement('li')
        li.appendChild(document.createTextNode(taskInput.value + " "));
        let Link =document.createElement('a');
        Link.setAttribute("href", "#");
        Link.innerHTML = 'Delete'
        li.appendChild(Link);
        tasklist.appendChild(li);

        storetaskInLocalStorage(taskInput.value);
        taskInput.value = '';
       // console.log(li)
    }
    e.preventDefault();
}
//////////remove task

function removetask(e){
    if(e.target.hasAttribute('href')){
        if(confirm("Are you sure")){
            let ele =e.target.parentElement;
            ele.remove();
            //console.log(ele)
            removeFromLs(ele);

        }
    }
}
///////////clear task
function cleartask(e){
    while(tasklist.firstChild){
        tasklist.removeChild(tasklist.firstChild);
    
    }
    localStorage.clear();
}

///filter task

 function filtertask(e){
    let text = e.target.value.toLowerCase();

    document.querySelectorAll('li').forEach(task => {
        let item = task.firstChild.textContent;
        if(item.toLowerCase().indexOf(text) != -1) {
            task.style.display = 'block';
        } else {
            task.style.display = 'none';
        }

        
    });

} 
/////store in local storage
function storetaskInLocalStorage(task){
    let tasks;
    if(localStorage.getItem('tasks')===null){
        tasks = [];
    }else{
        tasks = JSON.parse(localStorage.getItem('tasks'));

    }
    tasks.push(task);
    localStorage.setItem('tasks',JSON.stringify(tasks));
}
function gettasks(){
    let tasks;
    if(localStorage.getItem('tasks')===null){
        tasks = [];
    }else{
        tasks = JSON.parse(localStorage.getItem('tasks'));

    }
    tasks.forEach(task =>{
        let li = document.createElement('li')
        li.appendChild(document.createTextNode(task  + " "));
        let Link =document.createElement('a');
        Link.setAttribute("href", "#");
        Link.innerHTML = 'Delete'
        li.appendChild(Link);
        tasklist.appendChild(li);

    });
}
function removeFromLs(taskItem){
    let tasks;
    if(localStorage.getItem('tasks')===null){
        tasks = [];
    }else{
        tasks = JSON.parse(localStorage.getItem('tasks'));

    }
    let li = taskItem;
    li.removeChild(li.lastChild);

    tasks.forEach((task,index) =>{
        if(li.textContent.trim() === task){
            tasks.splice(index,1)
        }
    });
    localStorage.setItem('tasks',JSON.stringify(tasks));
}