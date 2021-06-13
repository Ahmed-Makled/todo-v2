/**********************************************************
 * Define Global Variables
 *
 **********************************************************/
const heads = ["id", "title", "description", "status", "important"];
let btnCreate = document.getElementById("btn-create");
let contentTodo = document.getElementById("content-todo");
let modal = document.getElementById("exampleModal");
const getAllData = () => JSON.parse(localStorage.getItem("tasks")) || [];
const setAllData = (tasks) =>
  localStorage.setItem("tasks", JSON.stringify(tasks));
let tasks = getAllData();

/**********************************************************
 * End Global Variables
 *
 * Start Helper Functions
 *
 **********************************************************/
/**
 * @description Create New Task
 * @param
 * @return
 */

if (localStorage.getItem("tasks")) {
  // Spilt value of text area and convert it to list item

  tasks.forEach((Element) => {
    let txtSplit = Element.description
      .split("\n")
      .filter((line) => line.trim() !== "")
      .map((line) => `<li class="item">${line}</li>`)
      .join("");
    contentTodo.innerHTML += `
      <div class="col-3">
      <div class="card text-dark mb-3 shadow bg-body rounded important" style="max-width: 18rem;min-height: 18rem">
          <div class="card-header fw-bold " style="background-color: #ffe6e7;border:none">${Element.id}-${Element.title}
          </div>
          <div class="card-body">
        <ul>
        ${txtSplit}
        </ul>
          </div>
          <div class="card-footer bg-body " style="border:none">
              <i class="fas fa-trash-alt float-end remove" data-remove="${Element.id}"style="color: '#5dc250';cursor: pointer;"></i>
              
              <i class="fas fa-edit mr-3 float-end mx-2 edit" data-bs-toggle="modal"
              data-bs-target="#edit" style="color:'#5dc250';cursor: pointer;"></i>
              
              <!-- Modal -->
              <div class="modal fade text-start" id="edit" tabindex="-1"
                  aria-labelledby="exampleModalLabel" aria-hidden="true">
                  <div class="modal-dialog">
                      <div class="modal-content">
                          <div class="modal-header">
                              <h5 class="modal-title" id="exampleModalLabel">Create New Task</h5>
                              <button type="button" class="btn-close" data-bs-dismiss="modal"
                                  aria-label="Close"></button>
                          </div>
                          <div class="modal-body">
                              <form id="add">
                                  <div class="mb-3">
                                      <label class="col-form-label">ID:</label>
                                      <input type="number" class="form-control" id="id" name="id" value="${Element.id}">

                                  </div>
                                  <!--Title-->
                                  <div class="mb-3">
                                      <label class="col-form-label">Title:</label>
                                      <input type="text" class="form-control" id="title" name="title">
                                      <span class="valid"></span>

                                  </div>
                                  <!--Description-->
                                  <div class="mb-3">
                                      <label for="description" class="col-form-label">Description:</label>
                                      <textarea class="form-control" id="description"
                                          name="description"></textarea>
                                      <span class="valid-2 "></span>
                                  </div>

                                  <!--status-->
                                  <div class="form-check">
                                      <input class="form-check-input" type="checkbox" value=""
                                          id="flexCheckChecked" name="status">
                                      <label class="form-check-label" for="flexCheckChecked">
                                          Status
                                      </label>
                                  </div>
                                  <div class="form-check form-check-inline">
                                      <input class="form-check-input" type="radio" name="important"
                                          id="important" value="important">
                                      <label class="form-check-label" for="important">Important</label>
                                  </div>
                                  <div class="form-check form-check-inline">
                                      <input class="form-check-input" type="radio" name="important"
                                          id="not important" value="not important">
                                      <label class="form-check-label" for="not important"> Not Important
                                      </label>
                                  </div>
                                  <div class="modal-footer">
                                      <button type="button" class="btn btn-secondary"
                                          data-bs-dismiss="modal">Cancel</button>
                                      <button type="submit" id="btn-create" type="button"
                                          class="btn btn-primary">Create</button>
                                  </div>
                              </form>
                          </div>

                      </div>
                  </div>
              </div>
          </div>
      </div>
  </div>`;
  });

  btnRemoveTask = document.querySelectorAll(".remove");
  btnRemoveTask.forEach((btn) => {
    btn.addEventListener("click", function () {
      btn.parentNode.parentNode.parentNode.remove();
      let attr = btn.dataset.remove;
      let attrLocal = getAllData();
      let attrFiltter = attrLocal.filter((element) => {
        return element.id !== attr;
      });
      setAllData(attrFiltter);
    });
  });

  // item = document.querySelector(".item");
  // btnEditTask = document.querySelectorAll(".edit");
  // btnEditTask.forEach((btn) => {
  //   btn.addEventListener("click", function () {
  //     editTask(item);
  //   });
  // });
}

/**
 * @description Edit Task
 * @param e
 * @return
 */
const editTask = (e) => {
  console.log(e);
};

/**
 * @description toggle Modal
 * @param
 * @return
 */
const toggleModal = () => {
  modal.style = "display:none";
  modal.removeAttribute("role");
  modal.classList.toggle("show");
  const toggleBackDrop = () => {
    document.querySelector(".modal-backdrop").style = "display:none";
    document.querySelector(".modal-backdrop").classList.toggle("show");
  };
  toggleBackDrop();

  // if (document.body.contains(".modal-backdrop")) {
  //   document.querySelector(".modal-backdrop").remove();
  // }
};

/**********************************************************
 * End Helper Variables
 *
 * Start Main Functions
 *
 **********************************************************/

/**
 * @description Create Custom Elements
 * @param Parent, "tagName", "classes", attributes{ket:"value"}, textContent
 * @return Element
 */
const creatElement = (parent, tag, attributes, textContent) => {
  const Element = document.createElement(tag); //Creat Element
  parent.appendChild(Element); // Add Element To Parent
  const attrKeys = Object.keys(attributes); //get key of object
  // loop to set key as attr and value of key as value attr
  for (let key of attrKeys) {
    Element.setAttribute(key, attributes[key]);
  }
  // check param textContent add or not
  if (textContent) {
    // add text content to element
    Element.textContent = textContent;
  }
  return Element;
};

/**
 * @description Post New Task To Local Storage
 * @param e
 * @return
 */
const postTask = (e) => {
  e.preventDefault();
  let newTask = {
    id: tasks.length + 1,
  };
  heads.forEach((i, j) => {
    if (i != 0 && j !== "status") {
      newTask[i] = e.target.elements[i].value;
    } else if (j == "status") {
      newTask[i] = e.target.elements[i].checked;
    }
  });

  console.log(newTask);
  // Spilt value of text area and convert it to list item
  let txtSplit = newTask.description
    .split("\n")
    .filter((line) => line.trim() !== "")
    .map((line) => `<li class="item">${line}</li>`)
    .join("");

  //check input empty or not
  if (newTask.title == "") {
    document.querySelector(".valid").textContent = "Please add title";
  } else if (newTask.description == "") {
    document.querySelector(".valid").textContent = "";
    document.querySelector(".valid-2").textContent = "Please add Desciption";
  } else {
    document.querySelector(".valid-2").textContent = "";
    contentTodo.innerHTML += `
    <div class="col-3">
    <div class="card text-dark mb-3 shadow bg-body rounded important" style="max-width: 18rem; min-height:18rem">
        <div class="card-header fw-bold " style="background-color: #ffe6e7;border:none">${newTask.id}- ${newTask.title}
        </div>
        <div class="card-body">
      <ul>
      ${txtSplit}
      </ul>
        </div>
        <div class="card-footer bg-body " style="border:none">
            <i class="fas fa-trash-alt float-end remove" data-remove="${newTask.id}"style="color: '#5dc250';cursor: pointer;"></i>
            <i class="fas fa-edit mr-3 float-end mx-2 edit " data-bs-toggle="modal"
            data-bs-target="#edit"style="color: '#5dc250';cursor: pointer;">           
            
            </i>
            
            <!-- Modal -->
            <div class="modal fade text-start" id="edit" tabindex="-1"
                aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div class="modal-dialog">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title" id="exampleModalLabel">Create New Task</h5>
                            <button type="button" class="btn-close" data-bs-dismiss="modal"
                                aria-label="Close"></button>
                        </div>
                        <div class="modal-body">
                            <form id="add">
                                <div class="mb-3">
                                    <label class="col-form-label">ID:</label>
                                    <input type="number" class="form-control" id="id" name="id" value="${newTask.id}">

                                </div>
                                <!--Title-->
                                <div class="mb-3">
                                    <label class="col-form-label">Title:</label>
                                    <input type="text" class="form-control" id="title" name="title">
                                    <span class="valid"></span>

                                </div>
                                <!--Description-->
                                <div class="mb-3">
                                    <label for="description" class="col-form-label">Description:</label>
                                    <textarea class="form-control" id="description"
                                        name="description"></textarea>
                                    <span class="valid-2 "></span>
                                </div>

                                <!--status-->
                                <div class="form-check">
                                    <input class="form-check-input" type="checkbox" value=""
                                        id="flexCheckChecked" name="status">
                                    <label class="form-check-label" for="flexCheckChecked">
                                        Status
                                    </label>
                                </div>
                                <div class="form-check form-check-inline">
                                    <input class="form-check-input" type="radio" name="important"
                                        id="important" value="important">
                                    <label class="form-check-label" for="important">Important</label>
                                </div>
                                <div class="form-check form-check-inline">
                                    <input class="form-check-input" type="radio" name="important"
                                        id="not important" value="not important">
                                    <label class="form-check-label" for="not important"> Not Important
                                    </label>
                                </div>
                                <div class="modal-footer">
                                    <button type="button" class="btn btn-secondary"
                                        data-bs-dismiss="modal">Cancel</button>
                                    <button type="submit" id="btn-create" type="button"
                                        class="btn btn-primary">Create</button>
                                </div>
                            </form>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    </div>
</div>`;

    btnRemoveTask = document.querySelectorAll(".remove");
    btnRemoveTask.forEach((btn) => {
      btn.addEventListener("click", function () {
        btn.parentNode.parentNode.parentNode.remove();
      });
    });

    let data = getAllData();
    data.push(newTask);
    setAllData(data);
    toggleModal();
    document.getElementById("add").reset();
  }
};

/**********************************************************
 * End Main Functions
 * Begin Events
 *
 **********************************************************/
// Event Click to add New Task

document.getElementById("add").addEventListener("submit", postTask);
// var myModalEl = document.getElementById('myModal')
// var modal = bootstrap.Modal.getInstance(myModalEl) // Returns a Bootstrap modal instance
