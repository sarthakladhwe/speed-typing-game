const difficultyEl = document.getElementById('difficulty')
const timeLeftEl = document.getElementById('time-left')
const scoreEl = document.getElementById('score')
const wordEl = document.getElementById('word')
const wordInputEl = document.getElementById('word-input')
const settingsBtn = document.getElementById('settings')

async function getWords() {
    const response = await fetch(`https://random-word-api.herokuapp.com/word?length=5&number=30`)
    const data = await response.json()
    wordEl.innerText = `${data[0]}`
}

