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

    

}