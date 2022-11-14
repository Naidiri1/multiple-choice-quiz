// variables to keep track of quiz state
var questionOnScreenIndex = 0;
var time = questions.length * 15;
var timerId;

//sounds for the answers if they are Correct/Wrong 
var soundCorrect = new Audio("assets/sounds/correct.wav");
var soundWrong = new Audio("assets/sounds/incorrect.wav");

// Variables to reference DOM elements with their IDs
var questionsEl = document.getElementById("questions");
var choicesEl = document.getElementById("choices");
var submitBtn = document.getElementById("submit");
var enterInitials = document.getElementById("initials");
var startBtn = document.getElementById("start");
var feedbackEl = document.getElementById("feedback");
var timeEl = document.getElementById("time");


//function to hide start screen 
function startQuiz() {
    var startScreenQuiz = document.getElementById("start-screen");

    //adding class to hide  on variable  
    startScreenQuiz.setAttribute("class", "hide");
    questionsEl.removeAttribute("class");

    // timer for the quiz identified with the id 
    timerId = setInterval(clockTick, 1000);

    //show starting time on screen
    timeEl.textContent = time;

    //called function for the question printed on screen 
    getQuestion();

}
function getQuestion() {
    // get current question object from array "questions"
    var questionOnScreen = questions[questionOnScreenIndex];

    // update title with current question tittle on the screen
    var titleEl = document.getElementById("question-title");
    titleEl.textContent = questionOnScreen.title;

    // remove the question choices once is answered
    choicesEl.innerHTML = '';

    // for loop is used to look over the choices are given in the current question 
    for (var i = 0; i < questionOnScreen.choices.length; i++) {

        // create a button for each choice of the questions 
        var choice = questionOnScreen.choices[i];
        var choiceNode = document.createElement("button");
        choiceNode.setAttribute("class", "choice");
        choiceNode.setAttribute("value", choice);

        // adding the choices to the buttons
        choiceNode.textContent = choice;


        // display the choices and the buttons
        choicesEl.appendChild(choiceNode);
    }
}
    //function with conditional statements related to clicking on outer buttons or on correct/incorrect choices 
function responseOnClick(event) {
    var buttonEl = event.target;

    //if the mouse clicks outer the buttons, there is no change
    if (!buttonEl.matches('.choice')) {
        return;
    }

    // check if the user click the worng choice
    if (buttonEl.value !== questions[questionOnScreenIndex].answer) {
        time -= 15;

        if (time < 0) {
            time = 0;
        }

        // display new time on page
        timeEl.textContent = time;

        // play "wrong" sound effect in wrong answer
        soundWrong.play();

        feedbackEl.textContent = "Wrong!, keep trying";
    } else {
        // play "right" sound effect in right answer
        soundCorrect.play();

        feedbackEl.textContent = "Correct! Congrats";
    }
    // flash right/wrong feedback on page for half a second
    feedbackEl.setAttribute("class", "feedback");
    setTimeout(function () {
        feedbackEl.setAttribute("class", "feedback hide");
    }, 10);

    //the questions will appear one by one in order with the index i+ 1+
    questionOnScreenIndex++;
    // to know the lenght of the questions of the quiz use conditional
    if (time <= 0 || questionOnScreenIndex === questions.length) {
        finishQuiz();
    } else {
        getQuestion();
    }
}
// stop timer with a function 
function finishQuiz() {
    clearInterval(timerId);

    // show end screen
    var endShowingScreen = document.getElementById("end-screen");
    endShowingScreen.removeAttribute("class");

    // get scores based on the choices correct
    var finalScoreEl = document.getElementById('final-score');
    finalScoreEl.textContent = time;

    // hide questions section
    questionsEl.setAttribute("class", "hide");
}
function clockTick() {
    time--;
    timeEl.textContent = time;
    if (time <= 0) {
        finishQuiz();
    }

}
//get value of input box
function saveHighscores() {
    var initials = enterInitials.value.trim();

    // make sure value wasn't empty
    if (initials !== '') {
        // get saved scores from localstorage, or if not any, set to empty array
        var highscores =
            JSON.parse(window.localStorage.getItem('highscores')) || [];

        // format new score object for current user
        var newScore = {
            score: time,
            initials: initials,
        };

        // save to localstorage
        highscores.push(newScore);
        window.localStorage.setItem('highscores', JSON.stringify(highscores));

        // redirect to next page
        window.location.href = 'highscores.html';

    }
}
function checkForEnter(event) {
  // to save the scores we can  use the key enter or the button submit 
    if (event.key === 'Enter') {
        saveHighscores();
    }
}

// user clicks button to submit initials and save the score 
submitBtn.onclick = saveHighscores;

// user clicks button to start quiz
startBtn.onclick = startQuiz;

// user clicks on element containing choices with buttons
choicesEl.onclick = responseOnClick;
// user can see the input of the keys ckicked for the name with the score 
enterInitials.onkeyup = checkForEnter;
