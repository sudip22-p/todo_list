const taskInput=document.getElementById("task-input");
const addBtn=document.getElementById("add-btn");
const taskContainer=document.getElementById("tasks");
let taskToEdit=null;


//placing the stored file as they are on loading
document.addEventListener("DOMContentLoaded",getTasksToLocalStorage);


//function to add new task
addBtn.addEventListener("click",addTask);


//function for editing and deleting tasks
taskContainer.addEventListener("click",updateTasks);


//function to add new task
function addTask(){
    let newTask=taskInput.value;

    if(newTask.trim() === ""){
        alert("Don't leave field empty!!!-->input some task first??");
        taskInput.value="";
        taskInput.focus();
        return;

    }else {

        if(addBtn.value==="Edit"){//for Editing purpose 

            if(taskToEdit){

                //updating in storage too above all coz:need taskToEdit previous /old text
                editTasksToLocalStorage(taskToEdit.innerHTML,taskInput.value);
                taskToEdit.innerHTML=taskInput.value;
                taskInput.value="";
                addBtn.value="Add";

            }else{

                alert("Unknown Error Occured!!!!!!");

            }
            return;

        }


        const li=document.createElement("li");//wrapper li

        const p=document.createElement("p");//p tag for text
        p.textContent=newTask;

        const btnWrapper=document.createElement("span");//btn wrapper 
        btnWrapper.style.display="flex";
        btnWrapper.style.flexDirection="row";

        const remove=document.createElement("div");//remove btn
        remove.textContent="Remove";
        remove.classList.add("remove-btn");

        const edit=document.createElement("div");//edit btn
        edit.classList.add("edit-btn");
        edit.textContent="Edit";

        //placing all tags at right place
        li.append(p);
        btnWrapper.append(remove);
        btnWrapper.append(edit);
        li.append(btnWrapper);
        taskContainer.append(li);

        //making the input field empty
        taskInput.value="";
        saveTasksToLocalStorage(newTask);
        return;

    }
}



function updateTasks(e){
    // console.log(e.target);//the clicked part i.e. may be p or edit or remove btn
    if(e.target.innerHTML=="Remove"){
        let parentSpan=e.target.parentElement;
        let parentLi=parentSpan.parentElement;
        parentLi.remove();
        //for deleting from local memory
        let siblingP=parentSpan.previousElementSibling;//getting task-text
        removeTasksFromLocalStorage(siblingP.innerHTML);
    }else if(e.target.innerHTML=="Edit"){
        let parentSpan=e.target.parentElement;
        let siblingP=parentSpan.previousElementSibling;
        taskInput.value=siblingP.innerHTML;
        taskInput.focus();
        addBtn.value="Edit";
        taskToEdit=siblingP;
    }

}



//saving to local 
//*****not available this function for pages hosted using github statically :need some backend or other emplementations */
function saveTasksToLocalStorage(newTask) {
    let tasks=[];//why array not directly the msg ---coz:storing muliple tasks not single..
    tasks=JSON.parse(localStorage.getItem("tasks"));//taking from storage
    tasks.push(newTask);//adding the new task in new array element at last
    localStorage.setItem("tasks",JSON.stringify(tasks));//updating the tasks in local storage 
}



//getting local tasks data
function getTasksToLocalStorage(){
    let tasks=[];
    tasks=JSON.parse(localStorage.getItem("tasks"));//taking from storage
    if(tasks){
        tasks.forEach(task => {
            const li=document.createElement("li");//wrapper li

            const p=document.createElement("p");//p tag for text
            p.textContent=task;

            const btnWrapper=document.createElement("span");//btn wrapper 
            btnWrapper.style.display="flex";
            btnWrapper.style.flexDirection="row";

            const remove=document.createElement("div");//remove btn
            remove.textContent="Remove";
            remove.classList.add("remove-btn");

            const edit=document.createElement("div");//edit btn
            edit.classList.add("edit-btn");
            edit.textContent="Edit";

            //placing all tags at right place
            li.append(p);
            btnWrapper.append(remove);
            btnWrapper.append(edit);
            li.append(btnWrapper);
            taskContainer.append(li);
        });
    }
}




//function to remove the deleted task from local storage too
function removeTasksFromLocalStorage(task){
    let tasks=[];
    tasks=JSON.parse(localStorage.getItem("tasks"));//taking from storage
    let indexToDelete=tasks.indexOf(task);
    tasks.splice(indexToDelete,1);
    localStorage.setItem("tasks",JSON.stringify(tasks));//updating the tasks in local storage 
}




//function to edit the edited task in local storage too
function editTasksToLocalStorage(oldTaskText,newTaskText){
    let tasks=[];
    tasks=JSON.parse(localStorage.getItem("tasks"));//taking from storage
    let indexToEdit=tasks.indexOf(oldTaskText);
    tasks[indexToEdit]=newTaskText;
    localStorage.setItem("tasks",JSON.stringify(tasks));//updating the tasks in local storage 
}