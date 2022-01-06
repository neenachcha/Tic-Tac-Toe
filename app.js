/* NOTE
1. ONCE pageload it will never refresh
2. No libraries
3. No CSS
*/

//==================== MODEL ====================== // manage rules
var board = document.getElementById('board');
var _round = 0;
var resetButtonArr = document.getElementsByClassName('button');
var element = document.getElementById('winner');

var detectWinOrTie = () => {
  var winner = detectEasy() ;
  if (winner) {
    showWhoWins(winner);
    freezeGame();
    return;
  }
  if (_round === 9) {
    showWhoWins('tie');
    freezeGame();
    return;
  }
};

var whoIsNextPlayer = () => {
  var isEven = (num) => {
    return num%2 === 0
  }
  if (!isEven(_round)) {
    return 'x'
  } else {
    return 'o'
  }
}

//==================== HELPER ======================
var getBoardArray = () => {
  var boardArr = [];
  board = document.getElementById('board');
  var trs = board.getElementsByTagName('tr');

  for (var tr of trs) {
    var tds = tr.getElementsByTagName('td');
    var rowArr = [];
    for (var td of tds) {
      rowArr.push(td.textContent);
    }
    boardArr.push(rowArr);
  }
  return boardArr;
};

var detectEasy = () => {
  // WIN rules if:
  // 1. three same mark on the same row
  // 2. three same mark on the same column
  // 3. three same mark diagonally top left to bottom right
  // 4. three same mark diagonally top right to bottom left
  var board = getBoardArray();
  var mark = '';
  var detectRow = (r) => {
    if (r[0] === r[1] && r[1] === r[2]) {
      mark = r[0];
    }
  }
  var detectCol = (c) => {
    if (board[0][c] === board[1][c] && board[1][c] === board[2][c]) {
      mark = board[0][c];
    }
  }
  var detectDiagonalLeft = () => {
    if (board[0][0] === board[1][1] && board[1][1] === board[2][2]) {
      mark = board[0][0];
    }
  }
  var detectDiagonalRight = () => {
    if (board[0][2] === board[1][1] && board[1][1] === board[2][0]) {
      mark = board[0][2];
    }
  }
  board.forEach(row => {
    detectRow(row);
  });
  for (var i = 0; i < 3; i++) {
    detectCol(i);
  }
  detectDiagonalLeft();
  detectDiagonalRight();
  return mark;
};

//==================== VIEW ======================

var showMark = (DOMSpace) => {
  if (!DOMSpace.textContent) {
    var nextPlayer = whoIsNextPlayer();
    DOMSpace.textContent = nextPlayer;
    _round++;
    document.getElementById('round').textContent = `Round: ${_round}`
  }
};

var showWhoWins = (winner) => {
  if (winner !== 'tie') {
    element.textContent = `${winner} is the Winner!!!`;
  } else {
    element.textContent = `Tie!!`;
  }
};

var freezeGame = () => {
  board.removeEventListener('click', handleClick);
  resetButtonArr[0].style.visibility = 'visible';
}

var newGame = () => {
  resetButtonArr[0].style.visibility = 'hidden';
  board.addEventListener('click', handleClick);
  element.textContent = 'Have fun!'
  _round = 0;

  var trs = board.getElementsByTagName('tr');
  for (var tr of trs) {
    var tds = tr.getElementsByTagName('td');
    for (var td of tds) {
      td.textContent = '';
    }
  }
}




//==================== CONTROLLER ====================== // handle events
// handle button to reset game
resetButtonArr[0].onclick = function (e) {
  newGame();
}

var handleClick = function (e) {
  showMark(e.target);
  detectWinOrTie();
};
board.addEventListener('click', handleClick);




// ==================== APP initialize ======================
detectWinOrTie();
resetButtonArr[0].style.visibility = 'hidden';