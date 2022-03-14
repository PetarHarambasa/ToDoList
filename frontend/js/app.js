const todoInput = document.querySelector('.todo-input');
const todoButton = document.querySelector('.todo-button');
const todoList = document.querySelector('.todo-list');
const filterOption = document.querySelector('.filter-todo');

document.addEventListener('DOMContentLoaded', getTodos);
todoButton.addEventListener('click', addTodo);
todoList.addEventListener('click', deleteCheck);
filterOption.addEventListener('click', filterTodo);


function addTodo(event) {
    
    //da se ne loada page cijelo vrijeme dok se izvrasava funkcija
    event.preventDefault(); 

    if (todoInput.value.trim() === "") {
        return Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Something went wrong!'
        });
    }

    const todoDiv = document.createElement('div');
    todoDiv.classList.add('todo');

    const newTodo = document.createElement('li');
    newTodo.innerText = todoInput.value;
    newTodo.classList.add('todo-item');
    todoDiv.appendChild(newTodo);

    //savelocalToDos(todoInput.value);

    const completedButton = document.createElement('button');
    completedButton.innerHTML = '<i class="fas fa-check"><i/>';
    completedButton.classList.add('complete-btn');
    todoDiv.appendChild(completedButton);

    const trashButton = document.createElement('button');
    trashButton.innerHTML = '<i class="fas fa-trash"><i/>';
    trashButton.classList.add('trash-btn');
    todoDiv.appendChild(trashButton);

    todoList.appendChild(todoDiv);

    todoInput.value = "";
}

function deleteCheck(e) {
    const item = e.target;
    if (item.classList[0] === 'trash-btn') {
        const todo = item.parentElement;
        todo.classList.add('fall');
        removeLocalTodos(todo);
        todo.addEventListener('transitionend', function () {
            todo.remove();
        });
    }

    if (item.classList[0] === 'complete-btn') {
        const todo = item.parentElement;
        todo.classList.toggle('completed');
    }
}

function filterTodo(e) {
    const todos = todoList.childNodes;
    todos.forEach(function (todo) {
        switch (e.target.value) {
            case "all":
                todo.style.display = 'flex';
                break;
            case "completed":
                if (todo.classList.contains('completed')) {
                    todo.style.display = 'flex';
                } else {
                    todo.style.display = 'none';
                }
                break;
            case "uncompleted":
                if (!todo.classList.contains('completed')) {
                    todo.style.display = 'flex';
                } else {
                    todo.style.display = 'none';
                }
                break;

        }
    });
}

function savelocalToDos(todo) {
    let todos;
    if (localStorage.getItem('todos') === null) {
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem('todos'));
    }
    todos.push(todo);
    localStorage.setItem('todos', JSON.stringify(todos));
}

function getTodos() {
    let todos;
    if (localStorage.getItem("todos") === null) {
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem('todos'));
    }
    todos.forEach(function (todo) {
        const todoDiv = document.createElement('div');
        todoDiv.classList.add('todo');

        const newTodo = document.createElement('li');
        newTodo.innerText = todo;
        newTodo.classList.add('todo-item');
        todoDiv.appendChild(newTodo);

        const completedButton = document.createElement('button');
        completedButton.innerHTML = '<i class="fas fa-check"><i/>';
        completedButton.classList.add('complete-btn');
        todoDiv.appendChild(completedButton);

        const trashButton = document.createElement('button');
        trashButton.innerHTML = '<i class="fas fa-trash"><i/>';
        trashButton.classList.add('trash-btn');
        todoDiv.appendChild(trashButton);

        todoList.appendChild(todoDiv);
    });
}

function removeLocalTodos(todo) {
    let todos;
    if (localStorage.getItem('todos') === null) {
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem('todos'));
    }
    const todoIndex = todo.children[0].innerText;
    todos.splice(todos.indexOf(todoIndex), 1);
    localStorage.setItem('todos', JSON.stringify(todos));
}

function pullToDos(todo) {
    const todoDiv = document.createElement('div');
    todoDiv.classList.add('todo');

    newTodo = document.createElement('li');
    newTodo.innerText = todo.Name;
    newTodo.classList.add('todo-item');
    newTodo.setAttribute("id", todo.IDTask)
    todoDiv.appendChild(newTodo);

    const completedButton = document.createElement('button');
    completedButton.innerHTML = '<i class="fas fa-check"><i/>';
    completedButton.classList.add('complete-btn');
    completedButton.setAttribute("onclick", "updateToDo()")
    completedButton.setAttribute("checked", todo.Checked)
    todoDiv.appendChild(completedButton);

    const trashButton = document.createElement('button');
    trashButton.innerHTML = '<i class="fas fa-trash"><i/>';
    trashButton.classList.add('trash-btn');
    trashButton.setAttribute("onclick", "deleteToDo()")
    todoDiv.appendChild(trashButton);

    todoList.appendChild(todoDiv);
}

$(document).ready(function () {
    getRealToDos()
});

function getRealToDos() {
    $.ajax({
        type: 'GET',
        url: 'http://localhost:5500/api/todo',
        dataType: 'JSON'
    })
    .success(function(data) {
        for (const i in data)
        {
            $(pullToDos(data[i]));
        }

    });
}

function saveToDo() {
    const ToDo = [{ 'name': todoInput.value}]
    $.ajax({
        type: 'POST',
        url: 'http://localhost:5500/api/todo',
        contentType: "application/json;charset=utf-8",
        data: JSON.stringify(ToDo[0])
    })
    .success(function(data) {
        console.log('POST response:', JSON.stringify(data, "", 2));
    })
}

function updateToDo() {
    const swap = [{ 'checked': true}]
    const value = document.querySelector('.todo-item')
    $.ajax({
        type: 'PUT',
        url: 'http://localhost:5500/api/todo/' + value.getAttribute('id'),
        contentType: "application/json;charset=utf-8",
        data: JSON.stringify(swap[0])
    })
    .success(function(data) {
        console.log('PUT response:', JSON.stringify(data, "", 2));
    });
}

function deleteToDo() {
    const value = document.querySelector('.todo-item')
    $.ajax({
        type: 'DELETE',
        url: 'http://localhost:5500/api/todo/' + value.getAttribute('id')
    }) 
    .success(function(data) {
        console.log('DELETE response:', JSON.stringify(data, "", 2));
    });
}