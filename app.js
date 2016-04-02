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

  var checkBox = listItem.querySelector('input[type=checkbox]');
  var editButton = listItem.querySelector('.edit');
  var deleteButton = listItem.querySelector('.delete');
  
  checkBox.onchange = checkBoxEventHandler;
  editButton.onclick = editTask;
  deleteButton.onclick = deleteTask;
};

for(var i=0; i<incompleteTasksHolder.children.length; i++){
  bindTaskEvents(incompleteTasksHolder.children[i], taskComplete);
}

for(var i=0; i<completeTasksHolder.children.length; i++){
  bindTaskEvents(completeTasksHolder.children[i], taskIncomplete);
}
