import { format, isToday, isThisWeek, isPast } from "date-fns";

const UI = (() => {

    const displayTodos = (todos) => {
        const todoListContainer = document.getElementById('todosContainer');

        todoListContainer.innerHTML = '';

        if (todos.length === 0) {
            // ❌ WAS: container (undefined variable)
            // ✅ FIXED: todoListContainer
            todoListContainer.innerHTML = '<p>No todos available.</p>';
            return;
        }

        todos.forEach(todo => {
            const todoCard = createTodoCard(todo);
            todoListContainer.appendChild(todoCard);
        });
    };

    const createTodoCard = (todo) => {
        const card = document.createElement('div');
        card.classList.add('todo-card', `priority-${todo.priority}`);

        if(todo.completed) {
            card.classList.add('completed');    
        }

        card.dataset.id = todo.id;

        // ❌ WAS: todo-complete-checkbox
        // ✅ FIXED: todo-checkbox (matches event listener)
        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.classList.add('todo-checkbox');  // ← Fixed!
        checkbox.checked = todo.completed;
        checkbox.dataset.id = todo.id;

        // ✅ Added: todoInfo container (needed for click events)
        const todoInfo = document.createElement('div');
        todoInfo.classList.add('todo-info');
        todoInfo.dataset.id = todo.id;

        const title = document.createElement('h3');
        title.classList.add('todo-title');
        title.textContent = todo.title;

        const meta = document.createElement('div');
        meta.classList.add('todo-meta');

        // ❌ WAS: todo-due-date
        // ✅ FIXED: todo-date (matches CSS)
        const date = document.createElement('span');
        date.classList.add('todo-date');  // ← Fixed!

        const todoDate = new Date(todo.dueDate);
        const formattedDate = format(todoDate, 'MMM dd, yyyy');
        
        if(isPast(todoDate) && !todo.completed) {
            date.classList.add('overdue');
            date.textContent = `⚠️ ${formattedDate} (Overdue)`;
        } else if(isToday(todoDate)) {
            date.classList.add('due-today');
            date.textContent = `📅 ${formattedDate}`;
        } else if(isThisWeek(todoDate)) {
            date.classList.add('due-this-week');
            date.textContent = `📅 ${formattedDate}`;
        } else {
            date.textContent = `📅 ${formattedDate}`;
        }

        const priority = document.createElement('span');
        // ❌ WAS: todo-priority
        // ✅ FIXED: priority-badge + priority level (matches CSS)
        priority.classList.add('priority-badge', todo.priority);  // ← Fixed!
        priority.textContent = todo.priority.toUpperCase();

        meta.appendChild(date);
        meta.appendChild(priority);

        // ✅ Fixed: Proper structure
        todoInfo.appendChild(title);
        todoInfo.appendChild(meta);

        // ✅ Added: Delete button container
        const actions = document.createElement('div');
        actions.classList.add('todo-actions');

        const deleteBtn = document.createElement('button');
        deleteBtn.classList.add('btn-delete');
        deleteBtn.textContent = '🗑️ Delete';
        deleteBtn.dataset.id = todo.id;

        actions.appendChild(deleteBtn);

        // ✅ Fixed: Proper assembly
        card.appendChild(checkbox);
        card.appendChild(todoInfo);
        card.appendChild(actions);

        return card;
    };

    const displayProjects = (projects) => {
        const container = document.getElementById('projectsList');
        container.innerHTML = '';

        projects.forEach(project => {
            const projectItem = document.createElement('button');
            projectItem.classList.add('project-item');
            projectItem.dataset.id = project.id;

            const nameSpan = document.createElement('span');
            nameSpan.textContent = `📁 ${project.name}`;  // ← Added icon
            
            const deleteBtn = document.createElement('button');
            deleteBtn.classList.add('delete-project-btn');
            deleteBtn.textContent = '×';  // ← Fixed: × instead of x
            deleteBtn.dataset.id = project.id;

            projectItem.appendChild(nameSpan);
            projectItem.appendChild(deleteBtn);
            container.appendChild(projectItem);
        });
    };

    const updateProjectSelect = (projects) => {
        const select = document.getElementById('todoProject');
        select.innerHTML = '<option value="default">Default</option>';

        projects.forEach(project => {
            const option = document.createElement('option');
            option.value = project.id;
            option.textContent = project.name;
            select.appendChild(option);
        });
    };

    const showTodoDetails = (todo) => {
        const modal = document.getElementById('todoDetailModal');
        const content = document.getElementById('todoDetailContent');

        const formattedDate = format(new Date(todo.dueDate), 'MMMM d, yyyy');

        content.innerHTML = `
            <h2 class="detail-title">${todo.title}</h2>
            
            <div class="detail-section">
                <h3>📝 Description</h3>
                <p>${todo.description || 'No description provided'}</p>
            </div>
            
            <div class="detail-section">
                <h3>📅 Due Date</h3>
                <p>${formattedDate}</p>
            </div>
            
            <div class="detail-section">
                <h3>🎯 Priority</h3>
                <p><span class="priority-badge ${todo.priority}">${todo.priority.toUpperCase()}</span></p>
            </div>
            
            <div class="detail-section">
                <h3>✅ Status</h3>
                <p>${todo.completed ? '✅ Completed' : '⏳ In Progress'}</p>
            </div>
            
            <div class="detail-section">
                <h3>📂 Project</h3>
                <p>${todo.project}</p>
            </div>
        `;

        modal.showModal();
    };

    const updateViewTitle = (title) => {
        const titleElement = document.getElementById('currentViewTitle');
        if (titleElement) {
            titleElement.textContent = title;
        }
    };

    // ❌ WAS: updateTodoCounts
    // ✅ FIXED: updateCounts (matches index.js call)
    const updateCounts = (todos) => {
        const allCount = document.querySelector('[data-filter="all"] .count');
        const todayCount = document.querySelector('[data-filter="today"] .count');
        const weekCount = document.querySelector('[data-filter="week"] .count');

        if (allCount) {
            allCount.textContent = todos.filter(t => !t.completed).length;
        }
        
        if (todayCount) {
            todayCount.textContent = todos.filter(t => 
                !t.completed && isToday(new Date(t.dueDate))
            ).length;
        }
        
        if (weekCount) {
            weekCount.textContent = todos.filter(t => 
                !t.completed && isThisWeek(new Date(t.dueDate))
            ).length;
        }
    };

    return {
        displayTodos,
        displayProjects,
        updateProjectSelect,
        showTodoDetails,
        updateViewTitle,
        updateCounts  // ← Fixed export name!
    };

})();

export { UI };