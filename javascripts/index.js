const buttonStartTrivia = () => document.getElementById("start-trivia")
const ul = () => document.getElementById("questions-list")
document.addEventListener("DOMContentLoaded", () =>{
    buttonStartTrivia().addEventListener("click", handleClick)
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