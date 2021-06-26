class Question {
    
    static all = []

    constructor({text, id}){
        this.text = text
        this.id = id 
        Question.all.push(this) 
    }

    static getAll() {
        return this.all 
    }

    static findOrCreateByName(question){
        this.findByName(question.text) || new Question(text) 
    }

    static findByName(text){
        return this.all.find(question  => qustion.texxt === text)
    }

    findAnswers() {
        return Answer.all.filter(ans => ans.question_id === this.id)
    }

    



    

}