window.addEventListener("load",function(){
    startBtn = this.document.getElementById("moveToGameRoom");
    playerName = this.document.getElementById("PlayerName");
    Difficulty = this.document.getElementById("Difficulty");
    Color = this.document.getElementById("Color");
    backBTN = this.document.getElementById("goBack");
    startBtn.addEventListener("click", changeRoom);
    function changeRoom() {
        sessionStorage.setItem("difficulty",Difficulty.value );
        sessionStorage.setItem("color",Color.value );
        window.location.replace("./singlePlayer.html")
    }
    backBTN.addEventListener("click", function () {
        window.location.replace("./mainRoom.html")
    })
    
})

