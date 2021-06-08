class AnswerApi {

    static handleError(error) {
        console.log(error)
    }

    static fetchAnswers() {
        fetch('http://localhost:3000/answers')
        .then(resp => resp.json())
        .then(json => json.forEach(answer => AnswerApi.findById(answer.id)))
        
    }

    static findById(id) {
        return this.all.find(answer => answer.id === id)
    }




}