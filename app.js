/* NOTE
1. ONCE pageload it will never refresh
2. No libraries
3. No CSS
*/



//==================== MODEL ====================== // manage rules
var _round = 0;
// detect win or tie
var detectWinOrTie = () => {

  // WIN rules if:
  // 1. three same mark on the same row
  // 2. three same mark on the same column
  // 3. three same mark diagonally top left to bottom right
  // 4. three same mark diagonally top right to bottom left
    // detect the mark
    // call show who wins with input of that mark

  // if the board has no more space left
  if (_round === 9) {
    // call show wins with input "tie"
    showWhoWins('tie');
  }
};

// Rules for next player
var whoIsNextPlayer = () => {
  var isEven = (num) => {
    return num%2 === 0
  }
  // First player is always x (odd round)
  if (!isEven(_round)) {
    return 'x'
  // second play is always o (even round)
  } else {
    return 'o'
  }
}

//==================== VIEW ====================== // x o and the board
// show mark (input = clicked element)
var showMark = (DOMSpace) => {
  // if current DOM have no mark
  if (!DOMSpace.textContent) {
    // check next player rules > return x or o
    var nextPlayer = whoIsNextPlayer();
    DOMSpace.textContent = nextPlayer;

    // count number of round at the end of every turn
    _round++;
    document.getElementById('round').textContent = `Round: ${_round}`
  }
};

// show who wins (input = x or o or tie)
var showWhoWins = (winner) => {
  var element = document.getElementById('winner');
  // if (x or o)
  if (winner !== 'tie') {
    // add div element says "X or O wins"
    element.textContent = `${winner} is the Winner!!!`;
  // if (tie)
  } else {
    // add div element says "tie"
    element.textContent = `Tie!!`;
  }
};





//==================== CONTROLLER ====================== // handle events

// handle button to reset game


// Get element that user click
var board = document.getElementById('board');
// handle click (always start with player x)
board.onclick = function (e) {
  // call show mark (input = clicked element)
  showMark(e.target);
};



// ==================== APP initialize ======================
detectWinOrTie();