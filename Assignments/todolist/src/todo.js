class Todo{
    constructor(title, description,dueDate, priority, project = 'default'){
        this.title = title;
        this.description = description;
        this.dueDate = dueDate;
        this.priority = priority;
        this.project = project;
        this.completed = false;
        this.createdAt = new Date().toISOString();
    }

    toggleCompleted(){
        this.completed = !this.completed;
    }
}


export { Todo };