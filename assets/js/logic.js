
//sounds for the answer Correct/Wrong 
var soundCorrect = new Audio("assets/sounds/correct.wav");
var soundWrong = new Audio("assets/sounds/incorrect.wav");

// Variables to reference DOM elements with their IDs
var questionsEl = document.getElementById("questions");
var choicesEl = document.getElementById("choices");
var submitBtn = document.getElementById("submit");
var enterInitials = document.getElementById("initials");
var startBtn = document.getElementById("start");
var feedbackEl = document.getElementById("feedback");
var TimeEl = docuemnt.gerElementById("time");


//function to hide start screen 
function startQuiz() {
    var startScreenQuiz = document.getElementById("start-screen");
    //adding class to hide  on variable  
    startScreenQuiz.setAttribute("class", "hide");
    questionsEl.removeAttribute("class");






}