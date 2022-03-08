window.addEventListener("load", function () {
    boardContainer = document.getElementsByClassName("gameframe")[0];
    board = document.getElementsByClassName("circle");
    announceLabel = document.getElementById("label");
    gameDifficultyLabel = document.getElementById("gameDifficulty");
    
    

    
    // flags to check whether the game is started , reset otr player is turn or not
    started = 0 ;
    reset = -1 ;
    playerTurn =0;
    playerColor ="red";
    computerColor ="blue";
    gameDifficulty = "";
    startButton =  document.getElementById("start-button");
    resetButton = document.getElementById("reset-button");
    gameResult = "";
    
    //adding Event to start the game
    startButton.addEventListener("click", function () {
        started = 1;
        reset = 0;
        moves = 0;
        /*
        add IDS Dynamically
        */
        // adding event to each elment in the board to allow the player to play
        for (let index = 0 ; index < 7; index++) {
            board[index].addEventListener("click", move);
           
        }
        gameDifficulty = prompt("Enter the level of Difficulty. Hard or Easy");
        gameDifficultyLabel.innerText = `Single player ${gameDifficulty} `;
        announceLabel.innerText = `Your Turn`;
        
            
       
    });
    // Sending alert to the player to notify him that the game has not been started
    boardContainer.addEventListener("click", function () {
        if (started === 0) {
            alert("You have to press start to be able to play");
        }
    });
    // adding event to allow the player reset the board
    resetButton.addEventListener("click", function () {
        if (started === 1) {
           // asking the player whether he is sure he wnts to reset
           if (playerTurn !== 2) {
                let playerResponse= confirm("Are you sure you want to reset the game");
                if (playerResponse) {
                    resetBoard();
                }
           }else{
               resetBoard();
           }
           
            
        } else if( started === 0){
            alert("You have to start the game first");
        }
    })
});
function resetBoard() {
    for (let index = 0; index < board.length; index++) {
        if (board[index].classList.value.includes(playerColor)) {
            board[index].classList.remove(playerColor);
        } else if(board[index].classList.value.includes(computerColor)) {
            board[index].classList.remove(computerColor);
        }
        if (index <= 6) {
            board[index].removeEventListener("click",move);
        }
    }
    started = 0 ;
    playerTurn =0;
}

function move(event){
    // checking wether it's player is turn or not
    if (playerTurn === 0) {
        // changing the color of the right position
        
        let position =Number(event.target.getAttribute("id").substring(1));
        drawOnTheRightpostion(position,playerColor)
        playerTurn=1;
        moves++;
        // checking if event is removed
        console.log(`${event.target} is clicked`) 
        //Computer Move 
        if (moves >= 7) {
            if (checkWin(playerColor)) {
                // used setTimeout to allow the program to draw the fourth chip before the alert is shown
                gameResult = "Won";
                setTimeout(result,500);
                playerTurn = 2;
            } else {
                setTimeout(ComputerMove,1000);
                announceLabel.innerText = `PC Turn`;
            }
        } else {
            setTimeout(ComputerMove,1000);
            announceLabel.innerText = `PC Turn`;
        }   
    } else if( playerTurn === 2){
        // handeling the game has finished 
        alert("The game is over.To play again, press reset")
    }
}
function result(){
    let playerAnswer =confirm(`You have ${gameResult} the game. 
    Do you want to play again`);
    if (playerAnswer) {
        resetBoard();
    } else {
        window.location.replace("mainRoom.html");
    }
    
}

function ComputerMove() {    
        while (playerTurn === 1) {
            let postion = randomPostion();
                 if (!(board[postion].classList.value.includes(playerColor) || board[postion].classList.value.includes(computerColor) )) {
                    drawOnTheRightpostion(postion, computerColor)
                    
                    moves++;
                    console.log(`This postion ${postion} is empty`)
                    console.log(`${board[postion]} is clicked`);
                    if (moves >= 7) {
                        if(checkWin(computerColor)){
                            // used setTimeout to allow the program to draw the fourth chip before the alert is shown
                            gameResult = "lost";
                            setTimeout(result,500);
                            playerTurn = 2;
                        }else{
                           playerTurn =0;
                           announceLabel.innerText = `Your Turn`;
                        }

                    } else {
                        playerTurn =0; 
                        announceLabel.innerText = `Your Turn`;
                    }       
                }
                
            
        }     
}   
function randomPostion() {
    return Math.floor(Math.random() * 7 );
}
function drawOnTheRightpostion(postion,color) {
    // check if the seventh line is empty
    if (!(board[postion+35].classList.value.includes(playerColor) || board[postion+35].classList.value.includes(computerColor) )) {

        board[postion+35].classList.add(color);      
    } else if (!(board[postion+28].classList.value.includes(playerColor) || board[postion+28].classList.value.includes(computerColor) )) {

        board[postion+28].classList.add(color);       
    } else if (!(board[postion+21].classList.value.includes(playerColor) || board[postion+21].classList.value.includes(computerColor) )) {

        board[postion+21].classList.add(color);
    } else if (!(board[postion+14].classList.value.includes(playerColor) || board[postion+14].classList.value.includes(computerColor) )) {

        board[postion+14].classList.add(color);
    } else if (!(board[postion+7].classList.value.includes(playerColor) || board[postion+7].classList.value.includes(computerColor) )){

        board[postion+7].classList.add(color);
    } else {
        board[postion].classList.add(color);
        board[postion].removeEventListener("click",move);
    }

}
function checkWin(color) {
    if (gameDifficulty === "Easy") {
        return (checkRowsEasy(color) || checkColumnsEasy(color)  || checkDiagonalFirstEasy(color)  || checkDiagonalSecondEasy(color));
    } else if(gameDifficulty === "Hard") {
        return (checkRowsHard(color) || checkColumnsHard(color)  || checkDiagonalFirstHard(color)  || checkDiagonalSecondHard(color));
    }
    
    
    
}
function checkRowsEasy(color) {
    // row seven
    if(checkEachRowEasy(35, color) || checkEachRowEasy(36, color) || checkEachRowEasy(37, color) || checkEachRowEasy(38, color)){
        return true;
    }else if (checkEachRowEasy(28, color) || checkEachRowEasy(29, color) || checkEachRowEasy(30, color) || checkEachRowEasy(31, color)) {
        return true;
    }else if (checkEachRowEasy(21, color) || checkEachRowEasy(22, color) || checkEachRowEasy(23, color) || checkEachRowEasy(24, color)) {
        return true;
    }else if (checkEachRowEasy(14, color) || checkEachRowEasy(15, color) || checkEachRowEasy(16, color) || checkEachRowEasy(17, color)) {
        return true;
    }else if (checkEachRowEasy(7, color) || checkEachRowEasy(8, color) || checkEachRowEasy(9, color) || checkEachRowEasy(10, color)) {
        return true;
    }else if (checkEachRowEasy(0, color) || checkEachRowEasy(1, color) || checkEachRowEasy(2, color) || checkEachRowEasy(3, color)) {
        return true;
    }
    return false;
}
function checkEachRowEasy(number,color){
    return board[number].classList.value.includes(color) && board[number+1].classList.value.includes(color) && board[number+2].classList.value.includes(color) && board[number+3].classList.value.includes(color);
}
function checkColumnsEasy(color) {

    if(checkEachColumnEasy(35, color) || checkEachColumnEasy(28, color) || checkEachColumnEasy(21, color)){
        return true;
    }else if (checkEachColumnEasy(36, color) || checkEachColumnEasy(29, color) || checkEachColumnEasy(22, color)) {
        return true;
    }else if (checkEachColumnEasy(37, color) || checkEachColumnEasy(30, color) || checkEachColumnEasy(23, color)) {
        return true;
    }else if (checkEachColumnEasy(38, color) || checkEachColumnEasy(31, color) || checkEachColumnEasy(24, color)) {
        return true;
    }else if (checkEachColumnEasy(39, color) || checkEachColumnEasy(32, color) || checkEachColumnEasy(25, color) ) {
        return true;
    }else if (checkEachColumnEasy(40, color) || checkEachColumnEasy(33, color) || checkEachColumnEasy(26, color) ) {
        return true;
    }else if (checkEachColumnEasy(41, color) || checkEachColumnEasy(34, color) || checkEachColumnEasy(27, color) ) {
        return true;
    }
    return false;
}
function checkEachColumnEasy(number,color){
    return (board[number].classList.value.includes(color) && board[number-7].classList.value.includes(color) && board[number-14].classList.value.includes(color) && board[number-21].classList.value.includes(color));
}
function checkDiagonalFirstEasy(color) {
    
     return checkEachDiagonalFromSixEasy(21, color) || checkEachDiagonalFromSixEasy(28, color) || checkEachDiagonalFromSixEasy(22, color) ||checkEachDiagonalFromSixEasy(35, color) || checkEachDiagonalFromSixEasy(29, color) || checkEachDiagonalFromSixEasy(23, color) ||    checkEachDiagonalFromSixEasy(36, color) || checkEachDiagonalFromSixEasy(30, color) || checkEachDiagonalFromSixEasy(24, color) || checkEachDiagonalFromSixEasy(37, color) || checkEachDiagonalFromSixEasy(31, color) || checkEachDiagonalFromSixEasy(38, color);
         
}
function checkEachDiagonalFromSixEasy(number,color){
    return (board[number].classList.value.includes(color) && board[number-6].classList.value.includes(color) && board[number-12].classList.value.includes(color) && board[number-18].classList.value.includes(color));
}
function checkDiagonalSecondEasy(color) {
    
    return checkEachDiagonalFromZeroEasy(38, color) || checkEachDiagonalFromZeroEasy(39, color) || checkEachDiagonalFromZeroEasy(31, color) ||checkEachDiagonalFromZeroEasy(40, color) || checkEachDiagonalFromZeroEasy(32, color) || checkEachDiagonalFromZeroEasy(24, color) ||    checkEachDiagonalFromZeroEasy(41, color) || checkEachDiagonalFromZeroEasy(33, color) || checkEachDiagonalFromZeroEasy(25, color) || checkEachDiagonalFromZeroEasy(34, color) || checkEachDiagonalFromZeroEasy(26, color) || checkEachDiagonalFromZeroEasy(27, color);
        
}
function checkEachDiagonalFromZeroEasy(number,color){
   return (board[number].classList.value.includes(color) && board[number-8].classList.value.includes(color) && board[number-16].classList.value.includes(color) && board[number-24].classList.value.includes(color));
}

function checkRowsHard(color) {
    // row seven
    if(checkEachRowHard(35, color) || checkEachRowHard(36, color) || checkEachRowHard(37, color)){
        return true;
    }else if (checkEachRowHard(28, color) || checkEachRowHard(29, color) || checkEachRowHard(30, color)) {
        return true;
    }else if (checkEachRowHard(21, color) || checkEachRowHard(22, color) || checkEachRowHard(23, color)) {
        return true;
    }else if (checkEachRowHard(14, color) || checkEachRowHard(15, color) || checkEachRowHard(16, color)) {
        return true;
    }else if (checkEachRowHard(7, color) || checkEachRowHard(8, color) || checkEachRowHard(9, color)) {
        return true;
    }else if (checkEachRowHard(0, color) || checkEachRowHard(1, color) || checkEachRowHard(2, color)) {
        return true;
    }
    return false;
}
function checkEachRowHard(number,color){
    return board[number].classList.value.includes(color) && board[number+1].classList.value.includes(color) && board[number+2].classList.value.includes(color) && board[number+3].classList.value.includes(color) && board[number+4].classList.value.includes(color);
}
function checkColumnsHard(color) {

    if(checkEachColumnHard(35, color) || checkEachColumnHard(28, color)){
        return true;
    }else if (checkEachColumnHard(36, color) || checkEachColumnHard(29, color)) {
        return true;
    }else if (checkEachColumnHard(37, color) || checkEachColumnHard(30, color)) {
        return true;
    }else if (checkEachColumnHard(38, color) || checkEachColumnHard(31, color)) {
        return true;
    }else if (checkEachColumnHard(39, color) || checkEachColumnHard(32, color) ) {
        return true;
    }else if (checkEachColumnHard(40, color) || checkEachColumnHard(33, color)) {
        return true;
    }else if (checkEachColumnHard(41, color) || checkEachColumnHard(34, color)) {
        return true;
    }
    return false;
}
function checkEachColumnHard(number,color){
    return (board[number].classList.value.includes(color) && board[number-7].classList.value.includes(color) && board[number-14].classList.value.includes(color) && board[number-21].classList.value.includes(color) && board[number-28].classList.value.includes(color));
}
function checkDiagonalFirstHard(color) {
    
     return checkEachDiagonalFromSixHard(28, color) || checkEachDiagonalFromSixHard(35, color) || checkEachDiagonalFromSixHard(29, color) ||   checkEachDiagonalFromSixHard(36, color) || checkEachDiagonalFromSixHard(30, color) || checkEachDiagonalFromSixHard(37, color) ;
         
}
function checkEachDiagonalFromSixHard(number,color){
    return (board[number].classList.value.includes(color) && board[number-6].classList.value.includes(color) && board[number-12].classList.value.includes(color) && board[number-18].classList.value.includes(color) && board[number-24].classList.value.includes(color));
}
function checkDiagonalSecondHard(color) {
    
    return checkEachDiagonalFromZeroHard(41, color) || checkEachDiagonalFromZeroHard(40, color) || checkEachDiagonalFromZeroHard(39, color) ||checkEachDiagonalFromZeroHard(34, color) || checkEachDiagonalFromZeroHard(33, color) || checkEachDiagonalFromZeroHard(32, color);
        
}
function checkEachDiagonalFromZeroHard(number,color){
   return (board[number].classList.value.includes(color) && board[number-8].classList.value.includes(color) && board[number-16].classList.value.includes(color) && board[number-24].classList.value.includes(color) && board[number-32].classList.value.includes(color));
}