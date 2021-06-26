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
                QuestionApi.createQuizQuestions(question.id, Quiz.all[0].id)
            })
        })
    }

    static createQuizQuestions(questionId, userId) {
        
        const quizQuestionData = {
            quiz_id: userId,
            question_id: questionId
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