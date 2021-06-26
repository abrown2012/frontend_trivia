class Answer {
    
    static all = []

    constructor({text, id, correct, question_id}){
        this.text = text
        this.id = id 
        this.correct = correct 
        this.question_id = question_id 
        Answer.all.push(this) 
    }

    static getAll() {
        return this.all 
    }

         
}