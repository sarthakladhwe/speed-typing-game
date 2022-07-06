const difficultyEl = document.getElementById('difficulty')
const timeLeftEl = document.getElementById('time-left')
const scoreEl = document.getElementById('score')
const wordEl = document.getElementById('word')
const wordInputEl = document.getElementById('word-input')
const settingsBtn = document.getElementById('settings')
const startGameBtn = document.getElementById('start-game')

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
    randomWord = data[0]
    wordEl.textContent = randomWord
}

function startCountdown() {
    const intervalId = setInterval(() => {
        if(timeLeft <= 0) {
            stopGame()
            clearInterval(intervalId)
        }
        timeLeft--
        timeLeftEl.innerText = `${timeLeft}s`
    }, 1000)
}

//Event Listeners

difficultyEl.addEventListener('change', (e) => {
    difficulty = e.target.value
})

startGameBtn.addEventListener('click', () => {
    startGameBtn.style.visibility = "hidden"
    getWords()
    startCountdown()
})

wordInputEl.addEventListener('input', (e) => {
    const insertedWord = e.target.value
    if(insertedWord === randomWord) {
        getWords()
        wordInputEl.value = ""
        score++
    }
})

