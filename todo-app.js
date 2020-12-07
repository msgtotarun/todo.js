let taskList = []
var i = 0
var currDate = new Date();
var date = currDate.getDate() + "/" + currDate.getMonth() + 1;
var utc = new Date().toJSON().slice(0, 10).replace(/-/g, "-");
class Task {
    constructor(name, dueDate, isDone) {
        this.taskId = Date.now();
        this.name = name;
        this.dueDate = dueDate;
        this.isDone = isDone;
    }

    toString() {
      // let htmlText = '<div class="input-group mb-3">'
      // htmlText += '<div class="input-group-prepend">'
      // htmlText += '<div class="input-group-text">'
      // htmlText += '<input type="checkbox" aria-label="Checkbox for following text input">'
      // htmlText += '</div>'
      // htmlText += '</div>'
      // htmlText += '<input type="text" class="form-control" value="'+this.name+","+this.dueDate+'" readonly>'
      // htmlText += '<div class="input-group-append">'
      // htmlText += '<button class="btn btn-outline-secondary" type="button" onclick="deleteTask("'+this.taskId+'") id="button-addon2">Delete</button>'
      // htmlText += '</div>'
      // htmlText += '</div>'


      let htmlText = '<li class="task" ><div class ="eachTask">';
      htmlText += this.name;
      htmlText += ", " + "Due date: " + this.dueDate;
      htmlText +=
        '<input type="checkbox" onclick="strk(' +
        this.taskId +
        ')" name="isDone" id="isDone">';
      htmlText += '<button onclick="deleteTask(';
      htmlText += this.taskId;
      htmlText += ')">Delete</button>';
      htmlText += "</div></li><br>";
      return htmlText;
    }

    toStrikeString() {
      let htmlText = '<li class="task" ><div class ="eachTask">';
      htmlText += "<strike>"+this.name;
      htmlText += ", " + "Due date: " + this.dueDate+"</strike>";
      htmlText +=
        '<input type="checkbox" style="color:#f00" onclick="strk(' +
        this.taskId +
        ')" name="isDone" id="isDone">';
      htmlText += '<button onclick="deleteTask(';
      htmlText += this.taskId;
      htmlText += ')">Delete</button>';
      htmlText += "</div></li><br>";
      return htmlText;
    }

}



function strk(id){
  console.log("e.taskId");
  taskList.map(function(e){
   if (id == e.taskId && e.isDone==false) {
     console.log(e.taskId);
     Object.assign(e, {isDone: true});
     render();
   }
   else {
     console.log(e.taskId);
     Object.assign(e, {isDone: false});
     render();
   }
  });

  var request = new XMLHttpRequest();
  request.open("POST", "http://127.0.0.1:5000/api/update/", true);
  request.setRequestHeader("Access-Control-Allow-Origin", "http://127.0.0.1:5000/api/update/");
  request.setRequestHeader("Content-Type", "application/json");
  request.send(JSON.stringify(taskList));
  // update the DOM
  render()

}



function render() {
    const listUI = document.getElementById("todolist")
    listUI.innerHTML = "";
    if (taskList.length === 0) listUI.innerHTML = "No tasks todo :-)"
    taskList.forEach((task) => {
        if (task.isDone) {
          listUI.innerHTML += task.toStrikeString();
          console.log(task.toStrikeString());
        }
        else {
          listUI.innerHTML += task.toString();
          console.log(task.toString());
        }
    })
}

function deleteTask(taskId) {
    taskList = taskList.filter(
        (t) => {
            if(t.taskId != taskId)
            return t;
        }
    );
    // call a web api to update the database on the server
    var request = new XMLHttpRequest();
    request.open("POST", "http://127.0.0.1:5000/api/update/", true);
    request.setRequestHeader("Access-Control-Allow-Origin", "http://127.0.0.1:5000/api/update/");
    request.setRequestHeader("Content-Type", "application/json");
    request.send(JSON.stringify(taskList));
    // update the DOM
    render()
    console.log(taskList);
}

function createTask() {
    const taskName = document.getElementById("taskName").value;
    const dueDate = document.getElementById("dueDate").value;
    let msg = document.getElementById("message");
    console.log(taskName);

    if (taskName === "") {
      // msg.style.display = "block";
      document.querySelector(".message").innerHTML = "Enter Task name.";
      return;
    }

    if (dueDate < utc) {
      // msg.style.display = "block";
      document.querySelector(".message").innerHTML = "Enter a valid date.";
      return;
    }

    addTask(new Task(taskName, dueDate, false));
}

function addTask(t) {
    taskList.push(t)
    // call a web api to update the database on the server
    var request = new XMLHttpRequest();
    request.open("POST", "http://127.0.0.1:5000/api/update/", true);
    request.setRequestHeader("Access-Control-Allow-Origin", "http://127.0.0.1:5000/api/update/");
    request.setRequestHeader("Content-Type", "application/json");
    request.send(JSON.stringify(taskList));

    render();

    console.log(taskList)
}
function fetchData() {
  var request = new XMLHttpRequest();
  request.open("GET", "http://localhost:5000/api/todo/", true);
  request.onload = function () {
    if (request.status === 200) {
      let data = JSON.parse(request.responseText);
      newList = data;
      for (let i = 0; i < newList.length; i++) {
      task = new Task(
        newList[i].name,
        newList[i].currentDate,
        newList[i].isDone,
        newList[i].dueDate,
        newList[i].taskId
      );
      // check.push(taskList[i].taskId);
      console.log(task);
      taskList.push(task);
      render();
    }
    // console.log(check);
    return data;
  }
};
request.send();
}

function init() {
    console.log("init called");
    fetchData();
    render();
}

init();
