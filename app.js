var taskInput = document.getElementById('newTask');
var taskInputButton = document.querySelector('.add');
var incompleteTasksHolder = document.getElementById('incompleteTasks');
var completeTasksHolder = document.getElementById('completeTasks');

var addTask = function(){
  console.log('adding task...');

  //Create List Item Element and Children
  var listItem = document.createElement('li');
  var checkBox = document.createElement('input');
  var label = document.createElement('label');
  var textInput = document.createElement('input');
  var editButton = document.createElement('button'); //edit button
  var deleteButton = document.createElement('button'); //delete button

  //Modify Children Elements
  checkBox.type = 'checkbox';
  label.innerText = taskInput.value;
  textInput.type = 'text';
  editButton.className = 'edit';
  editButton.innerText = 'Edit';
  deleteButton.className = 'delete';
  deleteButton.innerText = 'Delete';

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
  console.log('editing task...');
  //when edit button is pressed
  //add the .editMode class to the list item
  //change edit button to a save button

  //when save button is pressed
    //grab the text input value
    //remove .editMode
    //make text input value the label text
};

var deleteTask = function(){
  console.log('deleting task...');

  var listItem = this.parentNode;
  listItem.parentNode.removeChild(listItem);
};

var taskComplete = function(){
  console.log('task marked complete...');

  var listItem = this.parentNode;

  completeTasksHolder.appendChild(listItem);
  bindTaskEvents(listItem, taskIncomplete);
};

var taskIncomplete = function(){
  console.log('task marked incomplete...');

  var listItem = this.parentNode;

  incompleteTasksHolder.appendChild(listItem);
  bindTaskEvents(listItem, taskComplete);
};

/** events **/
var bindTaskEvents = function(listItem, checkBoxEventHandler){
  console.log('binding task events...');

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
