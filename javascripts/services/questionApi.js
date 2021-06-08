class QuestionApi {

    static handleError(error) {
        console.log(error)
    }

    static fetchQuestions() {
        fetch('http://localhost:3000/questions')
        .then(resp => resp.json())
    }
  
}