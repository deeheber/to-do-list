var taskInput = document.getElementById('newTask');
var taskInputButton = document.querySelector('.add');
var deleteConfirmation = document.getElementById('deleteConfirmation');
var incompleteTasksHolder = document.getElementById('incompleteTasks');
var completeTasksHolder = document.getElementById('completeTasks');
var localStorageKey = '';

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

  if(deleteConfirmation.checked == true){
    var userConfirmation = confirm('Are you sure you want to delete this task?');
    if(userConfirmation == true){
      listItem.parentNode.removeChild(listItem);
    }
  }
  else {
    listItem.parentNode.removeChild(listItem);
  }
};

var taskComplete = function(localStorageKey){
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
var storeTasks = function(localStorageKey, taskHolder){

  var tempStorageArray = [];

  for(var i=0; i<taskHolder.children.length; i++){
    var listItem = taskHolder.children[i];
    var label = listItem.querySelector('label');

    var itemContainer = {};

    itemContainer.name = label.textContent;

    if(listItem.classList == 'editMode'){
      itemContainer.editMode = true;
    }
    else {
      itemContainer.editMode = false;
    }

    tempStorageArray.push(itemContainer);

  }

  localStorage.setItem(localStorageKey, JSON.stringify(tempStorageArray));

  //Delete confirmation check box
  var confirmationEnabled = deleteConfirmation.checked;
  localStorage.setItem('confirmationEnabled', JSON.stringify(confirmationEnabled));
}

var getTasks = function(localStorageKey, taskHolder, checkBoxEventHandler){

  var tempStorageArray = JSON.parse(localStorage.getItem(localStorageKey)) || [];

  for(var i=0; i<tempStorageArray.length; i++){
    var arrayItem = tempStorageArray[i];

    //Create List Item Element and Children
    var listItem = document.createElement('li');
    var checkBox = document.createElement('input');
    var label = document.createElement('label');
    var textInput = document.createElement('input');
    var editButton = document.createElement('button'); //edit button
    var deleteButton = document.createElement('button'); //delete button

    //Modify Children Elements
    checkBox.type = 'checkbox';
    if(localStorageKey == 'completeTasks'){
      checkBox.checked = true;
    }
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

    taskHolder.appendChild(listItem);

    bindTaskEvents(listItem, checkBoxEventHandler);
  }

  //Delete confirmation checkbox
  deleteConfirmation.checked = JSON.parse(localStorage.getItem('confirmationEnabled')) || false;

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

taskInput.addEventListener('keyup', function(event){
    //if the enter key is pressed
    if(event.keyCode == 13){
      addTask();
    }
});

//events for persistence
window.addEventListener('beforeunload', function(){
  //incomplete tasks
  localStorageKey = 'incompleteTasks';
  storeTasks(localStorageKey, incompleteTasksHolder);

  //complete tasks
  localStorageKey = 'completeTasks';
  storeTasks(localStorageKey, completeTasksHolder);
});

window.addEventListener('load', function(){
  //incomplete tasks
  localStorageKey = 'incompleteTasks';
  getTasks(localStorageKey, incompleteTasksHolder, taskComplete);

  //complete tasks
  localStorageKey = 'completeTasks';
  getTasks(localStorageKey, completeTasksHolder, taskIncomplete);
});
