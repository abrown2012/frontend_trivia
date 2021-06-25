class QuestionApi {

    static handleError(error) {
        console.log(error)
    }

    static fetch5Questions() {
        fetch('http://localhost:3000/questions')
        .then(resp => resp.json())
        .then(selectQ => selectQ.sort(() => Math.random() - 0.5 ))
        .then(tenOnly => tenOnly.slice(0, 5))
        .then(json => {
            json.forEach(question => {
                QuestionApi.createQuizQuestions(question, User.all[1].id)
            })
        })
    }

    static createQuizQuestions(question, userId) {
        
        const quizQuestionData = {
            quiz_id: userId,
            question_id: question.id
        }
        
        fetch("http://localhost:3000/quiz_questions", {
            method: 'POST',
            headers: {
                "Content-Type": 'application/json'
            },
            body: JSON.stringify(quizQuestionData)
        })
    }

    // static fetch5Questions() {
    //     fetch('http://localhost:3000/questions')
    //     .then(resp => resp.json())
    //     .then(selectQ => selectQ.sort(() => Math.random() - 0.5 ))
    //     .then(tenOnly => tenOnly.slice(0, 5))
    //     .then(json => {
    //         json.forEach(question => {
    //             Question.findOrCreateByName(question.text)
    //         })
    //     })
    //     .catch(this.handleError)
    // }
}