let todos = JSON.parse(localStorage.getItem('todos')) || [];

function addTodo() {
    const input = document.getElementById('todoInput');
    const text = input.value.trim();
    
    if (text) {
        const todo = {
            id: Date.now(),
            text: text,
            completed: false,
            createdAt: new Date().toLocaleString()
        };
        
        todos.push(todo);
        saveTodos();
        renderTodos();
        input.value = '';
    }
}

function toggleTodo(id) {
    todos = todos.map(todo => {
        if (todo.id === id) {
            return { ...todo, completed: !todo.completed };
        }
        return todo;
    });
    saveTodos();
    renderTodos();
}

function deleteTodo(id) {
    todos = todos.filter(todo => todo.id !== id);
    saveTodos();
    renderTodos();
}

function saveTodos() {
    localStorage.setItem('todos', JSON.stringify(todos));
}

function renderTodos() {
    const todoList = document.getElementById('todoList');
    todoList.innerHTML = '';
    
    if (todos.length === 0) {
        todoList.innerHTML = `
            <li class="p-4 text-center text-gray-500">
                <i class="bi bi-emoji-frown me-2"></i>할일이 없습니다...
            </li>
        `;
        return;
    }
    
    todos.forEach(todo => {
        const li = document.createElement('li');
        li.className = 'p-4 hover:bg-gray-750 transition-colors duration-200';
        
        li.innerHTML = `
            <div class="flex items-center gap-3">
                <input type="checkbox" 
                       ${todo.completed ? 'checked' : ''} 
                       class="w-5 h-5 rounded border-gray-600 bg-gray-700 text-gray-600"
                       onclick="toggleTodo(${todo.id})">
                
                <div class="flex-1">
                    <p class="text-gray-300 ${todo.completed ? 'line-through text-gray-500' : ''}">
                        ${todo.text}
                    </p>
                    <p class="text-xs text-gray-500 mt-1">
                        <i class="bi bi-clock me-1"></i>${todo.createdAt}
                    </p>
                </div>
                
                <button onclick="deleteTodo(${todo.id})" 
                        class="text-gray-500 hover:text-red-400 transition-colors duration-200">
                    <i class="bi bi-trash3"></i>
                </button>
            </div>
        `;
        
        todoList.appendChild(li);
    });
}

// Enter 키로 할일 추가
document.getElementById('todoInput').addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        addTodo();
    }
});

// 초기 렌더링
renderTodos();
