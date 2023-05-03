
const gameBoard = document.querySelector('#gameBoard');
const gameBoardCells = document.querySelectorAll('.cell');
const gameBoardCellsArray = Array.from(gameBoardCells);
const newGameBtn = document.querySelector('#newGame');
const gameStatus = document.querySelector('#status');
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

gameStart();

function gameStart() {
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
    pXname && pOname.addEventListener('change', nameValues);
    pX = pXname.value;
    pO = pOname.value;
    symbol = 'x';
    gameStatus.textContent = "Let's play! X goes first!";
    nameValues();
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

function addSymbol(e) {
  gameStatus.textContent = `${pX}'s turn!`;
  const newSymbol = document.createElement('div');
  newSymbol.classList.add(symbol);
  e.target.append(newSymbol);

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