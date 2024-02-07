const addItem = document.querySelector(".form-group button");
const inputValue = document.querySelector(".form-group input");
const list = document.querySelector(".list");
const deleteAll = document.querySelector(".btn")

inputValue.onkeyup = () => {
  let value = inputValue.value;
  if (value.trim() != 0) {
    addItem.classList.add("active");
  } else {
    addItem.classList.remove("active");
  }
};

addItem.addEventListener("click", handler);
function handler() {
  const userItem = inputValue.value;
  const localStorageData = JSON.parse(localStorage.getItem("todo")) || [];
  localStorageData.push(userItem);
  localStorage.setItem("todo", JSON.stringify(localStorageData));
  showItem()
  addItem.classList.remove("active");
}
function showItem() {
  let localData = localStorage.getItem("todo");
  let listArrey;
  if (localData == null) {
    listArrey = [];
  } else {
    listArrey = JSON.parse(localData);
  }
  let numberTask = document.querySelector(".number-work");
  numberTask.textContent = listArrey.length;
  if(listArrey.length > 0){
    deleteAll.classList.add("active")
  }else{
    deleteAll.classList.remove("active")
  }
  let newTag = "";
  listArrey.forEach((element, index) => {
    newTag += `<li>${element}<span class="icon"><i class="fas fa-trash-alt" onclick ="deleteTask(${index})"></i></span></li>`;
  });
  list.innerHTML = newTag;
  inputValue.value =""
}
showItem();
function deleteTask (index){
    const localStorageData = JSON.parse(localStorage.getItem("todo")) || [];
    const updatedTask = localStorageData.filter((_,i) => i !== index)
    localStorage.setItem("todo",JSON.stringify(updatedTask))
    showItem()
}
deleteAll.addEventListener("click",deleteAllItem)
function deleteAllItem(){
    localStorage.removeItem("todo")
    showItem()
    
}