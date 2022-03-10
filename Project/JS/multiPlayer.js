startBTN = '' ;
playerTurn = 1 ; 
colors = {}
colors[1] = 'red'
colors[-1] = 'blue'
player1status  = '' 
palyer2status  =  ''
isFinish = false; 
result = false;  
moves= 0;
score1 = 0; 
score2 = 0;
num1 = 0 ; 
num2 = 0 ; 

window.addEventListener('load', function(){
    num1 = random() ; 
    num2 = random() ; 
    if(num1==num2) num2 = num1 +1 ;
    document.getElementById("img1").src =`../Media/${num1}.png` ;
    document.getElementById("img2").src =`../Media/${num2}.png` ;
    console.log(num1)
    console.log(num2)
    player1score  = document.getElementById("score1")
    player1score.innerText = '0'
    player1score.classList.add('score')
    player2score  = document.getElementById("score2")
    player2score.innerText = '0' 
    player2score.classList.add('score')
    player1status =  document.getElementById('notification1') ; 
    player2status =  document.getElementById('notification2') ; 
    board = document.getElementsByClassName('cell') ; 
    startBTN = this.document.getElementById('start-button');
    startBTN.addEventListener('click',function(){
        isFinish = false ; 
        moves = 0 ; 
        playerTurn = 1 ; 
        player1status.innerText = ''
        player2status.innerText = ''
        for(var i=0 ; i < 7; i++){board[i].addEventListener("click",change)}
    })
    
  
    function addClass(cell, playerTurn){
            cell.classList.add(colors[playerTurn])
    };
    function change(event){
        console.log(isFinish)
            if(!isFinish){
                var index = Number(event.target.getAttribute("id").substring(1))
                drawOnTheRightpostion(index,colors[playerTurn])
                moves++;
                if(moves >7){
                    console.log("move played")
                        isFinish = checkWin(colors[playerTurn])
                        if(isFinish){
                            if( playerTurn==1){
                                player1status.innerText = "Winner"
                                score1++;
                                player1score.innerText = score1.toString() ;
                                player1score.classList.add('score')
                                player1status.classList.add('notification')
                                player2status.innerText = "Losser"
                                player2status.classList.add('notification')
                                result = setTimeout( confirmAlert, 1000)    
                                if(result==1) {
                                    console.log("result : "+result)
                                    reset(board)
                                }
                                else if(result != 1){
                                    console.log("result : "+result)
                                    window.location.replace("../html/mainRoom.html")
                                }
                            }
                                
                            else{
                                player2status.innerText = "Winner"
                                score2++;
                                player2score.innerText = score2.toString() ;
                                player2score.classList.add('score')
                                player2status.classList.add('notification')
                                player1status.innerText = "Losser"
                                player1status.classList.add('notification')
                                result = setTimeout( confirmAlert, 1000)   
                                if(result==1) {
                                    console.log("result : "+result)
                                    reset(board)
                                }
                                else if(result != 1){
                                    console.log("result : "+result)
                                    window.location.replace("../html/mainRoom.html")
                                }
                                    
                            }
                        }
                }
                playerTurn *= -1
            }
            console.log(moves)
    }
});

//alert firing while game ending and asking to play again 
function confirmAlert(){
    confirm("Play Again ? ")
}
//reaeting cells by removing all events and classes to play again 
function reset(cells){
  for(i = 0; i < cells.length ; i++){
        if(cells[i].classList.value.includes(colors[1]) ){
            cells[i].classList.remove(colors[1]) 
        }
        if(cells[i].classList.value.includes(colors[-1]) ){
            cells[i].classList.remove(colors[-1]) 
        }
  } 

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
function checkWin(color) {

        return (checkRowsHard(color) || checkColumnsHard(color)  || checkDiagonalFirstHard(color)  || checkDiagonalSecondHard(color));
    
}
function drawOnTheRightpostion(postion,color) {
    // check if the seventh line is empty
    if (!(board[postion+35].classList.value.includes(colors[1]) || board[postion+35].classList.value.includes(colors[-1]) )) {

        board[postion+35].classList.add(color);      
    } else if (!(board[postion+28].classList.value.includes(colors[1]) || board[postion+28].classList.value.includes(colors[-1]) )) {

        board[postion+28].classList.add(color);       
    } else if (!(board[postion+21].classList.value.includes(colors[1]) || board[postion+21].classList.value.includes(colors[-1]) )) {

        board[postion+21].classList.add(color);
    } else if (!(board[postion+14].classList.value.includes(colors[1]) || board[postion+14].classList.value.includes(colors[-1]) )) {

        board[postion+14].classList.add(color);
    } else if (!(board[postion+7].classList.value.includes(colors[1]) || board[postion+7].classList.value.includes(colors[-1]) )){

        board[postion+7].classList.add(color);
    } else {
        board[postion].classList.add(color);
        board[postion].removeEventListener("click",move);
    }

}
function random(){
   return Math.floor(Math.random() * (11-1)+1) ; 
}