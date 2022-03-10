window.addEventListener("load",function(){
    startBtn = this.document.getElementById("moveToGameRoom");
    playerName = this.document.getElementById("PlayerName");
    Difficulty = this.document.getElementById("Difficulty");
    Color = this.document.getElementById("Color");
    backBTN = this.document.getElementById("goBack");
    startBtn.addEventListener("click", changeRoom);
    function changeRoom() {
        if(Difficulty.value.match(/^Easy|Hard$/i)){
            sessionStorage.setItem("difficulty",Difficulty.value );
            if (Color.value.match(/^Red|Blue$/i)) {
                sessionStorage.setItem("color",Color.value );
                window.location.replace("./singlePlayer.html")
                console.log("Valid")
            }
            }
    
        }
    backBTN.addEventListener("click", function () {
        window.location.replace("./mainRoom.html")
    })
    
})
// if ( playerName.value.match(/^[a-z]{3,15}$/i) ) {
//     sessionStorage.setItem("name",playerName.value );
// }
