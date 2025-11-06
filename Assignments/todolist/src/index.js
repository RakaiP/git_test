import './styles.css';
import { Todo } from './todo.js';
import { Project } from './project.js';
import { Storage } from './storage.js';
import { UI } from './ui.js';

console.log('Todo List App Loaded!');

// Application State
let todos = [];
let projects = [];
let currentFilter = 'all';

// Initialize App
document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM Ready');
    
    loadData();
    initEventListeners();
    render();
    
    console.log('✅ App initialized!');
});

// Load data from localStorage
function loadData() {
    todos = Storage.loadTodos();
    projects = Storage.loadProjects();
    
    if (projects.length === 0) {
        const defaultProject = new Project('Personal');
        projects.push(defaultProject);
        Storage.saveProjects(projects);
    }
    
    if (todos.length === 0) {
        const exampleTodos = [
            new Todo('Welcome to Todo App', 'Click me to see details!', '2024-11-10', 'high', 'default'),
            new Todo('Create your first task', 'Click "+ Add Task" button', '2024-11-15', 'medium', 'default'),
            new Todo('Mark tasks as complete', 'Check the checkbox', '2024-11-20', 'low', 'default')
        ];
        todos = exampleTodos;
        Storage.saveTodos(todos);
    }
}

// Render everything
function render() {
    const filteredTodos = filterTodos();
    UI.displayTodos(filteredTodos);
    UI.displayProjects(projects);
    UI.updateProjectSelect(projects);
    UI.updateCounts(todos);  // ← Added missing call!
}

// Filter todos
function filterTodos() {
    if (currentFilter === 'all') {
        return todos;
    } else if (currentFilter === 'today') {
        return todos.filter(todo => {
            const todoDate = new Date(todo.dueDate);
            const today = new Date();
            return todoDate.toDateString() === today.toDateString();
        });
    } else if (currentFilter === 'week') {
        return todos.filter(todo => {
            const todoDate = new Date(todo.dueDate);
            const today = new Date();
            const weekFromNow = new Date(today.getTime() + 7 * 24 * 60 * 60 * 1000);
            return todoDate >= today && todoDate <= weekFromNow;
        });
    } else {
        return todos.filter(todo => todo.project === currentFilter);
    }
}

// Initialize event listeners
function initEventListeners() {
    // Sidebar filter buttons
    document.querySelectorAll('.list-item').forEach(btn => {
        btn.addEventListener('click', () => {
            document.querySelectorAll('.list-item, .project-item').forEach(b => 
                b.classList.remove('active')
            );
            btn.classList.add('active');
            currentFilter = btn.dataset.filter;
            UI.updateViewTitle(btn.textContent.replace(/\d+/g, '').trim());
            render();
        });
    });
    
    // Add Todo button
    document.getElementById('addTodoBtn').addEventListener('click', () => {
        document.getElementById('todoModal').showModal();
    });
    
    // Cancel Todo button
    document.getElementById('cancelTodoBtn').addEventListener('click', () => {
        document.getElementById('todoForm').reset();
        document.getElementById('todoModal').close();
    });
    
    // Todo form submit
    document.getElementById('todoForm').addEventListener('submit', (e) => {
        e.preventDefault();
        addTodo();
    });
    
    // Add Project button
    document.getElementById('addProjectBtn').addEventListener('click', () => {
        document.getElementById('projectModal').showModal();
    });
    
    // Cancel Project button
    document.getElementById('cancelProjectBtn').addEventListener('click', () => {
        document.getElementById('projectForm').reset();
        document.getElementById('projectModal').close();
    });
    
    // Project form submit
    document.getElementById('projectForm').addEventListener('submit', (e) => {
        e.preventDefault();
        addProject();
    });
    
    // Todo actions (event delegation)
    document.getElementById('todosContainer').addEventListener('click', (e) => {
        if (e.target.classList.contains('todo-checkbox')) {
            toggleTodo(e.target.dataset.id);
        }
        if (e.target.classList.contains('btn-delete')) {
            deleteTodo(e.target.dataset.id);
        }
        if (e.target.closest('.todo-info')) {
            const todo = todos.find(t => t.id === e.target.closest('.todo-info').dataset.id);
            if (todo) UI.showTodoDetails(todo);
        }
    });
    
    // Project actions
    document.getElementById('projectsList').addEventListener('click', (e) => {
        if (e.target.classList.contains('delete-project-btn')) {
            e.stopPropagation();
            deleteProject(e.target.dataset.id);
        } else if (e.target.closest('.project-item')) {
            const projectItem = e.target.closest('.project-item');
            const id = projectItem.dataset.id;
            document.querySelectorAll('.list-item, .project-item').forEach(b => 
                b.classList.remove('active')
            );
            projectItem.classList.add('active');
            currentFilter = id;
            const project = projects.find(p => p.id === id);
            if (project) {
                UI.updateViewTitle(project.name);
            }
            render();
        }
    });
    
    // Close detail modal
    document.getElementById('closeDetailBtn').addEventListener('click', () => {
        document.getElementById('todoDetailModal').close();
    });
}

// Add new todo
function addTodo() {
    const title = document.getElementById('todoTitle').value;
    const description = document.getElementById('todoDescription').value;
    const dueDate = document.getElementById('todoDueDate').value;
    const priority = document.getElementById('todoPriority').value;
    const project = document.getElementById('todoProject').value;
    
    const todo = new Todo(title, description, dueDate, priority, project);
    todos.push(todo);
    Storage.saveTodos(todos);
    
    document.getElementById('todoForm').reset();
    document.getElementById('todoModal').close();
    render();
}

// Toggle todo completion
function toggleTodo(id) {
    const todo = todos.find(t => t.id === id);
    if (todo) {
        todo.toggleCompleted();
        Storage.saveTodos(todos);
        render();
    }
}

// Delete todo
function deleteTodo(id) {
    if (confirm('Delete this task?')) {
        todos = todos.filter(t => t.id !== id);
        Storage.saveTodos(todos);
        render();
    }
}

// Add new project
function addProject() {
    const name = document.getElementById('projectName').value;
    const project = new Project(name);
    projects.push(project);
    Storage.saveProjects(projects);
    
    document.getElementById('projectForm').reset();
    document.getElementById('projectModal').close();
    render();
}

// Delete project
function deleteProject(id) {
    if (confirm('Delete this project?')) {
        projects = projects.filter(p => p.id !== id);
        todos.forEach(todo => {
            if (todo.project === id) todo.project = 'default';
        });
        Storage.saveProjects(projects);
        Storage.saveTodos(todos);
        currentFilter = 'all';
        render();
    }
}