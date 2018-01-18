// Code goes here

var todos = ['item 1', 'item 2', 'item 3']

var todolist = {
  
  todos : [],
  show : function(){
    console.log(this.todos)
  },
  add : function(new_element){
    this.todos.push({ todotext : new_element, completed : false});
    this.show();
  },
  delete: function(position){
    this.todos.splice(position,1);
  },
  changetodotext : function(element_index, new_value){
    this.todos[element_index].todotext = new_value;
    this.show();
  },
  togglecompleted : function(element_index){
    this.todos[element_index].completed = !this.todos[element_index].completed;
    this.show();
  },
  showtodotext : function(){
    if (this.todos.length === 0) {
      console.log('Your todo list is empty');
    }
    else {
      for (var i=0;i<this.todos.length;i++){
        if (this.todos[i].completed === true) {
         console.log('(x) - ',this.todos[i].todotext); 
        }
        else{
          console.log('() - ',this.todos[i].todotext);
        }
      }
    }
  },
  toggleall : function(){
    var alltodos = this.todos.length;
    var completedtodos = 0;
    for (var i=0; i<alltodos;i++){
      if (this.todos[i].completed === true) {
        completedtodos++;
      }
    }
    if (completedtodos === alltodos){
      for (var i=0; i<alltodos; i++){
        this.todos[i].completed = false;
      }
    }
    else {
      for (var i=0; i<alltodos; i++){
        this.todos[i].completed = true;
      }
    }
    }
  }

/*
var displaytodos = document.getElementById('display_todos');
console.log('display todos');

var toggleall = document.getElementById('toggle_all');
console.log('toggle all');

displaytodos.addEventListener('click',function(){
  todolist.showtodotext();
});

toggleall.addEventListener('click',function(){
  todolist.toggleall();
});
*/

var handlers = {
  display_todos : function(){
    todolist.showtodotext();
  },
  toggle_all : function(){
    todolist.toggleall();
    view.displaytodos();
  },
  add: function(){
    var new_element = document.getElementById('new_element');
    if (new_element.value === ''){
      //new_element.value = 'Please enter a value';
    }
    else{
      todolist.add(new_element.value);
      new_element.value = '';  
      view.displaytodos();
    }
    /* 
    var todoul = document.querySelector('ul');
    var newli = document.createElement('li');
    todoul.appendChild(newli);
    */
  },
  changetodotext : function(){
    var element = document.getElementById('new_element_to_be_added');
    var position = document.getElementById('position_changed');
    todolist.changetodotext(position.valueAsNumber,element.value);
    element.value = '';
    position.value = '';
    view.displaytodos();
  },
  delete: function(position) {
    todolist.delete(position);
    view.displaytodos();
  },
  togglecompleted: function(position){
    //var position = document.getElementById('toggle_position');
    todolist.togglecompleted(position);
    //position.value = '';
    view.displaytodos();
  },
}


var todoul = document.querySelector('ul');


var view = {
  displaytodos: function(){
    //var todoul = document.querySelector('ul');
    todoul.innerHTML = '';
    for (var i=0;i < todolist.todos.length;i++){
      var newli = document.createElement('li');
      newli.setAttribute('class','text-success');
      var todotextwithstatus = '';
      if (todolist.todos[i].completed === true){
        todotextwithstatus = '(X) - ' + todolist.todos[i].todotext + ' --> ';
      }
      else{
        todotextwithstatus = '( ) - ' + todolist.todos[i].todotext + ' --> ';
      }
      
      newli.id = i;
      newli.textContent = todotextwithstatus;
      delbtn = this.createdeletebutton();
      statusbtn = this.createstatusbutton();
      newli.appendChild(statusbtn);
      newli.appendChild(delbtn);
      todoul.appendChild(newli);
    }
  },
  createdeletebutton: function(){
    var delbtn = document.createElement('button');
    delbtn.textContent = 'Delete';
    delbtn.className = 'DeleteElement';
    return delbtn;
  },
  createstatusbutton: function(){
    var statusbtn = document.createElement('button');
    statusbtn.textContent = 'Change Status';
    statusbtn.className = 'changestatusbutton';
    return statusbtn;
  },
  setupeventlisteners: function(){
    todoul.addEventListener('click',function(event){

    if (event.target.className === 'DeleteElement'){
      console.log(parseInt(event.target.parentNode.id));
      handlers.delete(parseInt(event.target.parentNode.id));
    }

    if (event.target.className == 'changestatusbutton'){
        console.log(parseInt(event.target.parentNode.id));
        handlers.togglecompleted(parseInt(event.target.parentNode.id));
    }
    });
  },
  addhitenter: function(){
    document.querySelector("#new_element").addEventListener("keyup", event => {
      if(event.key !== "Enter") return;
      document.querySelector("#add_todo").click();
      event.preventDefault(); 
    });
  },
};


view.setupeventlisteners();
view.addhitenter();
