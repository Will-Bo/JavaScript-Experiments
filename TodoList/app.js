// Selectors
const todoInput = document.querySelector('.todo-input');
const todoButton = document.querySelector('.todo-button');
const todoList = document.querySelector('.todo-list');

// Event Listeners
todoButton.addEventListener('click', addTodo);
todoList.addEventListener('click', deleteCheck);

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
        item.parentElement.remove();
    }

    // If the check button is pressed, mark the item as being "completed"
    if (item.classList[0] === "complete-btn"){
        item.parentElement.classList.toggle('completed');
    }
}

