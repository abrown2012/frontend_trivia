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

    static findOrCreateByName(user){
        this.findByName(user.name) || new User(user) 
    }

    static findByName(name){
        return this.all.find(user => user.name === name)
    }

    



    

}