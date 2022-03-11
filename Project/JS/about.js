window.addEventListener("load",function(){
    startBtn = this.document.getElementById("moveToGameRoom");
    playerName = this.document.getElementById("PlayerName");
    backBTN = this.document.getElementById("goBack");
    backBTN.addEventListener("click", function () {
        window.location.replace("./mainRoom.html")
    })
    
})

