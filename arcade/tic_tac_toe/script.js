const gameBoard = document.getElementById('#gameBoard');
const gameBoardCells = document.querySelectorAll('.cell');
const gameBoardCellsArray = Array.from(gameBoardCells);
const newGameBtn = document.querySelector('#newGame');
const gameStatus = document.querySelector('#status');
let options = ["", "", "", "", "", "", "", "", ""];
const winConditions = [
    [0,1,2], 
    [3,4,5], 
    [6,7,8], 
    [0,3,6], 
    [1,4,7], 
    [2,5,8], 
    [0,4,8], 
    [2,4,6] 
];

const p1name = document.querySelector('#p1name');
const p2name = document.querySelector('#p2name');
let p1nameValue = p1name.value;
let p2nameValue = p2name.value;

let symbol = 'x';
gameStatus.textContent = "Let's play! Enter your names!";


function gameStart() {
    gameBoardCellsArray.forEach(cell => {
        cell.addEventListener('click', addSymbol);
    });
    newGameBtn.addEventListener('click', newGame);
}

gameStart();

function addSymbol(e){
    gameStatus.textContent = `${symbol}'s turn!`;
   const newSymbol = document.createElement('div');
    newSymbol.classList.add(symbol);
    e.target.append(newSymbol);
    console.log(e.target);
    if (symbol === 'x') {
        symbol = 'o';
        gameStatus.textContent = `${symbol}'s turn!`;
    }
    else {
        symbol = 'x';
        gameStatus.textContent = `${symbol}'s turn!`;
    }
    e.target.removeEventListener('click', addSymbol);
}

function checkWin() {
    for (let i = 0; i < winConditions.length; i++) {
      const [a, b, c] = winConditions[i];
      if (options[a] && options[a] === options[b] && options[a] === options[c]) {
        gameStatus.textContent = `${options[a]} wins!`;
        gameBoardCellsArray.forEach(cell => {
          cell.removeEventListener('click', addSymbol);
        });
        return true;
      }
    }
    return false;
  }


// function checkWin() {
//     const winningSets = [
//         [0,1,2],
//         [3,4,5],
//         [6,7,8],
//         [0,3,6],
//         [1,4,7],
//         [2,5,8],
//         [0,4,8],
//         [2,4,6]
//     ];
//     winningSets.forEach(array => {
//        const xWins = array.every(cell => {
//         gameBoardCells[cell].firstChild?.classList.contains('x')});

//         if(xWins) {
//             gameStatus.textContent = "Player X wins!";
//             gameBoardCells.forEach(cell => {
//                 cell.replaceWith(cell.cloneNode(true));
//             });
//             return;
//         }
//     });
//     winningSets.forEach(array => {
//         const oWins = array.every(cell => {
//          gameBoardCells[cell].firstChild?.classList.contains('o')});
 
//          if(oWins) {
//              gameStatus.textContent = "Player O wins!";
//              gameBoardCells.forEach(cell => {
//                  cell.replaceWith(cell.cloneNode(true));
//              });
//              return;
//             }
//      });
// }
