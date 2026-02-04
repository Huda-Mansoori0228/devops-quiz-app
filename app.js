let questions = [];
let filteredQuestions = [];
let currentIndex = 0;

const topicSelect = document.getElementById('topic');
const startBtn = document.getElementById('start-quiz');
const quizContainer = document.getElementById('quiz-container');
const questionText = document.getElementById('question-text');
const optionsContainer = document.getElementById('options-container');
const nextBtn = document.getElementById('next-question');
const feedback = document.getElementById('feedback');

async function loadQuestions() {
    const response = await fetch('data/questions.json');
    questions = await response.json();
    populateTopics();
}

function populateTopics() {
    const topics = [...new Set(questions.map(q => q.topic))];
    topics.forEach(topic => {
        const option = document.createElement('option');
        option.value = topic;
        option.textContent = topic;
        topicSelect.appendChild(option);
    });
}

function startQuiz() {
    const selectedTopic = topicSelect.value;
    filteredQuestions = selectedTopic
        ? questions.filter(q => q.topic === selectedTopic)
        : [...questions];
    currentIndex = 0;
    quizContainer.classList.remove('hidden');
    document.getElementById('topic-selection').classList.add('hidden');
    showQuestion();
}

function showQuestion() {
    const currentQ = filteredQuestions[currentIndex];
    questionText.textContent = `${currentIndex + 1}. ${currentQ.question}`;
    optionsContainer.innerHTML = '';

    currentQ.options.forEach((opt, index) => {
        const btn = document.createElement('button');
        btn.classList.add('option-button');
        btn.textContent = opt;
        btn.onclick = () => checkAnswer(index);
        optionsContainer.appendChild(btn);
    });

    feedback.textContent = '';
    nextBtn.style.display = 'none';
}

function checkAnswer(selectedIndex) {
    const currentQ = filteredQuestions[currentIndex];
    const optionButtons = document.querySelectorAll('.option-button');

    optionButtons.forEach((btn, i) => {
        if (i === currentQ.answerIndex) btn.classList.add('correct');
        if (i === selectedIndex && i !== currentQ.answerIndex) btn.classList.add('incorrect');
        btn.disabled = true;
    });

    feedback.textContent = currentQ.explanation;
    nextBtn.style.display = 'inline-block';
}

function nextQuestion() {
    currentIndex++;
    if (currentIndex >= filteredQuestions.length) {
        alert('Quiz completed!');
        location.reload();
    } else {
        showQuestion();
    }
}

startBtn.addEventListener('click', startQuiz);
nextBtn.addEventListener('click', nextQuestion);

window.onload = loadQuestions;
