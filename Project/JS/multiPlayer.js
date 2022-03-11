startBTN = '';
playerTurn = 1;
colors = {};
names = {};
colors[1] = 'red';
colors[-1] = 'blue';
player1status = '';
palyer2status = '';
isFinish = false;
result = false;
moves = 0;
score1 = 0;
score2 = 0;
num1 = 0;
num2 = 0;

window.addEventListener('load', function () {
  num1 = random();
  num2 = random();
  if (num1 == num2) num2 = num1 + 1;
  document.getElementById('img1').src = `../Media/${num1}.png`;
  document.getElementById('img2').src = `../Media/${num2}.png`;
  console.log(num1);
  console.log(num2);
  player1score = document.getElementById('score1');
  player1score.innerText = '0';
  player1score.classList.add('score');
  player2score = document.getElementById('score2');
  player2score.innerText = '0';
  player2score.classList.add('score');
  player1status = document.getElementById('notification1');
  player2status = document.getElementById('notification2');
  announceLabel = document.getElementById('label');
  announceLabel.innerText = `Press Start to play`;
  playerNameOne = document.getElementById("playerOneName");
  playerNameTwo = document.getElementById("playerTwoName");
  gameDifficultyLabel = document.getElementById('gameDifficulty');
  gameDifficulty = this.sessionStorage.getItem("difficultyMultiPlayer");
  names[1] = this.sessionStorage.getItem("playerOneName");
  names[-1]= this.sessionStorage.getItem("playerTwoName");
  console.log(gameDifficulty);
  playerNameOne.innerText = names[1];
  playerNameTwo.innerText = names[-1];
  gameDifficultyLabel.innerText = `Single player ${gameDifficulty.toUpperCase()} `;
  board = document.getElementsByClassName('circle');
  startBTN = this.document.getElementById('start-button');
  startBTN.addEventListener('click', startGame);
 
  homeBtn = this.document.getElementById('home-button');
  homeBtn.addEventListener('click', function () {
    result1 = confirm('Want to leave game ? ');
    if (result1) {
      console.log('result : ' + result1);
      window.location.replace('../html/mainRoom.html');
    }
  });

  
});
function addClass(cell, playerTurn) {
  cell.classList.add(colors[playerTurn]);
}
function change(event) {
  console.log(isFinish);
  if (!isFinish) {
    var index = Number(event.target.getAttribute('id').substring(1));
    drawOnTheRightpostion(index, colors[playerTurn]);
    moves++;
    if (moves >= 7) {
      console.log('move played');
      isFinish = checkWin(colors[playerTurn]);
      if (isFinish) {
        if (playerTurn == 1) {
          player1status.innerText = 'Winner';
          score1++;
          player1score.innerText = score1.toString();
          player1score.classList.add('score');
          player1status.classList.add('notification');
          player2status.innerText = 'Losser';
          player2status.classList.add('notification');
          setTimeout(confirmAlert, 1000);
        } else {
          player2status.innerText = 'Winner';
          score2++;
          player2score.innerText = score2.toString();
          player2score.classList.add('score');
          player2status.classList.add('notification');
          player1status.innerText = 'Loser';
          player1status.classList.add('notification');
          setTimeout(confirmAlert, 1000);
        }
      }
    }
      playerTurn *= -1;
      announceLabel.innerText = `${names[playerTurn]}'s Turn`;
    
    
  }
  console.log(moves);
}
function startGame() {
  isFinish = false;
  moves = 0;
  playerTurn = 1;
  player1status.innerText = '';
  player2status.innerText = '';
  for (var i = 0; i < 7; i++) {
    board[i].addEventListener('click', change);
  }
  announceLabel.innerText = `${names[playerTurn]}'s Turn`;
  startBTN.removeEventListener('click', startGame);
};
//alert firing while game ending and asking to play again
function confirmAlert() {
  result = confirm('Play Again ? ');
  if (result) {
    console.log('result : ' + result);
    reset(board);
  } else {
    console.log('result : ' + result);
    window.location.replace('../html/mainRoom.html');
  }
}
//reaeting cells by removing all events and classes to play again
function reset(cells) {
  for (i = 0; i < cells.length; i++) {
    if (cells[i].classList.value.includes(colors[1])) {
      cells[i].classList.remove(colors[1]);
    }
    if (cells[i].classList.value.includes(colors[-1])) {
      cells[i].classList.remove(colors[-1]);
    }
  }
  // add this to allow players to start playing once he clicks ok on the confirm
  startGame();
  //startBTN.addEventListener('click', startGame);
}

function checkRowsHard(color) {
  // row seven
  if (
    checkEachRowHard(35, color) ||
    checkEachRowHard(36, color) ||
    checkEachRowHard(37, color)
  ) {
    return true;
  } else if (
    checkEachRowHard(28, color) ||
    checkEachRowHard(29, color) ||
    checkEachRowHard(30, color)
  ) {
    return true;
  } else if (
    checkEachRowHard(21, color) ||
    checkEachRowHard(22, color) ||
    checkEachRowHard(23, color)
  ) {
    return true;
  } else if (
    checkEachRowHard(14, color) ||
    checkEachRowHard(15, color) ||
    checkEachRowHard(16, color)
  ) {
    return true;
  } else if (
    checkEachRowHard(7, color) ||
    checkEachRowHard(8, color) ||
    checkEachRowHard(9, color)
  ) {
    return true;
  } else if (
    checkEachRowHard(0, color) ||
    checkEachRowHard(1, color) ||
    checkEachRowHard(2, color)
  ) {
    return true;
  }
  return false;
}
function checkEachRowHard(number, color) {
  return (
    board[number].classList.value.includes(color) &&
    board[number + 1].classList.value.includes(color) &&
    board[number + 2].classList.value.includes(color) &&
    board[number + 3].classList.value.includes(color) &&
    board[number + 4].classList.value.includes(color)
  );
}
function checkColumnsHard(color) {
  if (checkEachColumnHard(35, color) || checkEachColumnHard(28, color)) {
    return true;
  } else if (checkEachColumnHard(36, color) || checkEachColumnHard(29, color)) {
    return true;
  } else if (checkEachColumnHard(37, color) || checkEachColumnHard(30, color)) {
    return true;
  } else if (checkEachColumnHard(38, color) || checkEachColumnHard(31, color)) {
    return true;
  } else if (checkEachColumnHard(39, color) || checkEachColumnHard(32, color)) {
    return true;
  } else if (checkEachColumnHard(40, color) || checkEachColumnHard(33, color)) {
    return true;
  } else if (checkEachColumnHard(41, color) || checkEachColumnHard(34, color)) {
    return true;
  }
  return false;
}
function checkEachColumnHard(number, color) {
  return (
    board[number].classList.value.includes(color) &&
    board[number - 7].classList.value.includes(color) &&
    board[number - 14].classList.value.includes(color) &&
    board[number - 21].classList.value.includes(color) &&
    board[number - 28].classList.value.includes(color)
  );
}
function checkDiagonalFirstHard(color) {
  return (
    checkEachDiagonalFromSixHard(28, color) ||
    checkEachDiagonalFromSixHard(35, color) ||
    checkEachDiagonalFromSixHard(29, color) ||
    checkEachDiagonalFromSixHard(36, color) ||
    checkEachDiagonalFromSixHard(30, color) ||
    checkEachDiagonalFromSixHard(37, color)
  );
}
function checkEachDiagonalFromSixHard(number, color) {
  return (
    board[number].classList.value.includes(color) &&
    board[number - 6].classList.value.includes(color) &&
    board[number - 12].classList.value.includes(color) &&
    board[number - 18].classList.value.includes(color) &&
    board[number - 24].classList.value.includes(color)
  );
}
function checkDiagonalSecondHard(color) {
  return (
    checkEachDiagonalFromZeroHard(41, color) ||
    checkEachDiagonalFromZeroHard(40, color) ||
    checkEachDiagonalFromZeroHard(39, color) ||
    checkEachDiagonalFromZeroHard(34, color) ||
    checkEachDiagonalFromZeroHard(33, color) ||
    checkEachDiagonalFromZeroHard(32, color)
  );
}
function checkEachDiagonalFromZeroHard(number, color) {
  return (
    board[number].classList.value.includes(color) &&
    board[number - 8].classList.value.includes(color) &&
    board[number - 16].classList.value.includes(color) &&
    board[number - 24].classList.value.includes(color) &&
    board[number - 32].classList.value.includes(color)
  );
}
function checkWin(color) {
  if (gameDifficulty === 'Easy') {
    return (
      checkRowsEasy(color) ||
      checkColumnsEasy(color) ||
      checkDiagonalFirstEasy(color) ||
      checkDiagonalSecondEasy(color)
    );
  } else if (gameDifficulty === 'Hard') {
    return (
      checkRowsHard(color) ||
      checkColumnsHard(color) ||
      checkDiagonalFirstHard(color) ||
      checkDiagonalSecondHard(color)
    );
  }
}
function checkRowsEasy(color) {
  // row seven
  if (
    checkEachRowEasy(35, color) ||
    checkEachRowEasy(36, color) ||
    checkEachRowEasy(37, color) ||
    checkEachRowEasy(38, color)
  ) {
    return true;
  } else if (
    checkEachRowEasy(28, color) ||
    checkEachRowEasy(29, color) ||
    checkEachRowEasy(30, color) ||
    checkEachRowEasy(31, color)
  ) {
    return true;
  } else if (
    checkEachRowEasy(21, color) ||
    checkEachRowEasy(22, color) ||
    checkEachRowEasy(23, color) ||
    checkEachRowEasy(24, color)
  ) {
    return true;
  } else if (
    checkEachRowEasy(14, color) ||
    checkEachRowEasy(15, color) ||
    checkEachRowEasy(16, color) ||
    checkEachRowEasy(17, color)
  ) {
    return true;
  } else if (
    checkEachRowEasy(7, color) ||
    checkEachRowEasy(8, color) ||
    checkEachRowEasy(9, color) ||
    checkEachRowEasy(10, color)
  ) {
    return true;
  } else if (
    checkEachRowEasy(0, color) ||
    checkEachRowEasy(1, color) ||
    checkEachRowEasy(2, color) ||
    checkEachRowEasy(3, color)
  ) {
    return true;
  }
  return false;
}
function checkEachRowEasy(number, color) {
  return (
    board[number].classList.value.includes(color) &&
    board[number + 1].classList.value.includes(color) &&
    board[number + 2].classList.value.includes(color) &&
    board[number + 3].classList.value.includes(color)
  );
}
function checkColumnsEasy(color) {
  if (
    checkEachColumnEasy(35, color) ||
    checkEachColumnEasy(28, color) ||
    checkEachColumnEasy(21, color)
  ) {
    return true;
  } else if (
    checkEachColumnEasy(36, color) ||
    checkEachColumnEasy(29, color) ||
    checkEachColumnEasy(22, color)
  ) {
    return true;
  } else if (
    checkEachColumnEasy(37, color) ||
    checkEachColumnEasy(30, color) ||
    checkEachColumnEasy(23, color)
  ) {
    return true;
  } else if (
    checkEachColumnEasy(38, color) ||
    checkEachColumnEasy(31, color) ||
    checkEachColumnEasy(24, color)
  ) {
    return true;
  } else if (
    checkEachColumnEasy(39, color) ||
    checkEachColumnEasy(32, color) ||
    checkEachColumnEasy(25, color)
  ) {
    return true;
  } else if (
    checkEachColumnEasy(40, color) ||
    checkEachColumnEasy(33, color) ||
    checkEachColumnEasy(26, color)
  ) {
    return true;
  } else if (
    checkEachColumnEasy(41, color) ||
    checkEachColumnEasy(34, color) ||
    checkEachColumnEasy(27, color)
  ) {
    return true;
  }
  return false;
}
function checkEachColumnEasy(number, color) {
  return (
    board[number].classList.value.includes(color) &&
    board[number - 7].classList.value.includes(color) &&
    board[number - 14].classList.value.includes(color) &&
    board[number - 21].classList.value.includes(color)
  );
}
function checkDiagonalFirstEasy(color) {
  return (
    checkEachDiagonalFromSixEasy(21, color) ||
    checkEachDiagonalFromSixEasy(28, color) ||
    checkEachDiagonalFromSixEasy(22, color) ||
    checkEachDiagonalFromSixEasy(35, color) ||
    checkEachDiagonalFromSixEasy(29, color) ||
    checkEachDiagonalFromSixEasy(23, color) ||
    checkEachDiagonalFromSixEasy(36, color) ||
    checkEachDiagonalFromSixEasy(30, color) ||
    checkEachDiagonalFromSixEasy(24, color) ||
    checkEachDiagonalFromSixEasy(37, color) ||
    checkEachDiagonalFromSixEasy(31, color) ||
    checkEachDiagonalFromSixEasy(38, color)
  );
}
function checkEachDiagonalFromSixEasy(number, color) {
  return (
    board[number].classList.value.includes(color) &&
    board[number - 6].classList.value.includes(color) &&
    board[number - 12].classList.value.includes(color) &&
    board[number - 18].classList.value.includes(color)
  );
}
function checkDiagonalSecondEasy(color) {
  return (
    checkEachDiagonalFromZeroEasy(38, color) ||
    checkEachDiagonalFromZeroEasy(39, color) ||
    checkEachDiagonalFromZeroEasy(31, color) ||
    checkEachDiagonalFromZeroEasy(40, color) ||
    checkEachDiagonalFromZeroEasy(32, color) ||
    checkEachDiagonalFromZeroEasy(24, color) ||
    checkEachDiagonalFromZeroEasy(41, color) ||
    checkEachDiagonalFromZeroEasy(33, color) ||
    checkEachDiagonalFromZeroEasy(25, color) ||
    checkEachDiagonalFromZeroEasy(34, color) ||
    checkEachDiagonalFromZeroEasy(26, color) ||
    checkEachDiagonalFromZeroEasy(27, color)
  );
}
function checkEachDiagonalFromZeroEasy(number, color) {
  return (
    board[number].classList.value.includes(color) &&
    board[number - 8].classList.value.includes(color) &&
    board[number - 16].classList.value.includes(color) &&
    board[number - 24].classList.value.includes(color)
  );
}

function drawOnTheRightpostion(postion, color) {
  // check if the seventh line is empty
  if (
    !(
      board[postion + 35].classList.value.includes(colors[1]) ||
      board[postion + 35].classList.value.includes(colors[-1])
    )
  ) {
    board[postion + 35].classList.add(color);
  } else if (
    !(
      board[postion + 28].classList.value.includes(colors[1]) ||
      board[postion + 28].classList.value.includes(colors[-1])
    )
  ) {
    board[postion + 28].classList.add(color);
  } else if (
    !(
      board[postion + 21].classList.value.includes(colors[1]) ||
      board[postion + 21].classList.value.includes(colors[-1])
    )
  ) {
    board[postion + 21].classList.add(color);
  } else if (
    !(
      board[postion + 14].classList.value.includes(colors[1]) ||
      board[postion + 14].classList.value.includes(colors[-1])
    )
  ) {
    board[postion + 14].classList.add(color);
  } else if (
    !(
      board[postion + 7].classList.value.includes(colors[1]) ||
      board[postion + 7].classList.value.includes(colors[-1])
    )
  ) {
    board[postion + 7].classList.add(color);
  } else {
    board[postion].classList.add(color);
    board[postion].removeEventListener('click', change);
  }
}
function random() {
  return Math.floor(Math.random() * (7 - 1) + 1);
}
