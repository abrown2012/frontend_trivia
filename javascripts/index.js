const buttonStartTrivia = () => document.getElementById("start-trivia")
const ul = () => document.getElementById("questions-list")
const userName = () => document.getElementById("user-name")
const pageTitle = () => document.getElementById("page-title")
const subtitle = () => document.getElementById("subtitle")
const nameForm = () => document.getElementById("name-form")
const questionText = () => document.getElementById("question-container")


document.addEventListener("DOMContentLoaded", () =>{
    buttonStartTrivia().addEventListener("click", handleSubmit)
})

const handleSubmit = (e) => {
    e.preventDefault()
    const data = {
        name: userName().value
    }
    fetch("http://localhost:3000/users", {
        method: 'POST',
        headers: {
            "Content-Type": 'application/json'
        },
        body: JSON.stringify(data)
    })
    .then(resp => resp.json())
    .then(json => handleCreateUser(json.name))
}

const handleCreateUser = (name) => {
    pageTitle().innerText = `Welcome, ${name}!`
    subtitle().innerText = "Let's play a game of Trivia"
    nameForm().innerHTML = ""
    handleCreateQuiz()
    handleStartQuiz()
}

const handleCreateQuiz = () => {
    fetch('http://localhost:3000/questions')
    .then(resp => resp.json())
    .then(json => select10Qustions(json))
}

const select10Qustions = (json) => {
    let newJson = json 
    let newObject = []
    for (i = 10; i > 0; i--) {
    item = parseInt(Math.random() * (newJson.length - 2) )
    newObject.push(newJson[item])
    newJson.splice([item], 1)
    }
    createQuiz(newObject)
}

const createQuiz = (randomQuestions) => {
    fetch('http://localhost:3000/users')
    .then(resp => resp.json())
    .then(json => currentUserID(json, randomQuestions))
    
}

const currentUserID = (json, randomQuestions) => {
    const data = {
        user_id: json[json.length-1].id
    }
    
    fetch("http://localhost:3000/quizzes", {
        method: 'POST',
        headers: {
            "Content-Type": 'application/json'
        },
        body: JSON.stringify(data)
    })
    .then(resp => resp.json())
    .then(json => addQuestions(json, randomQuestions))
}

const addQuestions = (json, questions) => {
    questions.forEach(question => {
        const data = {
            question_id: question.id,
            quiz_id: json.id 
        }
        fetch(`http://localhost:3000/quiz_questions`, {
            method: 'POST',
            headers: {
                "Content-Type": 'application/json'
            },
            body: JSON.stringify(data)
        })
    })
}

const handleStartQuiz = () => {
    questionText().classList.remove('hide')
    askQuestion()
}

const askQuestion = () => {

}