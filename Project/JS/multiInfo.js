window.addEventListener("load",function(){
    startBtn = this.document.getElementById("moveToGameRoom");
    playerOneName = this.document.getElementById("playerOneName");
    playerTwoName = this.document.getElementById("playerTwoName");

    Difficulty = this.document.getElementById("Difficulty");
    Color = this.document.getElementById("Color");
    backBTN = this.document.getElementById("goBack");
    startBtn.addEventListener("click", changeRoom);
    function changeRoom() {
        if (playerOneName.value.match(/^[a-z]{3,15}$/i) && playerTwoName.value.match(/^[a-z]{3,15}$/i)) {
            sessionStorage.setItem("difficultyMultiPlayer",Difficulty.value );
            sessionStorage.setItem("playerOneName",playerOneName.value );
            sessionStorage.setItem("playerTwoName",playerTwoName.value );
            console.log(Difficulty.value , playerOneName.value, playerTwoName.value)
            window.location.replace("./multiPlayer.html")
        }else{
            alert("You have To enter the name of two players with each one having length between[3,15]")
        }
        
    }
    backBTN.addEventListener("click", function () {
        window.location.replace("./mainRoom.html")
    })
    
})

