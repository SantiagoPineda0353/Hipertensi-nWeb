const questions = [
    {
        question: "¿Por qué se le conoce a la hipertensión como 'el asesino silencioso'?",
        answers: [
            "Porque causa dolores intensos",
            "Porque no presenta síntomas evidentes",
            "Porque es muy rara",
            "Porque solo afecta de noche"
        ],
        correct: 1
    },
    {
        question: "¿Qué valores de presión arterial se consideran normales en adultos?",
        answers: [
            "Menos de 120/80 mm Hg",
            "130/90 mm Hg",
            "140/100 mm Hg",
            "150/95 mm Hg"
        ],
        correct: 0
    },
    {
        question: "¿Cuál es el límite recomendado de consumo de sodio al día?",
        answers: [
            "5,000 mg",
            "3,500 mg",
            "1,500-2,300 mg",
            "500 mg"
        ],
        correct: 2
    },
    {
        question: "¿Cuántos minutos de ejercicio aeróbico se recomiendan la mayoría de los días?",
        answers: [
            "10 minutos",
            "20 minutos",
            "30 minutos",
            "60 minutos"
        ],
        correct: 2
    },
    {
        question: "¿Qué órganos pueden verse afectados por la hipertensión no controlada?",
        answers: [
            "Solo el corazón",
            "Solo los riñones",
            "Corazón, cerebro y riñones",
            "Solo los pulmones"
        ],
        correct: 2
    }
];

let currentQuestion = 0;
let score = 0;
let answered = false;

const questionText = document.getElementById('questionText');
const questionNumber = document.getElementById('questionNumber');
const answersGrid = document.getElementById('answersGrid');
const feedback = document.getElementById('feedback');
const nextBtn = document.getElementById('nextBtn');
const progressFill = document.getElementById('progressFill');
const scoreDisplay = document.getElementById('score');
const quizContent = document.getElementById('quizContent');
const resultsSection = document.getElementById('resultsSection');
const finalScore = document.getElementById('finalScore');
const resultsMessage = document.getElementById('resultsMessage');
const restartBtn = document.getElementById('restartBtn');

function loadQuestion() {
    answered = false;
    const question = questions[currentQuestion];
    
    questionText.textContent = question.question;
    questionNumber.textContent = currentQuestion + 1;
    
    answersGrid.innerHTML = '';
    feedback.classList.remove('show', 'correct', 'incorrect');
    nextBtn.classList.remove('show');
    
    question.answers.forEach((answer, index) => {
        const card = document.createElement('div');
        card.className = 'answer-card';
        card.textContent = answer;
        card.onclick = () => selectAnswer(index);
        answersGrid.appendChild(card);
    });
    
    updateProgress();
}

function selectAnswer(selected) {
    if (answered) return;
    
    answered = true;
    const question = questions[currentQuestion];
    const cards = document.querySelectorAll('.answer-card');
    
    cards.forEach((card, index) => {
        card.classList.add('disabled');
        if (index === question.correct) {
            card.classList.add('correct');
        }
        if (index === selected && selected !== question.correct) {
            card.classList.add('incorrect');
        }
    });
    
    if (selected === question.correct) {
        score++;
        scoreDisplay.textContent = score;
        feedback.textContent = '¡Correcto! 🎉';
        feedback.classList.add('show', 'correct');
    } else {
        feedback.textContent = `Incorrecto. La respuesta correcta es: ${question.answers[question.correct]}`;
        feedback.classList.add('show', 'incorrect');
    }
    
    nextBtn.classList.add('show');
}

function updateProgress() {
    const progress = ((currentQuestion + 1) / questions.length) * 100;
    progressFill.style.width = progress + '%';
}

function showResults() {
    quizContent.style.display = 'none';
    resultsSection.classList.add('show');
    
    finalScore.textContent = `${score} / ${questions.length}`;
    
    let message = '';
    const percentage = (score / questions.length) * 100;
    
    if (percentage === 100) {
        message = '¡Perfecto! Eres un experto en hipertensión 🏆';
    } else if (percentage >= 80) {
        message = '¡Excelente! Tienes un gran conocimiento 🌟';
    } else if (percentage >= 60) {
        message = '¡Bien hecho! Buen nivel de conocimiento 👍';
    } else {
        message = 'Sigue aprendiendo sobre la hipertensión 📚';
    }
    
    resultsMessage.textContent = message;
}

nextBtn.addEventListener('click', () => {
    currentQuestion++;
    if (currentQuestion < questions.length) {
        loadQuestion();
    } else {
        showResults();
    }
});

restartBtn.addEventListener('click', () => {
    currentQuestion = 0;
    score = 0;
    scoreDisplay.textContent = '0';
    quizContent.style.display = 'block';
    resultsSection.classList.remove('show');
    loadQuestion();
});

// Cargar primera pregunta
loadQuestion();