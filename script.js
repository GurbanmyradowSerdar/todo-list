let tasks = [];

function addTask(task) {
  // container
  let taskCon = document.createElement("div");
  taskCon.className = "form__column";
  taskCon.id = "form__column";

  // cross button
  let a = document.createElement("a");
  a.className = "form__cross-button";

  // crosses img
  let img = document.createElement("img");
  img.src = "cross.png";
  img.className = "form__cross-img";
  a.appendChild(img);
  taskCon.appendChild(a);

  // remove block if click cross
  a.onclick = () => {
    taskCon.remove();
    // if we deleted taskCont we del it inn array
    tasks = tasks.filter((elem) => {
      return elem.id !== task.id;
    });
  };

  // checkbox
  let input = document.createElement("input");
  input.type = "checkbox";
  input.className = "from__checkbox";
  taskCon.appendChild(input);

  // users value
  let p = document.createElement("p");
  p.className = "from__description";
  p.innerHTML = task.title;

  // Checking texts stye line-trough or no
  if (!task.text) {
    p.className = "from__description";
  } else {
    p.className = "from__description-line";
  }

  // if user click checkbox
  input.onclick = () => {
    if (p.className === "from__description-line") {
      p.className = "from__description";
      change(task, false);
    } else {
      p.className = "from__description-line";
      change(task, true);
    }
  };

  taskCon.appendChild(p);

  // add our container in parent
  document.getElementById("tasks").appendChild(taskCon);
}

// with we click on ADD
function add() {
  let title = document.getElementById("input").value;
  let task = {
    id: parseInt(Math.random() * 100),
    title: title,
    text: false,
    status: "PENDING",
  };
  addTask(task);
  tasks.push(task);
}

// if the checkbox pressed we change this in object value in array
function change(task, bool) {
  tasks = tasks.filter((elem, i) => {
    if (elem.id === task.id) {
      elem.text = bool;
    }
    return elem;
  });
}

// save the users acts when we closed site
function save() {
  if (tasks.length > 0) {
    window.localStorage.setItem("tasks", JSON.stringify(tasks));
  }
}

// Loading page
function load() {
  let storage = JSON.parse(window.localStorage.getItem("tasks"));
  if (storage !== null) {
    tasks = storage;
    storage.forEach((element) => {
      addTask(element);
    });
  }
}

// Button clear all
let clear = document.getElementById("clear");
clear.onclick = () => {
  let taskChild = document.getElementsByClassName("form__column");
  let task = [];

  for (let i = 0; i < taskChild.length; i++) {
    task.push(taskChild[i]);
  }

  for (let i = 0; i < task.length; i++) {
    const e = task[i];
    e.remove();
  }

  tasks = [];
  console.log("clear btn");
  window.localStorage.clear();
};
