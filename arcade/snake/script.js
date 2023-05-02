
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
const p1name = document.querySelector('#p1name');
const p2name = document.querySelector('#p2name');

let p1 = '';
let p2 = '';
let symbol = '';
gameStatus.textContent = "Let's play! Enter your names!";

gameStart();
nameValues();

function gameStart() {
    gameBoardCellsArray.forEach(cell => {
        cell.innerHTML = '';
        cell.addEventListener('click', addSymbol);
        cell.dataset.index = gameBoardCellsArray.indexOf(cell);
      });
      options = ["", "", "", "", "", "", "", "", ""];
      gameStatus.textContent = "Let's play! Enter your names!";
      symbol = '';
      p1name.value = '';
      p2name.value = '';
      newGameBtn.addEventListener('click', gameStart()); 
    }
//     gameBoardCellsArray.forEach((cell, index) => {
//       if (cell.children.length > 0) {
//         options[index] = cell.children[0].classList[0];
//       }
//     });
//     gameBoardCellsArray.forEach(cell => {
//       cell.addEventListener('click', addSymbol);
//     });
//     newGameBtn.addEventListener('click', newGame);
//     options = ["", "", "", "", "", "", "", "", ""];
//     p1 = p1name.value;
//     p2 = p2name.value;
//     symbol = 'x';
//     nameValues();
//   }
  
function nameValues() {
    if (p1 === '') {
        p1 = 'Player 1';
    } else {
        p1 = p1name.value;
    }
    if (p2 === '') {
        p2 = 'Player 2';
    } else {
        p2 = p2name.value;
    }
}

function addSymbol(e) {
  gameStatus.textContent = `${p1}'s turn!`;
  const newSymbol = document.createElement('div');
  newSymbol.classList.add(symbol);
  e.target.append(newSymbol);

  if (symbol === 'x') {
    symbol = 'o';
    gameStatus.textContent = `${p2}'s turn!`;
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
        const winner = options[a] === 'x' ? p1 : p2;
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
  
// function newGame() {
//   gameBoardCellsArray.forEach(cell => {
//     cell.innerHTML = '';
//     cell.addEventListener('click', addSymbol);
//     cell.dataset.index = gameBoardCellsArray.indexOf(cell);
//   });
//   options = ["", "", "", "", "", "", "", "", ""];
//   gameStatus.textContent = "Let's play! Enter your names!";
//   symbol = '';
//   p1name.value = '';
//   p2name.value = '';
//   gameStart();
// }
