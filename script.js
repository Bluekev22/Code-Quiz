//When button is clicked the timer starts and the questions appear
var startBtn = document.querySelector(".start-button");
var startBox = document.querySelector(".start-box");
var questionBox = document.querySelector(".container");

var timer = document.getElementById("time");

var secondsLeft = 76;

startBtn.onclick = () =>{
    startBox.classList.add("hidden");
    questionBox.classList.remove("hidden");
    setTime();
}

function setTime() {
    renderQuestion();
    var timerInterval = setInterval(function() {
      secondsLeft--;
      timer.textContent = "Seconds Left: " + secondsLeft;
  
      if(secondsLeft === 0) {
        clearInterval(timerInterval);
        sendMessage();
        }
  }, 1000);

    function sendMessage() {
        var scoreText = document.getElementById("score");
        scoreText.textContent = "Game Over!!";
       }
   }


  //Questions put into an array
  var question = document.querySelector("#question");
  var choiceA = document.getElementById("A");
  var choiceB = document.getElementById("B");
  var choiceC = document.getElementById("C");
  var choiceD = document.getElementById("D");
  var scoreText = document.getElementById("score");
  var score = 0;
  
  let questions = [
      {
          question: "Commonly used data types DO NOT include:",
          choiceA: "1. strings",
          choiceB: "2. booleans",
          choiceC: "3. alerts",
          choiceD: "4. numbers",
          correct: "C",
      },
      {
          question: "The condition in an if/else statement is enclosed within _____.",
          choiceA: "1. quotes",
          choiceB: "2. curly brackets",
          choiceC: "3. parentheses",
          choiceD: "4. square brackets",
          correct: "C",
      },
      {
          question: "Arrays in JavaScript can be used to store _____.",
          choiceA: "1. numbers and strings",
          choiceB: "2. other arrays",
          choiceC: "3. booleans",
          choiceD: "4. all of the above",
          correct: "D",
      },
      {
          question: "String values must be enclosed within _____ when being assigned to variables.",
          choiceA: "1. commas",
          choiceB: "2. curly brackets",
          choiceC: "3. quotes",
          choiceD: "4. parentheses",
          correct: "C",
      },
      {
          question: "A very useful tool used during development and debugging for printing content to the debugger is:",
          choiceA: "1. JavaScript",
          choiceB: "2. terminal/bash",
          choiceC: "3. for loops",
          choiceD: "4. console.log",
          correct: "D",
      },

      
  ]
 
  //Renders the questions into the HTML
var lastQuestion = questions.length -1;
var runningQuestion = 0;

function renderQuestion() {
    var q = questions[runningQuestion];

    question.innerHTML = "<h1>"+ q.question +"</h1>";
    choiceA.innerHTML = q.choiceA;
    choiceB.innerHTML = q.choiceB;
    choiceC.innerHTML = q.choiceC;
    choiceD.innerHTML = q.choiceD;
}

//If answer is correct you receive 100 points
function checkAnswer(answer){
    if(answer == questions[runningQuestion].correct){
        score += 100;
        scoreText.innerHTML = "score: " + score;
        answerIsCorrect();
    } else {
        answerIsWrong();
    }

    //Asks each question
    if(runningQuestion < lastQuestion) {
        runningQuestion++;
        renderQuestion();

       //after no more questions then the form is initiated
    } else {
        initialScore();
    }
}

//Renders to the page if answer was correct or not
var showAnswer = document.getElementById("show-answer");
var form = document.querySelector(".form.hidden")
var finalScore = document.querySelector(".final-score");

function answerIsCorrect() {
    showAnswer.innerHTML = "Correct!";
    showAnswer.style = "color: green";
}

function answerIsWrong() {
    showAnswer.innerHTML = "Wrong!";
    showAnswer.style = "color: red";
    secondsLeft -= 10;
}

//Form is initiated to input Initials and see final score
function initialScore() {
    questionBox.classList.add("hidden");
    form.classList.remove("hidden");
    finalScore.innerHTML = "your final score is " + score + " !";
    
}

//Saves score and initials into an array
var form2 = document.querySelector(".form");
var input = document.getElementById("submit");
var text = document.getElementById("text");
var initials = [];
var highScoreSection = document.querySelector(".highscore.hidden");

form2.addEventListener("submit", function(event) {
    event.preventDefault();
    var initialText = text.value.trim();
    
    if (initialText === "") {
      return;
    }
  
    initials.push(initialText, score);
    text.value = "";
   
    storeInitialsandScore();
  });

  //Saves the array into local storage
  function storeInitialsandScore() {
    localStorage.setItem("initials", JSON.stringify(initials));
    
    highScorePage();
  }


  //Shows the highscore page
  function highScorePage() {
      form2.classList.add("hidden");
      highScoreSection.classList.remove("hidden");
      init();
  }

  //Retrieves the array from local storage
  var scoreList = document.querySelector(".list");

  function init() {
 
    var storedScores = JSON.parse(localStorage.getItem("initials"));
    
    if (storedScores !== null) {
      scorings = storedScores;
    }
    
    //Appends the array onto an ordered list
    var li = document.createElement("li");
    li.textContent = storedScores;
    scoreList.appendChild(li);
    
    //Removes the array from the ordered list if the clear button is clicked
    clearButton.onclick = () =>{

        scoreList.removeChild(li); 
         
     }
}

//Goes back the the start if the Go Back button is clicked
var backButton = document.querySelector(".back");
var clearButton = document.querySelector(".clear");

backButton.onclick = () =>{
    startBox.classList.remove("hidden");
    highScoreSection.classList.add("hidden");
    
}


