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
let finalScore = 0

document.addEventListener("DOMContentLoaded", () =>{
    buttonStartTrivia().addEventListener("click", handleSubmit)
})

const handleSubmit = (e) => {
    e.preventDefault()
    UserApi.fetchUser()
    Quiz.createNewQuiz()
    QuestionApi.fetch5Questions()
    QuizApi.fetchQuiz()
    handleWelcomeUser(userName().value)
 
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
    firstQuestion() 
}

const firstQuestion = () => {
    questionNumber = 0
    setQuestion(Question.all)
}

const nextQuestion = () => {
    questionNumber = questionNumber + 1
    setQuestion(Question.all)
}

function setQuestion(questions) {
    clearPreviousQuestion()
    displayQuestion(questions[questionNumber])
}

function displayQuestion(question) {
    if (questionNumber < 5) {
    questionElement().innerText = question.text
    question.findAnswers().forEach(answer => {
        const button = document.createElement('button')
        button.innerText = answer.text 
        button.classList.add('btn')
        if (answer.correct) {
            button.dataset.correct = answer.correct
        }
        button.addEventListener('click', selectAnswer)
        answersElement().appendChild(button)
    })
    } else {
    questionElement().innerText = `Congratulations, you finished the quiz. Your score is: ${finalScore/5*100}%`
    }
}

function selectAnswer(e) {
    e.preventDefault()
    e.stopPropagation()
    const selectedAnswer = e.target
    if (selectedAnswer.dataset.correct) {
        finalScore = finalScore + 1
        checkAnswer().innerText = `Congratualtions, this is the correct answer!`
    
    } else {
        checkAnswer().innerText = `This answer is wrong.`
    }
    setTimeout(() => { checkAnswer().innerText = ""; }, 2000)
    setTimeout(() => {  nextQuestion(); }, 2000)
    
    // next().classList.remove('hide')
    // nextButton().addEventListener("click", (e) => {
    //     e.preventDefault()
    //     checkAnswer().innerText = ""
    //     nextQuestion()
    //     e.stopPropagation()
    // })
}

const clearPreviousQuestion = () => {
    next().classList.add('hide')
    questionElement().innerText = ''
    while (answersElement().firstChild){
        answersElement().removeChild(answersElement().firstChild)
    }
    
}