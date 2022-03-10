window.addEventListener("load", function () {
    // capturing buttons
   singleButton = this.document.getElementById("singlePlayerButton");
   multiButton = this.document.getElementById("multiPlayerButton");
   aboutButton = this.document.getElementById("aboutButton");
   // adding event to each button
   singleButton.addEventListener("click", function () {

       window.location.replace("./singleInfo.html");
        // redirect To the single player Room
    })
    multiButton.addEventListener("click", function () {
        window.location.replace("./multiPlayer.html");
        
     })
     aboutButton.addEventListener("click", function () {
      //  window.location.replace("./singlePlayer.html");
     
     })
});