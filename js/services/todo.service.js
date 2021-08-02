var gTodos = [];
var gFilterBy = 'all';
var gSortedBy = 'txt';

_createTodos();


function getTodosForDisplay() {
    if (gFilterBy === 'all') return gTodos;

    var todos = gTodos.filter(function(todo) {
        return (gFilterBy === 'active' && !todo.isDone) ||
            (gFilterBy === 'done' && todo.isDone)
    })
    return todos;
}

function getTodosForSorted() {
    if (gSortedBy === 'txt') {
        return sortByTxt(gTodos);
    }
    if (gSortedBy === 'importance') {
        return sortByImportance(gTodos)
    }

    if (gSortedBy === 'created') {
        return sortByCreate(gTodos)
    }
}

function removeTodo(todoId) {
    var isConfirmed = confirm('You sure you want to Delete this task?')
    if (!isConfirmed) return
    var idx = gTodos.findIndex(function(todo) {
        return todo.id === todoId
    })
    gTodos.splice(idx, 1);
    _saveTodosToStorage();
}

function addTodo(txt, importanceNum) {
    var todo = {
        id: _makeId(),
        createAt: getDate(),
        txt: txt,
        isDone: false,
        importance: importanceNum
    }
    gTodos.unshift(todo);
    _saveTodosToStorage()
}

function toggleTodo(todoId) {
    var todo = gTodos.find(function(todo) {
        return todo.id === todoId
    })
    todo.isDone = !todo.isDone;
    _saveTodosToStorage();
}

function setFilterBy(filterBy) {
    gFilterBy = filterBy
}

function setSortBy(sortedBy) {
    gSortedBy = sortedBy;
}

function getTotalCount() {
    return gTodos.length
}

function getActiveCount() {
    var activeTodos = gTodos.filter(function(todo) {
        return !todo.isDone
    })
    return activeTodos.length;
}


function _saveTodosToStorage() {
    saveToStorage('todoDB', gTodos)
}

function _createTodos() {
    var todos = loadFromStorage('todoDB')
    if (todos && todos.length) {
        gTodos = todos
    } else {
        addTodo('Learn HTML', 1);
        addTodo('Master CSS', 1);
        addTodo('Practive JS', 2);
    }
}

function _makeId(length = 5) {
    var txt = '';
    var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    for (var i = 0; i < length; i++) {
        txt += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return txt;
}

function getDate() {
    return Date.now();
}

function sortByTxt(todos) {
    var sorted = todos.sort(function(todoA, todoB) {
        if (todoA.txt.toLowerCase() < todoB.txt.toLowerCase()) {
            return -1;
        }
        if (todoA.txt.toLowerCase() > todoB.txt.toLowerCase()) {
            return 1;
        }
        return 0;
    })
    return sorted;
}

function sortByCreate(todos) {
    var sorted = todos.sort(function(todoA, todoB) {
        return todoB.createAt - todoA.createAt
    })
    return sorted;
}

function sortByImportance(todos) {
    var sorted = todos.sort(function(todoA, todoB) {
        return todoA.importance - todoB.importance
    })
    return sorted;
}