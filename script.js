const todoList = [];
const todoField = document.querySelector("#task");
const section = document.querySelector("section");

let template = `
  <h2>Things I need to do:</h2>
  <ul></ul>

`
section.innerHTML = template;

document.querySelector("#todoForm").addEventListener('submit', function(event) {
  event.preventDefault();

  let itemObject = {
    item : todoField.value,
    buttonOptions : `
      <span class="checkCompleted" value="completed">✔️</span>
      <span class="itemDelete" value="delete">✖️</span>
    `,
    status : "active",
    }

    todoList.push(itemObject);

    function buildList() {     
      const listTemplate = todoList.map(entry => `
        <li><p class="${entry.status}">${entry.item}</p>${entry.buttonOptions}</li>
        `);
      document.querySelector("ul").innerHTML = listTemplate.join('');

    const li = document.querySelectorAll("li");

    for(let i=0; i < li.length; i++) {
      li[i].addEventListener("click", function(e) {
        if (e.target.getAttribute("class") === "checkCompleted") {
          if (todoList[i]["status"] === "active") {
            todoList[i]["status"] = "done";
            buildList();
            } else if (todoList[i]["status"] === "done") {
            todoList[i]["status"] = "active";
            buildList();
            }  
        } else if (e.target.getAttribute("class") === "itemDelete") {
          todoList.splice([i],1)
          buildList();
        }
      });
    }
  }

  buildList();
  todoForm.reset();

});


