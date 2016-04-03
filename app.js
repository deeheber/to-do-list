var taskInput = document.getElementById('newTask');
var taskInputButton = document.querySelector('.add');
var incompleteTasksHolder = document.getElementById('incompleteTasks');
var completeTasksHolder = document.getElementById('completeTasks');

//add task
var addTask = function(){
  console.log('adding task...');
  //pull the value from the input
  var taskName = taskInput.value;
  //create a list item
    //checkbox
    //task name
    //edit button
    //delete button

  //append the li to the incompleteTasksHolder
  //add bind task events???
  //empty out the input
};

//edit task
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

//delete task
var deleteTask = function(){
  console.log('deleting task...');
  //when delete button is pressed
  //select the list item
  //remove the li from the DOM
};

//mark task complete
var taskComplete = function(){
  console.log('task marked complete...');
  //when checkbox is checked
  //select list item
  //remove from incompleteTasks UL
  //add to completeTasks UL
  //check the checkbox
};

//mark task incomplete
var taskIncomplete = function(){
  console.log('task marked incomplete...');
  //when checkbox is unchecked
  //select list item
  //remove from completeTasks UL
  //add to incompleteTasks UL
  //uncheck the checkbox
};

//events
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
