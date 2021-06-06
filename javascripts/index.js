const buttonStartTrivia = () => document.getElementById("start-trivia")
const ul = () => document.getElementById("questions-list")
const userName = () => document.getElementById("user-name")
const pageTitle = () => document.getElementById("page-title")
const subtitle = () => document.getElementById("subtitle")
const nameForm = () => document.getElementById("name-form")


document.addEventListener("DOMContentLoaded", () =>{
    buttonStartTrivia().addEventListener("click", handleSubmit)
})

const handleClick = () => {
    fetch('http://localhost:3000/questions')
    .then(resp => resp.json())
    .then(json => renderQuestions(json))
    .catch(handleError)
}

const handleError = (error) => {
    console.log(error)
}

const renderQuestions = (questions) => {
    questions.forEach(element =>{
        const li = document.createElement('li')
        li.innerHTML = `
        <h2 class="question-text">${element.text}</h2>
        `
        ul().appendChild(li)
    })

}

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
    userName().value = ""
    pageTitle().innerText = `Welcome, ${name}!`
    subtitle().innerText = "Let's play a game of Trivia"
    nameForm().innerHTML = ""
    handleCreateQuiz()
}

const handleCreateQuiz = () => {
    fetch('http://localhost:3000/questions')
    .then(resp => resp.json())
    .then(json => {debugger})
    
}