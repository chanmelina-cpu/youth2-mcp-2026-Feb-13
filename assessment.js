const questions = [
    { text: "I found it hard to wind down", scale: 'stress' },
    { text: "I was aware of dryness of my mouth", scale: 'anxiety' },
    { text: "I couldn’t seem to experience any positive feeling at all", scale: 'depression' },
    { text: "I experienced breathing difficulty (e.g., excessively rapid breathing, breathlessness in the absence of physical exertion)", scale: 'anxiety' },
    { text: "I found it difficult to work up the initiative to do things", scale: 'depression' },
    { text: "I tended to over-react to situations", scale: 'stress' },
    { text: "I experienced trembling (e.g., in the hands)", scale: 'anxiety' },
    { text: "I felt that I was using a lot of nervous energy", scale: 'stress' },
    { text: "I was worried about situations in which I might panic and make a fool of myself", scale: 'anxiety' },
    { text: "I felt that I had nothing to look forward to", scale: 'depression' },
    { text: "I found myself getting agitated", scale: 'stress' },
    { text: "I found it difficult to relax", scale: 'stress' },
    { text: "I felt down-hearted and blue", scale: 'depression' },
    { text: "I was intolerant of anything that kept me from getting on with what I was doing", scale: 'stress' },
    { text: "I felt I was close to panic", scale: 'anxiety' },
    { text: "I was unable to become enthusiastic about anything", scale: 'depression' },
    { text: "I felt I wasn’t worth much as a person", scale: 'depression' },
    { text: "I felt that I was rather touchy", scale: 'stress' },
    { text: "I was aware of the action of my heart in the absence of physical exertion (e.g., sense of heart rate increase, heart missing a beat)", scale: 'anxiety' },
    { text: "I felt scared without any good reason", scale: 'anxiety' },
    { text: "I felt that life was meaningless", scale: 'depression' },
];

const options = [
    { text: "Did not apply to me at all", value: 0 },
    { text: "Applied to me to some degree, or some of the time", value: 1 },
    { text: "Applied to me to a considerable degree, or a good part of time", value: 2 },
    { text: "Applied to me very much, or most of the time", value: 3 },
];

const chatLog = document.getElementById('chat-log');
const chatOptions = document.getElementById('chat-options');
const progressBar = document.querySelector('.progress-bar');

let currentQuestionIndex = 0;
let scores = { depression: 0, anxiety: 0, stress: 0 };

function updateProgressBar() {
    const progress = (currentQuestionIndex / questions.length) * 100;
    progressBar.style.width = `${progress}%`;
}

function displayQuestion() {
    if (currentQuestionIndex < questions.length) {
        const question = questions[currentQuestionIndex];
        
        updateProgressBar();

        // Display bot's question
        const botMessage = document.createElement('div');
        botMessage.classList.add('bot-message');
        botMessage.innerHTML = `<p>${question.text}</p>`;
        chatLog.appendChild(botMessage);
        chatLog.scrollTop = chatLog.scrollHeight;

        // Display user's options
        chatOptions.innerHTML = '';
        options.forEach(option => {
            const button = document.createElement('button');
            button.classList.add('chat-option');
            button.innerText = option.text;
            button.addEventListener('click', () => handleAnswer(option.value, option.text));
            chatOptions.appendChild(button);
        });

    } else {
        updateProgressBar(); 
        setTimeout(finishAssessment, 500);
    }
}

function handleAnswer(value, text) {
    // Display user's answer
    const userMessage = document.createElement('div');
    userMessage.classList.add('user-message');
    userMessage.innerHTML = `<p>${text}</p>`;
    chatLog.appendChild(userMessage);
    chatLog.scrollTop = chatLog.scrollHeight;

    // Disable option buttons after selection
    chatOptions.innerHTML = '';

    // Record score
    const scale = questions[currentQuestionIndex].scale;
    scores[scale] += value;

    // Move to next question
    currentQuestionIndex++;
    setTimeout(displayQuestion, 500); // Add a small delay for a more natural flow
}

function finishAssessment() {
    // DASS-21 scores are multiplied by 2
    scores.depression *= 2;
    scores.anxiety *= 2;
    scores.stress *= 2;

    localStorage.setItem('dass21_scores', JSON.stringify(scores));
    window.location.href = 'results.html';
}

displayQuestion();