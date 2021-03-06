class QuizApi {
    static fetchQuizzes() {
        fetch('http://localhost:3000/quizzes')
        .then(resp => resp.json())
        .then(json => {
            json.forEach(quiz => {
                new Quiz(quiz)
                quiz.questions.forEach(question => {
                    new Question(question)
                    question.answers.forEach(answer => {
                        new Answer(answer)
                    })
                })
            })
        })
    }

    static handleError(error) {
        console.log(error)
    }

    static fetchQuiz() {
        fetch('http://localhost:3000/quizzes')
        .then(resp => resp.json())
        .then(json => {
            json[json.length-1].questions.forEach(question => {
                new Question(question)
                question.answers.forEach(answer => {
                    new Answer(answer)
                })
            })
        })
    }

    static updateScore() {
        
        const quizData = {
            user_id: User.all[0].id,
            score: finalScore, 
            questions: Question.all
        }
        fetch(`http://localhost:3000/quizzes/${Quiz.all[0].id}`, {
            method: 'PATCH',
            headers: {
                "Content-Type": 'application/json'
            },
            body: JSON.stringify(quizData)
        })
    }



    static saveQuiz(userId) {
        
        const quizData = {
            user_id: userId,
            score: 0
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