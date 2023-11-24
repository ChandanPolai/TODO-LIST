const questions=[
    {
        question:"what is the full form of HTML?",
        answers:[
            {text:"hyper markup language", correct:false},
            {text:"hypertext markup language", correct:true},
            {text:"hyper king language", correct:false},
            {text:"markup language", correct:false},
        ]
    },
    {
        question:"what is the full form of CSS?",
        answers:[
            {text:"case cading stylesheet", correct:false},
            {text:"cading sheet", correct:false},
            {text:"casecading style sheet", correct:true},
            {text:"cading sheet style", correct:false},
        ]
    },
    {
        question:"what is the correct syntax of javascript?",
        answers:[
            {text:"console.log('hello world')", correct:false},
            {text:"console.log'hello world'", correct:false},
            {text:"consolelog('hello world')", correct:false},
            {text:"console.log('hello world');", correct:true},
        ]
    },
    {
        question:"which one is a dynamics programming language?",
        answers:[
            {text:"javascript", correct:true},
            {text:"c++", correct:false},
            {text:"html", correct:false},
            {text:"c++", correct:false},
        ]
    },
];

const questionElement=document.getElementById("question");
const answerButtons=document.getElementById("answer-buttons");
const nextButton=document.getElementById("next-btn");

// 🛺our timer varaibles
const barTimer=document.querySelector(".bar-timer");
const Timer=document.querySelector(".timer");

// 🪲🪲our timer function

let timeLeft = 10; // Set initial time
let timerInterval;

function startTimer() {
    timerInterval = setInterval(() => {
        if (timeLeft <= 0) {
            clearInterval(timerInterval);
            Timer.textContent = "0";
            barTimer.style.width = "0px";
            setTimeout(() => {
                alert("Sorry, your time is over. The game will restart. 🤖");
                window.location.reload();
            }, 500); // Adding a slight delay before showing the alert
        } else {
            Timer.textContent = timeLeft;
            barTimer.style.width = timeLeft * 40 + "px";
            timeLeft--;
        }
    }, 1000);
}



// 🚀🚀stop the timer function
function stopTimer() {
    clearInterval(timerInterval);
}

 
let currentQuestionIndex=0;
let score=0;

// 😶‍🌫️ the quiz start function
function startQuiz(){
    currentQuestionIndex=0;
    score=0;
    nextButton.innerHTML="Next";

    // 🤖call the show question function
    showQuestion();
    startTimer(); // Start the timer when the quiz begins

};

function showQuestion(){
    // 👀👀erase the button inner html in index.html function call
    resetState();

    // ⬇️this code was question increase code
    let currentQuestion=questions[currentQuestionIndex];
    let questionNo=currentQuestionIndex+1;
    questionElement.innerText=questionNo+". "+currentQuestion.question;

    // ⬇️we have create button and append their parent button div
    currentQuestion.answers.forEach(answer =>{
        const button=document.createElement("button");
        button.innerHTML=answer.text;
        button.classList.add("btn");
        answerButtons.appendChild(button);

        if (answer.correct) {
            button.dataset.correct = true;
        }
        button.addEventListener("click",selectAnser);
    });
};

    // ⬇️this code was remove html buttons inner text
function resetState(){
    nextButton.style.display="none";
    while(answerButtons.firstChild){
        answerButtons.removeChild(answerButtons.firstChild);
};
};

function selectAnser(e){
    // the timer will be stop when click any answers buttons 📢
    stopTimer();
    const selectedBtn=e.target;
    const isCorrect=selectedBtn.dataset.correct === "true";

    // 📢check the answer is correct in the answers and change their background📢
    if (isCorrect) {
        selectedBtn.classList.add("correct");
        // ✅when the answer is correct the score value is in crease
        score++;
    } else {
        selectedBtn.classList.add("incorrect");
        
    };
    
    // ⬇️⬇️this array.form method used to buutons parentdiv and check data set is true or not
    Array.from(answerButtons.children).forEach(button => {
        if (button.dataset.correct === "true") {
            button.classList.add("correct");
        }
        button.disabled="true";
    });
    nextButton.style.display="block";
};

// 🐍🐍define the showscore function
function showScore(){
    resetState();
    questionElement.innerHTML=`you scored ${score} out of ${questions.length}`;
    nextButton.innerHTML="play again";
    nextButton.style.display="block";

    // ✅when the score is show notify the user.......
    nextButton.addEventListener("click",() =>{
        alert("😊THE GAME IS OVER refresh the page and again play the game😊")
        window.location.reload();
    });
};


function handleNextButton() {
    if (currentQuestionIndex < questions.length - 1) {
        currentQuestionIndex++;
        showQuestion();
        timeLeft = 10; // Reset the time left to initial value
        Timer.textContent = timeLeft; // Update the timer display
        barTimer.style.width = timeLeft * 40 + "px"; // Update the visual timer
        startTimer(); // Start the timer again for the new question
    } else {
        showScore();
    }
};

// 🚀🚀 when the user clicked the next button check the index and procees to jump next ques...
nextButton.addEventListener("click", () =>{

    if (currentQuestionIndex < questions.length) {
        handleNextButton();
    } 
});

// ✅✅our quiz apk was start
startQuiz();
