// buttons
const startBtnEl = document.getElementById('start-btn');
const nextBtnEl = document.getElementById('next-btn');
const answerBtn1El = document.getElementById('btn-1');
const answerBtn2El = document.getElementById('btn-2');
const answerBtn3El = document.getElementById('btn-3');
const answerBtn4El = document.getElementById('btn-4');
const submitbtn = document.getElementById('submit-btn');
const GoBackbtn = document.getElementById('go-back-btn');
const clearHighBtn = document.getElementById('clear-high-btn');

// elements
const questContainerEl = document.getElementById('question-container');
const startPageContainerEl = document.getElementById('start-page');
const questionEl = document.getElementById('question');
const timeShow = document.getElementById('timer')
const answerReply = document.getElementById('answer-reply');
const finalScorePage = document.getElementById('final-score-page');
const initialsInput = document.getElementById('input-area');
const finalScoreNumber = document.getElementById('final-score');
const highScoresPage = document.getElementById('high-scores-page');
const viewHighScoresLink  = document.getElementById('view-high-scores-link');
const scoreList = document.ol;


// Button event listeners
startBtnEl.addEventListener('click', startGame);
answerBtn1El.addEventListener('click', checkAnswer);
answerBtn2El.addEventListener('click', checkAnswer);
answerBtn3El.addEventListener('click', checkAnswer);
answerBtn4El.addEventListener('click', checkAnswer);
GoBackbtn.addEventListener('click', restartGame);
clearHighBtn.addEventListener('click', clearLocal);


let timeSeconds = 60;
timeShow.innerHTML = timeSeconds;
let questionIndex = 0;
let score = 0;
let timer


// after start button is clicked, startGame() is run
function startGame() {
    startBtnEl.classList.add('hide');
    questContainerEl.classList.remove('hide');
    startPageContainerEl.classList.add('hide');
    timeShow.classList.remove('hide');
    questionIndex = 0;
    nextQuestion();
    startTimer();
}

// next question is presented
function nextQuestion() {
    if (questions.length > questionIndex || timeSeconds == 0)  {
        printQuestion(questions[questionIndex]);
        answerReply.classList.add('hide');
    }
    else {
        finalScore();
        clearInterval(countdown);
      
    }
}

// Print the question and answers
function printQuestion() {
    questionEl.innerText = questions[questionIndex].question;
    answerBtn1El.innerText = questions[questionIndex].choiceA;
    answerBtn2El.innerText = questions[questionIndex].choiceB;
    answerBtn3El.innerText = questions[questionIndex].choiceC;
    answerBtn4El.innerText = questions[questionIndex].choiceD;
 
}


// Print correct or wrong. Remove time if wrong. Delay the next question by 3 seconds so answer can be read.
function checkAnswer(e) {
    const selectedBtn = e.target.innerText;
    
    // If Correct...
    if (questions[questionIndex].correct == selectedBtn) {
        score++;
        questionIndex++;
        answerReply.classList.remove('hide');
        answerReply.innerHTML = 'Correct!';
        setTimeout(function(){
            nextQuestion();
        }, 2000);
        
        

    }
    // If Wrong...
    else {
        timeSeconds = timeSeconds - 10;
        questionIndex++;
        answerReply.classList.remove('hide');
        answerReply.innerHTML = 'Wrong!';
        setTimeout(function(){
            nextQuestion();
        }, 2000);
        
    }
}



// Start the timer countdown
function startTimer() {
    timer = setInterval(countdown, 1000);
    countdown();
}
    
 

function countdown() {
     
        timeSeconds--;
        timeShow.innerHTML = timeSeconds;
        if(timeSeconds == 0) {
            finalScore();
        }
    

    
        
}



    

// Show final score and enter initials
function finalScore() {
    startBtnEl.classList.add('hide');
    questContainerEl.classList.add('hide');
    startPageContainerEl.classList.add('hide');
    finalScorePage.classList.remove('hide');
    finalScoreNumber.innerHTML = 'Your final score is ' + score + '.';
    timeShow.classList.add('hide');
    viewHighScoresLink.classList.add('hide');
    clearInterval(timer);
    

}

// Allow user to store highscore with initials

// Array storing questions and answers
var questions = [
    {
    question: "Is javascript fun?",
        choiceA: "Yes",
        choiceB: "No", 
        choiceC: "Yes?",
        choiceD: "maybe",
        correct: "Yes"
    }, 
    {
        question: "What can you use instead of CSS?",
            choiceA: "jquery",
            choiceB: "html", 
            choiceC: "Bootstrap",
            choiceD: "java",
            correct: "Bootstrap"
        },
        {
            question: "Where can you find shortcuts for javascript?",
                choiceA: "jquery",
                choiceB: "html", 
                choiceC: "Bootstrap",
                choiceD: "java",
                correct: "jquery"
            },
            {
                question: "What is a good source for Javascript documentation?",
                    choiceA: "Slack",
                    choiceB: "html", 
                    choiceC: "Bootstrap",
                    choiceD: "MDN",
                    correct: "MDN"
                }
            
];


// create an array from the user input
submitbtn.addEventListener("click", function(event) {
    event.preventDefault();
     var idInput = initialsInput.value.trim()
    // create object from submission
  
    var user = {
        Initials: idInput,
        Score: score
    };
    var userlist = [];
    userlist.push(user);

    

    // set new submission to local storage
    localStorage.setItem("user", JSON.stringify(userlist));

    goHighScores();
});


// create a array and list from the string in local storage for the high scores page
function list() {
    var createScoresList = localStorage.getItem("user");
    var scoresArray = createScoresList.split(" ");
    console.log(scoresArray[0]);

    listEl = document.createElement('ul');
    listItemsNum = scoresArray.length;
    listItem = document.createElement('li');

    document.getElementById('score-list').appendChild(listEl); 

    for (i = 0; i < listItemsNum; i++) {
        listItem = document.createElement('li');
        listItem.innerHTML = scoresArray[i];
        listEl.appendChild(listItem);
    }

};


 


// show high scores page
var goHighScores = function() {
    startBtnEl.classList.add('hide');
    questContainerEl.classList.add('hide');
    startPageContainerEl.classList.add('hide');
    finalScorePage.classList.add('hide');
    highScoresPage.classList.remove('hide');
    timeShow.classList.add('hide');
    viewHighScoresLink.classList.add('hide');
    clearInterval(timer);
    list();
    
};

// When Go back button is clicked, take the user back to the start page
function restartGame() {
    startBtnEl.classList.remove('hide');
    questContainerEl.classList.add('hide');
    startPageContainerEl.classList.remove('hide');
    finalScorePage.classList.add('hide');
    highScoresPage.classList.add('hide');
    timeShow.classList.add('hide');
    viewHighScoresLink.classList.remove('hide');
    clearInterval(timer);
    timeSeconds = 60;
    
    
       


};

// clear local storage with clear high scores button
function clearLocal() {
    localStorage.clear();
    answerReply.classList.remove('hide');
    restartGame();

    


    

    
};









