import { Todo } from "./todo.js";
import { Project } from "./project.js";

const Storage = (() => {
    const TODOS_KEY = 'todos';
    const PROJECTS_KEY = 'projects';

    const saveTodos = (todos) => { 
        try{
            const todosJSON = JSON.stringify(todos);
            localStorage.setItem(TODOS_KEY, todosJSON); 
            console.log('Todos saved to localStorage.');
        } catch (error) {
            console.error('Error saving todos to localStorage:', error);
        }
    };

    const loadTodos = () => {
        try{
            const todosString = localStorage.getItem(TODOS_KEY);

            if (!todosString){
                console.log('No todos found in localStorage.');
                return [];
            }

            const todosData = JSON.parse(todosString);

            const todos = todosData.map(todoData => {
                // ❌ WAS: todoData.completed (wrong parameter)
                // ✅ FIXED: todoData.project (correct parameter)
                const todo = new Todo(
                    todoData.title,
                    todoData.description,
                    todoData.dueDate,
                    todoData.priority,
                    todoData.project  // ← Fixed!
                );

                Object.assign(todo, todoData);
                return todo;
            });

            console.log('Todos loaded from localStorage.');
            return todos;
        }catch (error) {
            console.error('Error loading todos from localStorage:', error);
            return [];
        }
    };

    const saveProjects = (projects) => { 
        try{
            const projectsJSON = JSON.stringify(projects);
            localStorage.setItem(PROJECTS_KEY, projectsJSON);
            console.log('Projects saved to localStorage.');
        } catch (error) {
            console.error('Error saving projects to localStorage:', error);
        }
    };

    const loadProjects = () => {
        try{
            const projectsString = localStorage.getItem(PROJECTS_KEY);
            if (!projectsString){
                console.log('No projects found in localStorage.');
                return [];
            }

            const projectsData = JSON.parse(projectsString);

            const projects = projectsData.map(projectData => {
                const project = new Project(projectData.name);
                Object.assign(project, projectData);
                return project;
            });

            console.log('Projects loaded from localStorage.');
            return projects;

        } catch (error) {
            console.error('Error loading projects from localStorage:', error);
            return [];
        }
    };

    return {
        saveTodos,
        loadTodos,
        saveProjects,
        loadProjects
    };
})();

export { Storage };