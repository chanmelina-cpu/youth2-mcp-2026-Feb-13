import { auth, db, addDoc, collection, serverTimestamp, onAuthStateChanged } from './firebase-config.js';

document.addEventListener('DOMContentLoaded', () => {
    const assessmentForm = document.getElementById('self-assessment-form');
    const progressBar = document.getElementById('progress-bar');
    const resultContainer = document.getElementById('assessment-result');
    const resultText = document.getElementById('result-text');
    const logoutLink = document.getElementById('logout-link');
    let currentUser = null;

    onAuthStateChanged(auth, (user) => {
        if (user) {
            currentUser = user;
        } else {
            window.location.href = 'login.html';
        }
    });

    if (logoutLink) {
        logoutLink.addEventListener('click', (e) => {
            e.preventDefault();
            auth.signOut().then(() => {
                window.location.href = 'index.html';
            });
        });
    }

    if (assessmentForm && progressBar) {
        const questions = assessmentForm.querySelectorAll('.question input[type="range"]');
        const totalQuestions = questions.length;

        const updateProgress = () => {
            const answeredQuestions = Array.from(questions).filter(q => q.value !== '0').length;
            const progress = (answeredQuestions / totalQuestions) * 100;
            progressBar.style.width = `${progress}%`;
            progressBar.setAttribute('aria-valuenow', progress);
        };

        assessmentForm.addEventListener('input', updateProgress);
        updateProgress();

        assessmentForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            if (!currentUser) {
                console.error("User not logged in!");
                return;
            }

            const answers = Array.from(questions).map(q => parseInt(q.value));
            const scores = calculateScores(answers);

            try {
                await addDoc(collection(db, 'assessments'), {
                    uid: currentUser.uid,
                    scores: scores,
                    timestamp: serverTimestamp()
                });
                displayResults(scores);
            } catch (error) {
                console.error("Error saving assessment: ", error);
                alert("There was an error saving your results. Please try again.");
            }
        });
    }

    function calculateScores(answers) {
        // Based on DASS-21 scoring
        const questionMapping = {
            depression: [2, 4, 9, 12, 15, 16, 20],
            anxiety: [1, 3, 6, 8, 14, 18, 19],
            stress: [0, 5, 7, 10, 11, 13, 17]
        };

        const scores = { depression: 0, anxiety: 0, stress: 0 };

        for (const category in questionMapping) {
            questionMapping[category].forEach(questionIndex => {
                scores[category] += answers[questionIndex];
            });
            scores[category] *= 2; // DASS-21 scores are doubled
        }
        return scores;
    }

    function displayResults(scores) {
        assessmentForm.style.display = 'none';
        resultContainer.style.display = 'block';

        let resultHTML = '<h3>Your DASS-21 Score:</h3>';
        resultHTML += `<ul>`;
        resultHTML += `<li><strong>Depression:</strong> ${getSeverity(scores.depression, 'depression')} (${scores.depression})</li>`;
        resultHTML += `<li><strong>Anxiety:</strong> ${getSeverity(scores.anxiety, 'anxiety')} (${scores.anxiety})</li>`;
        resultHTML += `<li><strong>Stress:</strong> ${getSeverity(scores.stress, 'stress')} (${scores.stress})</li>`;
        resultHTML += `</ul>`;
        resultHTML += '<p>These results are not a diagnosis. They are a tool to help you understand your emotional state. We recommend discussing these results with one of our coaches.</p>';
        
        resultText.innerHTML = resultHTML;
    }

    function getSeverity(score, type) {
        const thresholds = {
            depression: { normal: 9, mild: 13, moderate: 20, severe: 27, extremely_severe: Infinity },
            anxiety: { normal: 7, mild: 9, moderate: 14, severe: 19, extremely_severe: Infinity },
            stress: { normal: 14, mild: 18, moderate: 25, severe: 33, extremely_severe: Infinity }
        };

        if (score <= thresholds[type].normal) return 'Normal';
        if (score <= thresholds[type].mild) return 'Mild';
        if (score <= thresholds[type].moderate) return 'Moderate';
        if (score <= thresholds[type].severe) return 'Severe';
        return 'Extremely Severe';
    }
});
