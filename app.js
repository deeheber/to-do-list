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

  //Append the List Item to the incompleteTasksHolder
  incompleteTasksHolder.appendChild(listItem);

  //Add Events to the Buttons/checkbox
  bindTaskEvents(listItem, taskComplete);

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

  completeTasksHolder.appendChild(listItem);
  bindTaskEvents(listItem, taskIncomplete);
};

var taskIncomplete = function(){
  var listItem = this.parentNode;

  incompleteTasksHolder.appendChild(listItem);
  bindTaskEvents(listItem, taskComplete);
};

/** events **/
var bindTaskEvents = function(listItem, checkBoxEventHandler){
  var checkBox = listItem.querySelector('input[type=checkbox]');
  var editButton = listItem.querySelector('.edit');
  var deleteButton = listItem.querySelector('.delete');

  checkBox.onchange = checkBoxEventHandler;
  editButton.onclick = editTask;
  deleteButton.onclick = deleteTask;
};

taskInputButton.onclick = addTask;

for(var i=0; i<incompleteTasksHolder.children.length; i++){
  bindTaskEvents(incompleteTasksHolder.children[i], taskComplete);
}

for(var i=0; i<completeTasksHolder.children.length; i++){
  bindTaskEvents(completeTasksHolder.children[i], taskIncomplete);
}
