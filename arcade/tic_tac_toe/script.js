
const gameBoard = document.querySelector('#gameBoard');
const gameBoardCells = document.querySelectorAll('.cell');
const gameBoardCellsArray = Array.from(gameBoardCells);
const newGameBtn = document.querySelector('#newGame');
const gameStatus = document.querySelector('#status');
const gameMode = document.querySelector('#gameMode');
const gameSettings = document.querySelector('#gameSettings');
const gameSettingsContent = document.querySelector('#gameSettingsContent');
const startGameBtn = document.querySelector('#startGame');
const gameSettingsBtn = document.querySelector('#gameSettingsButton');
const pXscoreboard = document.querySelector('#p1Tally');
const pOscoreboard = document.querySelector('#p2Tally');
let pXscore = 0;
let pOscore = 0;
let options = ["", "", "", "", "", "", "", "", ""];
const winConditions = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];
const pXname = document.querySelector('#p1name');
const pOname = document.querySelector('#p2name');

let pX = '';
let pO = '';
let symbol = '';
gameStatus.textContent = "Let's play! X goes first!";
gameSettingsContent.style.display = 'none';

gameSettingsBtn.addEventListener('click', () => {
  console.log("booger")
  gameSettings.style.display = "block";
  gameSettingsContent.style.display = 'flex';
});

startGameBtn.addEventListener('click', gameStart);

gameStart();



function gameStart() {
  gameSettings.style.display = "none";
  gameSettingsContent.style.display = 'none';
  gameBoardCellsArray.forEach(cell => {
    cell.innerHTML = '';
    cell.addEventListener('click', addSymbol);
    cell.dataset.index = gameBoardCellsArray.indexOf(cell);
  });
    gameBoardCellsArray.forEach(cell => {
      cell.addEventListener('click', addSymbol);
    });
    newGameBtn.addEventListener('click', gameStart);
    options = ["", "", "", "", "", "", "", "", ""];
    gameMode.addEventListener('change', soloGame);
    pXname && pOname.addEventListener('change', nameValues);
    pX = pXname.value;
    pO = pOname.value;
    symbol = 'x';
    gameStatus.textContent = "Let's play! X goes first!";
    nameValues();
    soloGame();
    keepScore();
  }
  
function soloGame() {
  if (gameMode.value === "1 Player") {
    pOname.value = 'Computer';
    pOname.disabled = true;
  } else if (gameMode.value === "2 Player") {
    pOname.value = '';
    pOname.disabled = false;
  }
}

function nameValues() {
    if (pX === '') {
        pX = 'Player X';
    } else {
        pX = pXname.value;
    }
    if (pO === '') {
        pO = 'Player O';
    } else {
        pO = pOname.value;
    }
}

function computerMove() {
  const randomCell = Math.floor(Math.random() * 9);
  if (options[randomCell] === '') {
    gameBoardCellsArray[randomCell].click();
  } else {
    computerMove();
  }

function keepScore() {
  if (checkWin() && gameStatus.textContent === `${pX} wins!`) {
    pXscore++;
    pXscoreboard.textContent = pXscore;
  } else if (checkWin() && gameStatus.textContent === `${pO} wins!`) {
    pOscore++;
    pOscoreboard.textContent = pOscore;
  }
}

function addSymbol(e) {
  gameStatus.textContent = `${pX}'s turn!`;
  const newSymbol = document.createElement('div');
  newSymbol.classList.add(symbol);
  e.target.append(newSymbol);

  if (gameMode.value === "1 Player" && symbol === 'x') {
    computerMove();
  }

  if (symbol === 'x') {
    symbol = 'o';
    gameStatus.textContent = `${pO}'s turn!`;
  } else {
    symbol = 'x';
  }

  e.target.removeEventListener('click', addSymbol);
  options[e.target.dataset.index] = newSymbol.classList[0];
  checkWin();
}

function checkWin() {
    for (let i = 0; i < winConditions.length; i++) {
      const [a, b, c] = winConditions[i];
      if (options[a] && options[a] === options[b] && options[a] === options[c]) {
        const winner = options[a] === 'x' ? pX : pO;
        gameStatus.textContent = `${winner} wins!`;
        gameBoardCellsArray.forEach(cell => {
          cell.removeEventListener('click', addSymbol);
        });
        return true;
      }
    }
    if (options.every(option => option !== '')) {
      gameStatus.textContent = "It's a tie!";
      gameBoardCellsArray.forEach(cell => {
        cell.removeEventListener('click', addSymbol);
      });
      return true;
    }
    return false;
  }