// Selectors
const todoInput = document.querySelector('.todo-input');
const todoButton = document.querySelector('.todo-button');
const todoList = document.querySelector('.todo-list');
const filterOption = document.querySelector('.filter-todo');

// Event Listeners
document.addEventListener('DOMContentLoaded', getTodos);
todoButton.addEventListener('click', addTodo);
todoList.addEventListener('click', deleteCheck);
filterOption.addEventListener('click', filterTodo);

// Functions
function addTodo(event){
    // Prevent form from submitting
    event.preventDefault()

    // A simple test to make sure the button works
    //console.log("hello");

    // Todo div
    const todoDiv = document.createElement('div');
    todoDiv.classList.add('todo');

    // Create LI
    const newTodo = document.createElement('li');
    // Using todoInput's value (from the form) as the text inside our todo items
    // Pulls from the HTML form's 'input' tag
    newTodo.innerText = todoInput.value;
    newTodo.classList.add('todo-item');

    //Inserting the Todo into the Div
    todoDiv.appendChild(newTodo);

    // Save todo to local storage
    saveLocalTodos(newTodo);

    // Completed button
    const completedButton = document.createElement('button');
    //Adding HTML FontAwesome image inside of the button
    completedButton.innerHTML = '<i class="fas fa-check"></i>';
    completedButton.classList.add("complete-btn");
    todoDiv.appendChild(completedButton);

    // Trash button
    const trashButton = document.createElement('button');
    //Adding HTML FontAwesome image inside of the button
    trashButton.innerHTML = '<i class="fas fa-trash"></i>';
    trashButton.classList.add("trash-btn");
    todoDiv.appendChild(trashButton);

    // Append to list
    todoList.appendChild(todoDiv);

    // Clear Todo input value
    todoInput.value = "";
}

function deleteCheck(event){
    // item is just the check/trash button itself -- accessing the Parent of the list item is necessary to modify the entire thing
    const item = event.target;

    // Delete todo
    if (item.classList[0] === "trash-btn"){
        // Animation on the list item
        todoElement = item.parentElement;
        todoElement.classList.add('fall');
        removeLocalTodos(todoElement);
        // Waiting for the transition to end -- from the CSS
        todoElement.addEventListener('transitionend', function(){
            todoElement.remove();
        });
    }

    // If the check button is pressed, mark the item as being "completed"
    if (item.classList[0] === "complete-btn"){
        item.parentElement.classList.toggle('completed');
    }
}


function filterTodo(event){
    const todos = todoList.childNodes;

    todos.forEach(function(todo){
        // There are some items in todos that are not DIVs...it would be nice to be able to remove them. 
        if (todo.tagName != 'DIV'){
 //           console.log("not a div");
        }
        
        // Validity checking -- some of the elements of 'todo' are empty text elements, so I make sure that only divs can make it into this function
        if(todo.tagName == 'DIV'){
            switch(event.target.value){
                case "all":
                    todo.style.display = 'flex';
                    break;
                case "completed":
                    if(todo.classList.contains('completed')){
                        todo.style.display = 'flex';
                    }
                    else{
                        todo.style.display = 'none';
                    }
                    break;
                case "uncompleted":
                    if(!todo.classList.contains("completed")){
                        todo.style.display = "flex";
                    }
                    else{
                        todo.style.display = "none";
                    }
                    break;
            }
        }
    });
}

function saveLocalTodos(todo){
    // todo is the entire div at first -- just set it equal to the text inside in order to save that. 
    todo = todo.innerText;
    let todos;
    console.log(todo.innerText);
    if (localStorage.getItem('todos') === null){
        todos = [];
    }
    else{
        todos = JSON.parse(localStorage.getItem('todos'));
    }

    todos.push(todo);
    console.log(todos);
    localStorage.setItem('todos', JSON.stringify(todos));
}

function getTodos(){
    let todos;
    if (localStorage.getItem('todos') === null){
        todos = [];
    }
    else{
        todos = JSON.parse(localStorage.getItem('todos'));
    }

    todos.forEach(function(todo){
         // Todo div
//        console.log(todo);

        const todoDiv = document.createElement('div');
        todoDiv.classList.add('todo');

        // Create LI
        const newTodo = document.createElement('li');
        // Using todoInput's value (from the form) as the text inside our todo items
        // Pulls from the HTML form's 'input' tag
        newTodo.innerText = todo;
        newTodo.classList.add('todo-item');

        //Inserting the Todo into the Div
        todoDiv.appendChild(newTodo);

        // Completed button
        const completedButton = document.createElement('button');
        //Adding HTML FontAwesome image inside of the button
        completedButton.innerHTML = '<i class="fas fa-check"></i>';
        completedButton.classList.add("complete-btn");
        todoDiv.appendChild(completedButton);

        // Trash button
        const trashButton = document.createElement('button');
        //Adding HTML FontAwesome image inside of the button
        trashButton.innerHTML = '<i class="fas fa-trash"></i>';
        trashButton.classList.add("trash-btn");
        todoDiv.appendChild(trashButton);

        // Append to list
        todoList.appendChild(todoDiv);
            
    });
}

function removeLocalTodos(todo){
    let todos;
    if (localStorage.getItem('todos') === null){
        todos = [];
    }
    else{
        todos = JSON.parse(localStorage.getItem('todos'));
    }
    const todoIndex = (todo.children[0].innerText); 
    todos.splice(todos.indexOf(todoIndex), 1);

    localStorage.setItem('todos', JSON.stringify(todos));
}
