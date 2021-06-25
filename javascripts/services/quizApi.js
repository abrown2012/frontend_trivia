class QuizApi {
    static fetchQuizzes() {
        fetch('http://localhost:3000/quizzes')
        .then(resp => resp.json())
        .catch(handleError)
    }

    static handleError(error) {
        console.log(error)
    }



    static saveQuiz(userId) {

        const quizData = {
            user_id: userId
        }
        
        fetch("http://localhost:3000/quizzes", {
            method: 'POST',
            headers: {
                "Content-Type": 'application/json'
            },
            body: JSON.stringify(quizData)
        })
        .then(resp => resp.json())
        .then(json => {
            new Quiz(json)
        })
    }

    static createQuiz(user) {
        fetch('http://localhost:3000/quizzes')
        .then(resp => resp.json())
        .then(selectQ => selectQ.sort(() => Math.random() - 0.5 ))
        .then(tenOnly => tenOnly.slice(0, 5))
        .then(json => {
            json.forEach(question => {
                Question.findOrCreateByName(question.text)
            })
        })
        .catch(this.handleError)
    }

    
}