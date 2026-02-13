document.addEventListener('DOMContentLoaded', () => {

    // --- NAVIGATION --- //
    const hamburgerMenu = document.querySelector('.hamburger-menu');
    const mobileNav = document.querySelector('.mobile-nav');

    function toggleNav() {
        const isExpanded = hamburgerMenu.getAttribute('aria-expanded') === 'true';
        hamburgerMenu.setAttribute('aria-expanded', !isExpanded);
        mobileNav.style.display = isExpanded ? 'none' : 'flex';
    }

    if (hamburgerMenu && mobileNav) {
        hamburgerMenu.addEventListener('click', toggleNav);

        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && hamburgerMenu.getAttribute('aria-expanded') === 'true') {
                toggleNav();
            }
        });
    }

    // --- MOOD TRACKER --- //
    const moodSelectors = document.querySelectorAll('.mood-selector .mood');
    moodSelectors.forEach(mood => {
        mood.addEventListener('click', () => {
            const moodValue = mood.dataset.mood;
            // In a real app, you would save this mood data or use it
            window.location.href = `self-assessment.html?mood=${moodValue}`;
        });

        // Keyboard accessibility
        mood.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                mood.click();
            }
        });
    });

    // --- SELF ASSESSMENT --- //
    const assessmentForm = document.getElementById('self-assessment-form');
    const progressBar = document.querySelector('.progress-bar');

    if (assessmentForm && progressBar) {
        const questions = assessmentForm.querySelectorAll('.question');
        const totalQuestions = questions.length;

        const updateProgress = () => {
            const answeredQuestions = assessmentForm.querySelectorAll('input[type="range"]:not([value="3"])').length;
            const progress = (answeredQuestions / totalQuestions) * 100;
            progressBar.style.width = `${progress}%`;
            progressBar.setAttribute('aria-valuenow', progress);
        };

        assessmentForm.addEventListener('input', updateProgress);
        updateProgress(); // Initial progress check
    }

    // --- CHATBOT --- //
    const chatLog = document.getElementById('chat-log');
    const chatOptions = document.getElementById('chat-options');

    const responses = {
        "feeling-down": "I'm sorry to hear that. Sometimes talking about it can help. Would you like to connect with a peer who has felt the same way?",
        "anxious": "Anxiety can be tough. Deep breathing exercises can sometimes help. There are also great resources available on the 'Resources' page.",
        "need-advice": "I can offer some general advice, but for personal situations, it's best to talk to a qualified coach. You can find our available coaches on the 'Coaches' page.",
        "default": "I'm here to listen. Tell me more about what's on your mind."
    };

    function addBotMessage(text) {
        if (!chatLog) return;
        const message = document.createElement('div');
        message.classList.add('chat-bubble', 'bot-message');
        message.textContent = text;
        chatLog.appendChild(message);
        chatLog.scrollTop = chatLog.scrollHeight;
    }

    if (chatOptions) {
        chatOptions.addEventListener('click', (e) => {
            if (e.target.tagName === 'BUTTON') {
                const choice = e.target.dataset.choice;
                const response = responses[choice] || responses.default;
                addBotMessage(response);
            }
        });
    }
});
