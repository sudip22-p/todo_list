const taskInput=document.getElementById("task-input");
const addBtn=document.getElementById("add-btn");
const taskContainer=document.getElementById("tasks");

addBtn.addEventListener("click",addTask);
function addTask(){
    let newTask=taskInput.value;
    if(newTask==""||newTask==" "||newTask=="  "){
        alert("Don't leave field empty!!!-->input task to add");
    }else {
        const li=document.createElement("li");//wrapper li

        const p=document.createElement("p");//p tag for text
        p.textContent=newTask;

        const btnWrapper=document.createElement("div");//btn wrapper 
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

        //emptying the input field
        taskInput.value="";
    }
}

