const difficultyEl = document.getElementById('difficulty')
const timeLeftEl = document.getElementById('time-left')
const scoreEl = document.getElementById('score')
const wordEl = document.getElementById('word')
const wordInputEl = document.getElementById('word-input')
const settingsBtn = document.getElementById('settings')
const startGameBtn = document.getElementById('start-game')

const gameContainer = document.getElementById('start-game-container')
const gameEndContainer = document.getElementById('stop-game-container')
gameEndContainer.style.display = "none"

let difficulty = "easy";
let score = 0;
let timeLeft = 10;
let randomWord;
let intervalId;

async function getWords() {
    const wordLength = difficulty === "easy" ? 5 : difficulty === "medium" ? 8 : 11;
    const randomiseWordLength = wordLength - Math.floor(Math.random() * 3)
    const response = await fetch(`https://random-word-api.herokuapp.com/word?length=${randomiseWordLength}`)
    const data = await response.json()
    wordEl.textContent = data[0]
    randomWord = data[0]
}

function updateCountdown() {
    timeLeft--
    timeLeftEl.innerText = `${timeLeft}s`

    if(timeLeft === 0) {
        clearInterval(intervalId)
        stopGame()
    }
}

function updateScore() {
    score++
    scoreEl.textContent = score
}

function stopGame() {
    gameContainer.style.display = "none"
    gameEndContainer.style.display = "block"
    startGameBtn.style.visibility = "visible"
    document.getElementById('final-score').textContent = score
    score = 0
    timeLeft = 10
}

//Event Listeners

difficultyEl.addEventListener('change', (e) => {
    difficulty = e.target.value
})

startGameBtn.addEventListener('click', () => {
    startGameBtn.style.visibility = "hidden"
    gameEndContainer.style.display = "none"
    gameContainer.style.display = "flex"
    getWords()
    intervalId = setInterval(updateCountdown, 1000)
    wordInputEl.focus();
})

wordInputEl.addEventListener('input', (e) => {
    const insertedWord = e.target.value
    if(insertedWord === randomWord) {
        wordInputEl.value = ""
        getWords()
        updateScore()
        timeLeft += difficulty === "easy" ? 4 : difficulty === "medium" ? 3 : 3;
    }
})


