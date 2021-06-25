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
const checkAnswer = () => document.getElementById("answer-text")
const nextButton = () => document.getElementById("next")
let questionNumber 



document.addEventListener("DOMContentLoaded", () =>{
    buttonStartTrivia().addEventListener("click", handleSubmit)
})

const handleSubmit = (e) => {
    e.preventDefault()
    UserApi.fetchUser()
    Quiz.createNewQuiz()
    QuestionApi.fetch5Questions()
    handleWelcomeUser(userName().value)
    
}

const handleWelcomeUser = (name) => {
    // UserApi.fetchUsers()
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
    welcome().innerHTML = ""
    welcome().innerHTML = 
    `
    
    <div id="question-container" >
    
    <div id="question" class="hide">Question TEST</div>
    
    <div id="answers" class="hide">
    
        <button class="btn"></button>
        <button class="btn"></button>
        <button class="btn"></button>
        <button class="btn"></button>
    </div>
    <br>
    <div id="answer-text"></div>
    
    <br>
    <div id="next-button" class="hide">
        <button id="next">Next</button>
    </div>
</div>
    `
    questionElement().classList.remove('hide')
    answersElement().classList.remove('hide')
    clearPreviousQuestion()
    nextQuestion() 
}



const nextQuestion = () => {
    
    questionNumber = 0 
    fetch('http://localhost:3000/questions')
    .then(resp => resp.json())
    .then(json => json.sort(() => Math.random() - 0.5))
    // .then(tenOnly => tenOnly.slice(0, 10))
    .then(quest => {
        setQuestion(quest)
        })
}

function setQuestion(question) {
    clearPreviousQuestion()
    displayQuestion(question[questionNumber])
    
}

function displayQuestion(question) {
    
    questionElement().innerText = question.text
    
    fetch(`http://localhost:3000/questions/${question.id}`)
        .then(resp => resp.json())
        .then(json => {json.answers.forEach(answer =>
     {       {   
                const button = document.createElement('button')
                button.innerText = answer.text 
                button.classList.add('btn')
                if (answer.correct) {
                    button.dataset.correct = answer.correct 
                }
                button.addEventListener('click', selectAnswer)
                answersElement().appendChild(button)
                
            }})})
}



function selectAnswer(e) {
    const selectedAnswer = e.target
    const correct = selectedAnswer.dataset.correct
    
    
    if (selectedAnswer.dataset.correct) {
        checkAnswer().innerText = `Congratualtions, this is the correct answer!`
    } else {
        checkAnswer().innerText = `This answer is wrong.`
    }
    
    next().classList.remove('hide')
    nextButton().addEventListener("click", () => {
        checkAnswer().innerText = ""
        questionNumber++
        
        nextQuestion()
    })
}



const clearPreviousQuestion = () => {
    next().classList.add('hide')
    
    while (answersElement().firstChild){
        answersElement().removeChild(answersElement().firstChild)
    }
    
}