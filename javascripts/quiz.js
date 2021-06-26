class Quiz {
    
    static all = []

    constructor({user_id, id}){
        this.user_id = user_id
        this.id = id 
        Quiz.all.push(this) 
    }

    static getAll() {
        return this.all 
    }

    static new(userId){
        
        new Quiz(userId) 
    }

    static createNewQuiz() {
        fetch('http://localhost:3000/users')
        .then(resp => resp.json())
        .then(json => QuizApi.saveQuiz(json.length+1))
    }
    
}