
// This function will either get scores from localstorage or set to empty array
function showHighScores() {

    var highscoresStorage = JSON.parse(window.localStorage.getItem('highscores')) || [];

    // Sort highscores by score property in descending order
    highscoresStorage.sort(function (x, y) {

        return y.score - x.score;
    });

    // use for loop to look for the total of <li> and store them from the higher to the lowest 
    // and then show them in the list(s) with the input name of the user 
    for (var i = 0; i < highscoresStorage.length; i++) {
        var listTags = document.createElement("li");
        listTags.textContent = highscoresStorage[i].initials + "  your score is: " + highscoresStorage[i].score;

        //Once the lists are made/ add content of the scores on them 
        var olEl = document.getElementById("highscores");
        olEl.appendChild(listTags);
    }
}
// function clear the lists of the scores storaged  
function clearHighscores() {
    window.localStorage.removeItem("highscores");
    window.location.reload();
}

// adding function to the button of clear highscores onces is clicked.
document.getElementById('clear').onclick = clearHighscores;

// run function when page loads
showHighScores();
