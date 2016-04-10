var taskInput = document.getElementById('newTask');
var taskInputButton = document.querySelector('.add');
var incompleteTasksHolder = document.getElementById('incompleteTasks');
var completeTasksHolder = document.getElementById('completeTasks');

var addTask = function(){
  //Create List Item Element and Children
  var listItem = document.createElement('li');
  var checkBox = document.createElement('input');
  var label = document.createElement('label');
  var textInput = document.createElement('input');
  var editButton = document.createElement('button'); //edit button
  var deleteButton = document.createElement('button'); //delete button

  //Modify Children Elements
  checkBox.type = 'checkbox';
  label.textContent = taskInput.value;
  textInput.type = 'text';
  editButton.className = 'edit';
  editButton.textContent = 'Edit';
  deleteButton.className = 'delete';
  deleteButton.textContent = 'Delete';

  //Append Children Elements to the List Item
  listItem.appendChild(checkBox);
  listItem.appendChild(label);
  listItem.appendChild(textInput);
  listItem.appendChild(editButton);
  listItem.appendChild(deleteButton);

  //Check for blank input field
  if(taskInput.value.trim().length == 0){
    alert('Oops! Don\'t forget to add your task.');
    taskInput.focus();
  }
  else {
    //Append the List Item to the incompleteTasksHolder
    incompleteTasksHolder.appendChild(listItem);

    //Add Events to the Buttons/checkbox
    bindTaskEvents(listItem, taskComplete);
  }

  //Empty out the input
  taskInput.value = '';
};

var editTask = function(){
  var listItem = this.parentNode;
  var editButton = this;
  var editInput = listItem.querySelector('input[type=text]');
  var label = listItem.querySelector('label');

  listItem.classList.toggle('editMode');

  if(listItem.classList == 'editMode'){
    //edit mode enabled
    editInput.focus();
    editButton.textContent = 'Save';
    editInput.value = label.textContent;
  }
  else {
    //edit mode disabled
    editButton.textContent = 'Edit';
    label.textContent = editInput.value;
  }
};

var deleteTask = function(){
  var listItem = this.parentNode;

  listItem.parentNode.removeChild(listItem);
};

var taskComplete = function(){
  var listItem = this.parentNode;
  var checkBox = this;

  completeTasksHolder.appendChild(listItem);
  checkBox.removeEventListener('change', taskComplete);
  checkBox.addEventListener('change', taskIncomplete);
};

var taskIncomplete = function(){
  var listItem = this.parentNode;
  var checkBox = this;

  incompleteTasksHolder.appendChild(listItem);
  checkBox.removeEventListener('change', taskIncomplete);
  checkBox.addEventListener('change', taskComplete);
};

//persistence stuff
var storeTasks = function(){

  var incompleteTasksArray = [];

  for(var i=0; i<incompleteTasksHolder.children.length; i++){
    var listItem = incompleteTasksHolder.children[i];
    var label = listItem.querySelector('label');

    var itemContainer = {};

    itemContainer.name = label.textContent;

    if(listItem.classList == 'editMode'){
      itemContainer.editMode = true;
    }
    else {
      itemContainer.editMode = false;
    }

    incompleteTasksArray.push(itemContainer);

  }
  //console.log(incompleteTasksArray);
  localStorage.setItem('incompleteTasks', JSON.stringify(incompleteTasksArray));

  //cycle through completeTasks
      //editMode on?
      //push to completeTasks array
      //no more complete tasks = set in local storage

}

var getTasks = function(){
  //on page load
    //go into local storage and get incomplete tasks
    //write those tasks to the DOM
  var incompleteTasksArray = JSON.parse(localStorage.getItem('incompleteTasks'));

  for(var i=0; i<incompleteTasksArray.length; i++){
    var arrayItem = incompleteTasksArray[i];

    //Create List Item Element and Children
    var listItem = document.createElement('li');
    var checkBox = document.createElement('input');
    var label = document.createElement('label');
    var textInput = document.createElement('input');
    var editButton = document.createElement('button'); //edit button
    var deleteButton = document.createElement('button'); //delete button

    //Modify Children Elements
    checkBox.type = 'checkbox';
    label.textContent = arrayItem.name;
    textInput.type = 'text';
    textInput.value = arrayItem.name;
    editButton.className = 'edit';
    if(arrayItem.editMode == false){
      //edit mode disabled
      editButton.textContent = 'Edit';
    }
    else {
      //edit mode enabled
      editButton.textContent = 'Save';
      listItem.className = 'editMode';
    }
    deleteButton.className = 'delete';
    deleteButton.textContent = 'Delete';

    //Append Children Elements to the List Item
    listItem.appendChild(checkBox);
    listItem.appendChild(label);
    listItem.appendChild(textInput);
    listItem.appendChild(editButton);
    listItem.appendChild(deleteButton);

    incompleteTasksHolder.appendChild(listItem);

    bindTaskEvents(listItem, taskComplete);
  }

};

/** events **/
var bindTaskEvents = function(listItem, checkBoxEventHandler){
  var checkBox = listItem.querySelector('input[type=checkbox]');
  var editButton = listItem.querySelector('.edit');
  var deleteButton = listItem.querySelector('.delete');

  checkBox.addEventListener('change', checkBoxEventHandler);
  editButton.addEventListener('click', editTask);
  deleteButton.addEventListener('click', deleteTask);
};

taskInputButton.addEventListener('click', addTask);
window.addEventListener('beforeunload', storeTasks);
window.addEventListener('load', getTasks);

// for(var i=0; i<incompleteTasksHolder.children.length; i++){
//   bindTaskEvents(incompleteTasksHolder.children[i], taskComplete);
// }

for(var i=0; i<completeTasksHolder.children.length; i++){
  bindTaskEvents(completeTasksHolder.children[i], taskIncomplete);
}
