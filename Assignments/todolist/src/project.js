class Project{
    constructor(name){
        this.id = Date.now().toString() + Math.random().toString(36);
        this.name = name;
        this.createdAt = new Date().toISOString();
    }
}

export { Project };