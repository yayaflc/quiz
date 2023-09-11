const questions = [
    {
        question: "Qual é o maior animal do mundo?",
        answers: [
            { text: "Elefante", correct: false },
            { text: "Girafa", correct: false },
            { text: "Baleia-azul", correct: true },
            { text: "Besouro-rinoceronte", correct: false },
            { text: "Lula-colossal", correct: false },
        ],
    },
    {
        question: "Qual desses animais é carnívoro?",
        answers: [
            { text: "Furão", correct: true },
            { text: "Zebra", correct: false },
            { text: "Alce", correct: false },
            { text: "Bisão", correct: false },
            { text: "Canguru", correct: false },
        ],
    },
    {
        question: "Qual animal passa 90% do dia dormindo?",
        answers: [
            { text: "Alpaca", correct: false },
            { text: "Gato", correct: false },
            { text: "Bicho-preguiça", correct: false },
            { text: "Coala", correct: true },
            { text: "Cobra", correct: false },
        ],
    },
    {
        question: "Qual desses mamíferos põe ovos?",
        answers: [
            { text: "Castor", correct: false },
            { text: "Ornitorinco", correct: true },
            { text: "Esquilo", correct: false },
            { text: "Lontra", correct: false },
            { text: "Morcegos", correct: false },
        ],
    },
];

const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "avançar";
    showQuestion();
}

function showQuestion() {
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;

    questionElement.innerHTML = questionNo + ". " + currentQuestion.question;

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        answerButtons.appendChild(button);
        if (answer.correct) {
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click", selectAnswer);
    });
}

function resetState() {
    nextButton.style.display = "none";
    while (answerButtons.firstChild) {
        answerButtons.removeChild(answerButtons.firstChild);
    }
}

function selectAnswer(e) {
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";
    if (isCorrect) {
        selectedBtn.classList.add("correct");
        score++;
    } else {
        selectedBtn.classList.add("incorrect");
    }
    Array.from(answerButtons.children).forEach(button => {
        if (button.dataset.correct === "true") {
            button.classList.add("correct");
        }
        button.disabled = true;
    });
    nextButton.style.display = "block";
}

function showScore() {
    resetState();
    questionElement.innerHTML = `Você acertou ${score} de ${questions.length} perguntas!`;
    nextButton.innerHTML = "Jogue novamente";
    nextButton.style.display = "block";
}

function handleNextButton() {
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        showQuestion();
    } else {
        showScore();
    }
}

nextButton.addEventListener("click", () => {
    if (currentQuestionIndex < questions.length) {
        handleNextButton();
        showQuestion();
    } else {
        startQuiz();
    }
});

startQuiz();

