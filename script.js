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

async function getWords() {
    const wordLength = difficulty === "easy" ? 5 : difficulty === "medium" ? 8 : 11;
    const randomiseWordLength = wordLength - Math.floor(Math.random() * 3)
    const response = await fetch(`https://random-word-api.herokuapp.com/word?length=${randomiseWordLength}`)
    const data = await response.json()
    wordEl.textContent = data[0]
    randomWord = data[0]
}

function startCountdown() {
    const intervalId = setInterval(() => {
        timeLeft--
        timeLeftEl.innerText = `${timeLeft}s`
    }, 1000)
    if(timeLeft <= 0) {
        stopGame()
        timeLeft = 0
        clearInterval(intervalId)
    }
    console.log(timeLeft)
}

function stopGame() {
    gameContainer.style.display = "none"
    gameEndContainer.style.display = "block"
    startGameBtn.style.visibility = "visible"
    document.getElementById('final-score').textContent = score
}

//Event Listeners

difficultyEl.addEventListener('change', (e) => {
    difficulty = e.target.value
})

startGameBtn.addEventListener('click', () => {
    startGameBtn.style.visibility = "hidden"
    getWords()
    startCountdown()
    wordInputEl.autofocus = true;
})

wordInputEl.addEventListener('input', (e) => {
    const insertedWord = e.target.value
    if(insertedWord === randomWord) {
        getWords()
        wordInputEl.value = ""
        score++
        scoreEl.textContent = score
        timeLeft += 4
        timeLeftEl.innerText = `${timeLeft}s`
    }
})


