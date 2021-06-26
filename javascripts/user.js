class User {
    
    static all = []

    constructor({name, id, quizzes = []}){
        this.name = name
        this.id = id 
        this.quizzes = quizzes 
        User.all.push(this) 
    }

    static getAll() {
        return this.all 
    }

    static findOrCreateByName(name){
        
        this.findByName(name) || new User(name) 
    }

    static findByName(name){
        
        return this.all.find(user => user.name === name)
    }

  
}