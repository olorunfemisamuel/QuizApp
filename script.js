const questions = [
    {
        question: "Which is the largest animal in the World?",
        answers: [
            {text: "Shark", correct: false},
            {text: "Blue Whale", correct: true},
            {text: "Elephant", correct: false},
            {text: "Giraffe", correct: false},
        ]
    },
    {
        question: "When will we see Mr. Miracle's girlfriend?",
        answers: [
        {text: "In 2 years", correct: false},
        {text: "In 2 weeks", correct: false},
        {text: "In 2 days", correct: false},
        {text: "Never", correct: true},
        ]
    },
    {
        question: "When will Mr. Miracle marry?",
        answers: [
        {text: "In 2 years time", correct: false},
        {text: "In 3 years time", correct: false},
        {text: "In two weeks time", correct: true},
        {text: "In two months time", correct: false},
        ]
    },
    {
        question: "Will Mr. Miracle become a Tech Pastor?",
        answers: [
        {text: "No", correct: false},
        {text: "Never", correct: false},
        {text: "Absolutely", correct: false},
        {text: "Him no dey think am but God go use am", correct: true},
        ]
    }
];

const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answers-buttons");
const nextButton = document.getElementById("next-btn");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz () {
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "Next";
    showQuestion ();
}

function showQuestion () {
    resetState();
    let currentQuestion = questions [currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNo + " . " + currentQuestion.question;

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        answerButtons.appendChild(button);
        if(answer.correct) {
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click", selectAnswer);
    })
}

function resetState () {
    nextButton.style.display = "none";
    while(answerButtons.firstChild) {
        answerButtons.removeChild(answerButtons.firstChild);
    }
}

function selectAnswer(e) {
    const selectedBtn = e.target; 
    const isCorrect = selectedBtn.dataset.correct === "true";
    if (isCorrect){
        selectedBtn.classList.add ("correct");
        score++;
    }else{
        selectedBtn.classList.add("incorrect");
    }
    Array.from (answerButtons.children).forEach(button => {
        if (button.dataset.correct === "true"){
            button.classList.add ("correct");
        }
        button.disabled = true;
    });
    nextButton.style.display = "block";
}

function showScore() {
    resetState ();
    questionElement.innerHTML = `You scored ${score} out of
     ${questions.length}!`;
     nextButton.innerHTML = "Take another test";
     nextButton.style.display = "block";
} 

function handleNextButton(){
    currentQuestionIndex++;
    if(currentQuestionIndex < questions.length) {
        showQuestion();
    }else {
        showScore();
    }
}


nextButton.addEventListener ("click", ()=> {
    if (currentQuestionIndex < questions.length ) {
        handleNextButton();
    }else{
        startQuiz();
    }
});

startQuiz();