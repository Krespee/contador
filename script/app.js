const submitBtn = document.getElementById("submitBtn");
let toDos = [];

//actualizando los eventos para que los botones y los checbox recien creados puedan funcionar
const updateEvents = () => {
  const deleteBtn = document.querySelectorAll("#deleteBtn");
  const checkBox = document.querySelectorAll("#checkBox");

  checkBox.forEach((e) => {
    e.addEventListener("click", ({ target }) => {
      deleteToDo(target.parentElement.parentElement.children[0].textContent);
    });
  });

  deleteBtn.forEach((e) => {
    e.addEventListener("click", ({ target }) => {
      deleteToDo(target.parentElement.parentElement.children[0].textContent);
    });
  });
};

//añadiendo elementos al html, guardando en la db

const addToDo = (todos) => {
  localStorage.clear();
  const table = document.getElementById("table");
  table.textContent = "";
  for (const key in todos) {
    table.innerHTML += `
    <tr>
      <th scope="row">${key}</th>
      <td>${todos[key].detail}</td>
      <td><input type="checkbox" name="" id="checkBox"></td>
      <td><button id="deleteBtn" class="btn btn-danger">Eliminar</button></td>
    </tr>
  `;
    localStorage.setItem(key, JSON.stringify(todos[key]));
  }
  updateEvents();
};

//cargando ToDos desde la DB

const loadUiList = (todos) => {
  for (let i = 0; i < localStorage.length; i++) {
    const clave = localStorage.key(i);
    const valor = localStorage.getItem(clave);
    if (!isNaN(clave)) {
      todos.push(JSON.parse(valor));
    }
  }
  console.log(todos);
  if (todos != "") {
    addToDo(toDos);
  }
};
loadUiList(toDos);


// Borrando ToDos de la base de datos y del html
const deleteToDo = (id) => {
  const table = document.getElementById("table");
  table.children[id].innerHTML = "";
  toDos.splice(id);
  localStorage.removeItem(id);
};

// Evento del boton Submit

submitBtn.addEventListener("click", (e) => {
  e.preventDefault();
  const input = document.getElementById("inputToDo");
  const toDo = {
    detail: input.value,
    done: false,
  };
  toDos.push(toDo);
  addToDo(toDos);
  input.value = ""
});
