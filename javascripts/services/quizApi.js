class QuizApi {
    static fetchQuizzes() {
        fetch('http://localhost:3000/quizzes')
        .then(resp => resp.json())
        .catch(handleError)
    }

    static handleError(error) {
        console.log(error)
    }
}