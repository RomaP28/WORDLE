import { dictionary } from './dictionary.js';
let randomWord = getRandomWord()
let currentRow = 0;

function getRandomWord() {
  let ran = dictionary[Math.floor(Math.random() * dictionary.length - 1)]
  console.log(ran)
  return ran
}

function createField() {
  const field = document.querySelector('.field')
  for (let i = 0; i < 30; i++) {
    const input = document.createElement('input')
    field.appendChild(input)
    input.setAttribute('maxlength', 1)
    input.setAttribute('id', i)
    input.setAttribute('readonly', true)
    input.addEventListener('keyup', e => {
      if (!/^([a-zа-яії]|backspace)$/i.test(e.key)) {
        return
      }
      if (!input.getAttribute('readonly')) {
        if (e.code !== 'Backspace') {
          (i + 1) % 5 === 0 ? document.getElementById('check').focus() : document.getElementById(i + 1).focus();
        } else {
          i > currentRow && document.getElementById(i - 1).focus()
        }
      }
    })
  }
  activateRow()
}

function activateRow() {
  for (let i = currentRow; i < currentRow + 5; i++) {
    document.getElementById(i).removeAttribute('readonly')
  }
  document.getElementById(currentRow).focus()
}

function checkResult(res) {
  if (res === randomWord) {
    return 'win'
  } else if (!dictionary.includes(res)) {
    alert('Word not in the dictionary')
    for (let i = currentRow; i < currentRow + 5; i++) {
      document.getElementById(i).value = ''
    }
  } else if (currentRow === 25) {
    return 'game over'
  } else if (dictionary.includes(res) && res !== randomWord) {
    for (let i = 0; i < res.length; i++) {
      if (randomWord.includes(res[i])) {
        for (let j = i; j < randomWord.length; j++) {
          document.getElementById(currentRow + j).setAttribute('style', 'background-color:yellow')
          randomWord[j] === res[j] && document.getElementById(currentRow + j).setAttribute('style', 'background-color:green')
        }
      } else {
        document.getElementById(currentRow + i).setAttribute('style', 'background-color:grey')
      }
      document.getElementById(currentRow + i).setAttribute('readonly', true)
    }
    return 'next line'
  }
}

function resetGame() {
  for (let i = 0; i < 30; i++) {
    document.getElementById(i).value = ''
    document.getElementById(i).setAttribute('style', 'background-color:white')
    document.getElementById(i).setAttribute('readonly', true)
  }
  currentRow = 0
  randomWord = getRandomWord()
  console.log(randomWord)
  activateRow()
}

document.getElementById('check').addEventListener('click', function () {
  let result = '';
  for (let i = currentRow; i < currentRow + 5; i++) {
    result += document.getElementById(i).value.toLowerCase()
  }
  let res = checkResult(result)
  if (res === 'win') {
    alert('Congratulations! You won!')
    resetGame()
  } else if (res === 'next line') {
    currentRow += 5;
    activateRow()
  } else if (res === 'game over') {
    alert(`Game over! It was ${randomWord.toUpperCase()}`)
    resetGame()
  }
})

document.getElementById('reset').addEventListener('click', function () {
  resetGame()
})

createField()
document.getElementById(currentRow).focus()