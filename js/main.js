function onInit() {
    console.log('Hi');
    renderTodos();
}

function renderTodos() {
    var todos = getTodosForSorted();
    todos = getTodosForDisplay();
    var strHTMLs = todos.map(function(todo) {
        return `<li class="${(todo.isDone)? 'done': ''}" onclick="onToggleTodo('${todo.id}')">
            ${todo.txt + ' - ' + makeDate(todo.createAt) + ' - ' + todo.importance}
            <button onclick="onRemoveTodo('${todo.id}', event)">x</button>
        </li>`
    })
    var elTodoList = document.querySelector('.todo-list');
    elTodoList.innerHTML = strHTMLs.join('');
    document.querySelector('.total-count').innerText = getTotalCount();
    document.querySelector('.active-count').innerText = getActiveCount();
    document.querySelector('.no-todos').innerText = '';
    if (!todos.length) {
        document.querySelector('.no-todos').innerText = getNoTodoText();
    }
}

function getNoTodoText() {
    var strNoTodos = '';
    if (gFilterBy === 'all') strNoTodos = 'No todos!'
    else if (gFilterBy === 'active') strNoTodos = 'No Active Todos!'
    else if (gFilterBy === 'done') strNoTodos = 'No Done Todos!'
    return strNoTodos;
}

function onToggleTodo(todoId) {
    console.log('Toggling: ', todoId);
    toggleTodo(todoId)
    renderTodos()
}

function onRemoveTodo(todoId, ev) {
    console.log('Removing: ', todoId);
    ev.stopPropagation();
    removeTodo(todoId);
    renderTodos();
}

function onAddTodo() {
    var elTxt = document.querySelector('[name=newTodoTxt]');
    var elImport = document.querySelector('[name=importance]')
    var txt = elTxt.value;
    var importance = elImport.value
    if (!txt) return;
    if (!importance || importance > 3 || importance < 1) return;
    addTodo(txt, importance)
    elTxt.value = '';
    elImport.value = '';
    renderTodos();
}

function onSetFilter(filterBy) {
    console.log('Filtering by:', filterBy);
    setFilterBy(filterBy);
    renderTodos();
}

function onSortFilter(sortedBy) {
    console.log('sorting by', sortedBy);
    setSortBy(sortedBy);
    renderTodos()
}


function makeDate(time) {
    var newTime = new Date(time)
    return (newTime.getMonth() + 1) + '-' + newTime.getDate() + ' ' + newTime.getHours() + ":" + newTime.getMinutes();
}