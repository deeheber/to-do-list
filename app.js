var taskInput = document.getElementById("newTask");
var incompleteTasksHolder = document.getElementById("incompleteTasks");
var completeTasksHolder = document.getElementById("completeTasks");

//add task
var addTask = function(){
  console.log('adding task...');
};

//edit task
var editTask = function(){
  console.log('editing task...');
};

//delete task
var deleteTask = function(){
  console.log('deleting task...');
};

//mark task complete
var taskComplete = function(){
  console.log('task marked complete...');
};

//mark task incomplete
var taskIncomplete = function(){
  console.log('task marked incomplete...');
};

//events
var bindTaskEvents = function(listItem, checkBoxEventHandler){
  console.log('binding task events...');
  //checkbox
  var checkBox = listItem.querySelector('input[type=checkbox]');
  checkBox.onchange = checkBoxEventHandler;
  //edit button
  var editButton = listItem.querySelector('.edit');
  editButton.onclick = editTask;
  //delete button
  var deleteButton = listItem.querySelector('.delete');
  deleteButton.onclick = deleteTask;
};

for(var i=0; i<incompleteTasksHolder.children.length; i++){
  bindTaskEvents(incompleteTasksHolder.children[i], taskComplete);
}

for(var i=0; i<completeTasksHolder.children.length; i++){
  bindTaskEvents(completeTasksHolder.children[i], taskIncomplete);
}
