import { auth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from './firebase-config.js';

document.addEventListener('DOMContentLoaded', () => {
    const screens = document.querySelectorAll('.screen');
    const menuButton = document.getElementById('menu-button');
    const backButton = document.getElementById('back-button');
    const appTitle = document.getElementById('app-title');
    const navLinks = document.querySelectorAll('#menu-screen a');
    const loginLink = document.getElementById('login-link');
    const moodTrackers = document.querySelectorAll('.mood-tracker');
    const youthButton = document.getElementById('youth-button');
    const coachButton = document.getElementById('coach-button');
    const answersContainer = document.getElementById('answers-container');

    const registrationForm = document.getElementById('registration-form');
    const loginForm = document.getElementById('login-form');

    const questions = document.querySelectorAll('#questions-screen .question');
    const nextQuestionButtons = document.querySelectorAll('.next-question');
    const submitButton = document.querySelector('.submit-questions');
    let currentQuestion = 0;

    let historyStack = ['home-screen'];
    let answers = {};

    function showScreen(screenId) {
        screens.forEach(screen => {
            screen.classList.remove('active');
        });
        const newScreen = document.getElementById(screenId);
        if (newScreen) {
            newScreen.classList.add('active');

            if (screenId !== 'questions-screen') {
                const title = newScreen.querySelector('h1, h2')?.textContent || 'YouthOK';
                appTitle.textContent = title;
            }

            if (historyStack[historyStack.length - 1] !== screenId) {
                historyStack.push(screenId);
            }
        }
        backButton.style.display = historyStack.length > 1 ? 'block' : 'none';

        if (screenId === 'questions-screen') {
            currentQuestion = 0;
            showQuestion(currentQuestion);
        } else if (screenId === 'coach-view-screen') {
            displayAnswers();
        }
    }

    function showQuestion(index) {
        questions.forEach((question, i) => {
            question.classList.toggle('active', i === index);
        });

        let currentCategoryTitle = 'YouthOK';
        for (let i = index; i >= 0; i--) {
            const h3 = questions[i].querySelector('h3');
            if (h3) {
                currentCategoryTitle = h3.textContent;
                break;
            }
        }

        if (currentCategoryTitle === 'General & Presentation') {
            appTitle.textContent = 'YouthOK';
        } else {
            appTitle.textContent = currentCategoryTitle;
        }
    }

    function displayAnswers() {
        answersContainer.innerHTML = '';
        for (const question in answers) {
            const answerElement = document.createElement('div');
            answerElement.innerHTML = `<p><strong>${question}</strong></p><p>${answers[question]}</p>`;
            answersContainer.appendChild(answerElement);
        }
    }

    menuButton.addEventListener('click', () => {
        showScreen('menu-screen');
    });

    backButton.addEventListener('click', () => {
        if (historyStack.length > 1) {
            historyStack.pop();
            const previousScreenId = historyStack[historyStack.length - 1];
            showScreen(previousScreenId);
        }
    });

    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const screenId = e.target.getAttribute('href').substring(1) + '-screen';
            showScreen(screenId);
        });
    });

    loginLink.addEventListener('click', (e) => {
        e.preventDefault();
        showScreen('login-screen');
    });

    moodTrackers.forEach(tracker => {
        tracker.addEventListener('click', () => {
            showScreen('questions-screen');
        });
    });

    youthButton.addEventListener('click', () => {
        showScreen('questions-screen');
    });

    coachButton.addEventListener('click', () => {
        showScreen('coach-view-screen');
    });

    nextQuestionButtons.forEach((button, index) => {
        button.addEventListener('click', () => {
            const textarea = questions[index].querySelector('textarea');
            if (textarea.value.trim() !== '' || button.textContent.includes('If not applicable')) {
                if (index < questions.length - 1) {
                    currentQuestion = index + 1;
                    showQuestion(currentQuestion);
                }
            }
        });
    });

    submitButton.addEventListener('click', () => {
        questions.forEach((question, index) => {
            const questionText = question.querySelector('p').textContent;
            const answerText = question.querySelector('textarea').value;
            answers[questionText] = answerText;
        });
        showScreen('coach-view-screen');
    });

    registrationForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const email = document.getElementById('register-email').value;
        const password = document.getElementById('register-password').value;

        createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                var user = userCredential.user;
                console.log(user);
                showScreen('home-screen');
            })
            .catch((error) => {
                var errorCode = error.code;
                var errorMessage = error.message;
                console.error(errorCode, errorMessage);
            });
    });

    loginForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const email = document.getElementById('login-email').value;
        const password = document.getElementById('login-password').value;

        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                var user = userCredential.user;
                console.log(user);
                showScreen('home-screen');
            })
            .catch((error) => {
                var errorCode = error.code;
                var errorMessage = error.message;
                console.error(errorCode, errorMessage);
            });
    });

    showScreen('home-screen');
});