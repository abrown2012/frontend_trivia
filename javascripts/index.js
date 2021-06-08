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
const next = () => document.getElementById("next-button")
const welcome = () => document.getElementById("welcome")
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

}

const startTrivia = (e) => {
    e.preventDefault()
    startButton().classList.add('hide')
    pageTitle().innerText = ``
    subtitle().innerText = ""
    welcome().classList.add('hide')
    questionElement().classList.remove('hide')
    answersElement().classList.remove('hide')
    nextQuestion() 
}

const nextQuestion = () => {
    clearPreviousQuestion()
    questionNumber = 0 
    fetch('http://localhost:3000/questions')
    .then(resp => resp.json())
    .then(json => json.sort(() => Math.random() - 0.5))
    .then(quest => {displayQuestion(quest[questionNumber])})
    
}

const displayQuestion = (question) => {
    questionElement().innerText = question.text
    fetch(`http://localhost:3000/questions/${question.id}`)
        .then(resp => resp.json())
        .then(json => {getAnswers(json.id)})
}

const getAnswers = (questionID) => {
    fetch(`http://localhost:3000/answers`)
    .then(resp => resp.json())
    .then(json => {json.forEach(
        answer => {
            if (answer.question_id === questionID) {
                const button = document.createElement('button')
                button.innerText = answer.text 
                button.classList.add('btn')
                if (answer.correct) {
                    button.dataset.correct = answer.correct 
                }
                button.addEventListener('click', selectAnswer)
                answersElement().appendChild(button)
            }
        }
    )}
    )
}

function selectAnswer(e) {

}

const clearPreviousQuestion = () => {
    next().classList.add('hide')
    
    while (answersElement().firstChild){
        answersElement().removeChild(answersElement().firstChild)
    }
}