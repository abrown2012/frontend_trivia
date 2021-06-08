const buttonStartTrivia = () => document.getElementById("start-trivia")
const ul = () => document.getElementById("questions-list")
const userName = () => document.getElementById("user-name")
const pageTitle = () => document.getElementById("page-title")
const subtitle = () => document.getElementById("subtitle")
const nameForm = () => document.getElementById("name-form")
const questionText = () => document.getElementById("question-container")
const questionElement = () => document.getElementById("question")
const answersElement = () => document.getElementById("answers")
const startButton = () => document.getElementById("start-button")
const start = () => document.getElementById("start")
let questionNumber


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
    .then(json => handleWelcomeUser(json.name))
}

const handleWelcomeUser = (name) => {
    pageTitle().innerText = `Welcome, ${name}!`
    subtitle().innerText = "Let's play a game of Trivia"
    nameForm().innerHTML = ""
    startButton().classList.remove('hide')
    start().addEventListener("click", startTrivia)
    
    // handleCreateQuiz()
    // handleStartQuiz()
}

const startTrivia = (e) => {
    e.preventDefault()
    startButton().classList.add('hide')
    pageTitle().innerText = ``
    subtitle().innerText = ""
    questionElement().classList.remove('hide')
    answersElement().classList.remove('hide')
    nextQuestion() 
}

const nextQuestion = () => {
    questionNumber = 0 
    fetch('http://localhost:3000/questions')
    .then(resp => resp.json())
    .then(json => json.sort(() => Math.random() - 0.5))
    .then(quest => {displayQuestion(quest[questionNumber])})
    
}

const displayQuestion = (question) => {
    questionElement().innerText = question.text
}
