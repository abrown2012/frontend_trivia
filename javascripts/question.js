class Question {
    
    static all = []

    constructor({text, id, answers = []}){
        this.text = text
        this.id = id 
        this.answers = answers 
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

    



    

}