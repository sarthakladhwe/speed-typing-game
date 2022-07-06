const difficultyEl = document.getElementById('difficulty')
const timeLeftEl = document.getElementById('time-left')
const scoreEl = document.getElementById('score')
const wordEl = document.getElementById('word')
const wordInputEl = document.getElementById('word-input')
const settingsBtn = document.getElementById('settings')

let difficulty = "easy";
let score = 0;
let timeLeft = 10;
let randomWord;

async function getWords() {
    const wordLength = difficulty === "easy" ? 5 : difficulty === "medium" ? 8 : 11;
    const randomiseWordLength = wordLength - Math.floor(Math.random() * 3)
    console.log(randomiseWordLength)
    const response = await fetch(`https://random-word-api.herokuapp.com/word?length=${randomiseWordLength}`)
    const data = await response.json() 
    randomWord = data;  
}

getWords()

//Event Listeners

difficultyEl.addEventListener('change', (e) => {
    difficulty = e.target.value
})

