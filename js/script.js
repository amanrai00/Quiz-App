// === Quiz Data ===
// Stores all quiz questions, answer options, and correct answer flags
const questions = [
  // Sports
  {
    question: "Which country won the FIFA World Cup in 2022?",
    answers: [
      { text: "France", correct: false },
      { text: "Argentina", correct: true },
      { text: "Brazil", correct: false },
      { text: "Germany", correct: false },
    ]
  },
  // Music
  {
    question: "Who is known as the 'King of Pop'?",
    answers: [
      { text: "Elvis Presley", correct: false },
      { text: "Michael Jackson", correct: true },
      { text: "Prince", correct: false },
      { text: "Freddie Mercury", correct: false },
    ]
  },
  // Movies
  {
    question: "Which movie won the Oscar for Best Picture in 2023?",
    answers: [
      { text: "Top Gun: Maverick", correct: false },
      { text: "Everything Everywhere All at Once", correct: true },
      { text: "Avatar: The Way of Water", correct: false },
      { text: "The Banshees of Inisherin", correct: false },
    ]
  },
  // General Knowledge
  {
    question: "What is the capital city of Japan?",
    answers: [
      { text: "Kyoto", correct: false },
      { text: "Tokyo", correct: true },
      { text: "Osaka", correct: false },
      { text: "Hiroshima", correct: false },
    ]
  },
  // Food
  {
    question: "Which country is famous for sushi?",
    answers: [
      { text: "China", correct: false },
      { text: "Japan", correct: true },
      { text: "Thailand", correct: false },
      { text: "Korea", correct: false },
    ]
  }
];

// === Element References ===
// Grabs HTML elements to update question text, answer buttons, and the next button
const questionElement = document.getElementById("question");
const answerButtons   = document.getElementById("answer-buttons");
const nextButton      = document.getElementById("nextBtn");

// === State Variables ===
// Tracks current question index and total score
let currentQuestionIndex = 0;
let score = 0;

// === Start the Quiz ===
// Initializes quiz state and loads the first question
function startQuiz() {
  currentQuestionIndex = 0;
  score = 0;
  nextButton.textContent = "Next";
  showQuestion();
}

// === Reset Question UI ===
// Hides next button and clears old answer buttons before showing a new question
function resetState() {
  nextButton.style.display = "none";
  while (answerButtons.firstChild) {
    answerButtons.removeChild(answerButtons.firstChild);
  }
}

// === Display a Question ===
// Loads current question and dynamically creates answer buttons
function showQuestion() {
  resetState();

  const currentQuestion = questions[currentQuestionIndex];
  const questionNo = currentQuestionIndex + 1;
  questionElement.textContent = `${questionNo}. ${currentQuestion.question}`;

  currentQuestion.answers.forEach(answer => {
    const button = document.createElement("button");
    button.classList.add("btn");
    button.innerHTML = answer.text;
    button.dataset.correct = String(answer.correct); // Store correct answer flag
    button.addEventListener("click", selectAnswer);
    answerButtons.appendChild(button);
  });
}

// === Handle Answer Selection ===
// Marks selected answer as correct/incorrect, shows correct answer, and enables "Next"
function selectAnswer(e) {
  const selectedBtn = e.target;
  const isCorrect = selectedBtn.dataset.correct === "true";

  selectedBtn.classList.add(isCorrect ? "correct" : "incorrect");
  if (isCorrect) score++;

  // Highlight all correct answers and disable all buttons
  Array.from(answerButtons.children).forEach(btn => {
    if (btn.dataset.correct === "true") btn.classList.add("correct");
    btn.disabled = true;
  });

  nextButton.style.display = "block";
}

// === Show Final Score ===
// Displays user's score and changes next button to restart quiz
function showScore() {
  resetState();
  questionElement.textContent = `You scored ${score} out of ${questions.length}!`;
  nextButton.textContent = "Play Again";
  nextButton.style.display = "block";
}

// === Handle Next Button Click ===
// Moves to the next question or shows final score if quiz is complete
function handleNext() {
  currentQuestionIndex++;
  if (currentQuestionIndex < questions.length) {
    showQuestion();
  } else {
    showScore();
  }
}

// === Event Listener for Next Button ===
nextButton.addEventListener("click", () => {
  if (nextButton.textContent === "Play Again") {
    startQuiz();
  } else {
    handleNext();
  }
});

// === Initialize Quiz ===
startQuiz();
