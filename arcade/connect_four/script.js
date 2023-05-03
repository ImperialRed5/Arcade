const gameBoard = document.querySelector('#gameBoard');
const gameBoardCells = document.querySelectorAll('.cell');
const gameBoardCellsArray = Array.from(gameBoardCells);
const newGameBtn = document.querySelector('#newGame');
const gameStatus = document.querySelector('#status');
let options = ["", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", ""];
const winConditions = [
  [0, 1, 2, 3],
  [1, 2, 3, 4],
  [2, 3, 4, 5],
  [3, 4, 5, 6],
  [7, 8, 9, 10],
  [8, 9, 10, 11],
  [9, 10, 11, 12],
  [10, 11, 12, 13],
  [14, 15, 16, 17],
  [15, 16, 17, 18],
  [16, 17, 18, 19],
  [17, 18, 19, 20],
  [21, 22, 23, 24],
  [22, 23, 24, 25],
  [23, 24, 25, 26],
  [24, 25, 26, 27],
  [28, 29, 30, 31],
  [29, 30, 31, 32],
  [30, 31, 32, 33],
  [31, 32, 33, 34],
  [35, 36, 37, 38],
  [36, 37, 38, 39],
  [37, 38, 39, 40],
  [38, 39, 40, 41],
  [0, 7, 14, 21],
  [1, 8, 15, 22],
  [2, 9, 16, 23],
  [3, 10, 17, 24],
  [4, 11, 18, 25],
  [5, 12, 19, 26],
  [6, 13, 20, 27],
  [7, 14, 21, 28],
  [8, 15, 22, 29],
  [9, 16, 23, 30],
  [10, 17, 24, 31],
  [11, 18, 25, 32],
  [12, 19, 26, 33],
  [13, 20, 27, 34],
  [14, 21, 28, 35],
  [15, 22, 29, 36],
  [16, 23, 30, 37],
  [17, 24, 31, 38],
  [18, 25, 32, 39],
  [19, 26, 33, 40],
  [20, 27, 34, 41],
];
const redName = document.querySelector('#p1name');
const greenName = document.querySelector('#p2name');

let red = '';
let green = '';
let symbol = '';
gameStatus.textContent = "Let's play! Player 1 goes first!";

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
    options = ["", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", ""];
    pXname && pOname.addEventListener('change', nameValues);
    red = redName.value;
    green = greenName.value;
    symbol = 'x';
    gameStatus.textContent = "Let's play! Player 1 goes first!";
    nameValues();
  }
  
function nameValues() {
    if (red === '') {
        red = 'Player 1';
    } else {
        red = redName.value;
    }
    if (green === '') {
        green = 'Player 2';
    } else {
        green = greenName.value;
    }
}

function addSymbol(e) {
  let columnIndex = e.target.dataset.index % 7;
  let rowIndex = 0;
  while (rowIndex < 6 && options[columnIndex + rowIndex * 7] === "") {
    rowIndex++;
  }
  if (rowIndex > 0 && options[columnIndex + (rowIndex - 1) * 7] === "") {
    rowIndex--;
    options[columnIndex + rowIndex * 7] = symbol;
    e.target.innerHTML = symbol;
    if (symbol === 'x') {
    e.target.classList.add('x');
    symbol = 'o';
    gameStatus.textContent = ${pO}'s turn!;
    } else {
    e.target.classList.add('o');
    symbol = 'x';
    gameStatus.textContent = ${pX}'s turn!;
    }
    checkWin();
    }
    }
    
    function checkWin() {
    for (let i = 0; i < winConditions.length; i++) {
    const [a, b, c, d] = winConditions[i];
    if (options[a] && options[a] === options[b] && options[b] === options[c] && options[c] === options[d]) {
    gameStatus.textContent = ${options[a].toUpperCase()} wins!;
    gameBoardCellsArray.forEach(cell => {
    cell.removeEventListener('click', addSymbol);
    });
    return;
    }
    }
    if (!options.includes("")) {
    gameStatus.textContent = "It's a draw!";
    }
    }






// function checkWin() {
//     for (let i = 0; i < winConditions.length; i++) {
//       const [a, b, c] = winConditions[i];
//       if (options[a] && options[a] === options[b] && options[a] === options[c]) {
//         const winner = options[a] === 'x' ? pX : pO;
//         gameStatus.textContent = `${winner} wins!`;
//         gameBoardCellsArray.forEach(cell => {
//           cell.removeEventListener('click', addSymbol);
//         });
//         return true;
//       }
//     }
//     if (options.every(option => option !== '')) {
//       gameStatus.textContent = "It's a tie!";
//       gameBoardCellsArray.forEach(cell => {
//         cell.removeEventListener('click', addSymbol);
//       });
//       return true;
//     }
//     return false;
//   }
  
