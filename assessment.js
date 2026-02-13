document.addEventListener('DOMContentLoaded', () => {
    const assessmentForm = document.getElementById('self-assessment-form');
    const resultsDisplay = document.getElementById('results-display');
    const progressBar = document.getElementById('progress-bar');

    const questions = [
        // DASS-21 questions
        { text: "I couldn't seem to experience any positive feeling at all.", scale: 'depression' },
        { text: "I felt that life was meaningless.", scale: 'depression' },
        { text: "I felt down-hearted and blue.", scale: 'depression' },
        { text: "I was unable to become enthusiastic about anything.", scale: 'depression' },
        { text: "I felt I wasn't worth much as a person.", scale: 'depression' },
        { text: "I felt that I had nothing to look forward to.", scale: 'depression' },
        { text: "I felt sad and depressed.", scale: 'depression' },
        { text: "I was aware of dryness of my mouth.", scale: 'anxiety' },
        { text: "I experienced breathing difficulty (e.g., excessively rapid breathing, breathlessness in the absence of physical exertion).", scale: 'anxiety' },
        { text: "I had a feeling of shakiness (e.g., legs going to give way).", scale: 'anxiety' },
        { text: "I found myself in situations that made me so anxious I was most relieved when they ended.", scale: 'anxiety' },
        { text: "I had a feeling of faintness.", scale: 'anxiety' },
        { text: "I perspired noticeably (e.g., hands sweaty) in the absence of high temperatures or physical exertion).", scale: 'anxiety' },
        { text: "I felt scared without any good reason.", scale: 'anxiety' },
        { text: "I found it hard to wind down.", scale: 'stress' },
        { text: "I tended to over-react to situations.", scale: 'stress' },
        { text: "I felt that I was using a lot of nervous energy.", scale: 'stress' },
        { text: "I found myself getting agitated.", scale: 'stress' },
        { text: "I found it difficult to relax.", scale: 'stress' },
        { text: "I was intolerant of anything that kept me from getting on with what I was doing.", scale: 'stress' },
        { text: "I felt that I was rather touchy.", scale: 'stress' }
    ];

    // Dynamically generate questions
    let questionsHtml = '';
    questions.forEach((question, index) => {
        questionsHtml += `
            <div class="question">
                <label for="answer-${index}">${question.text}</label>
                <input type="range" id="answer-${index}" name="answer-${index}" min="0" max="3" value="0">
                <div class="slider-labels">
                    <span>Did not apply to me at all</span>
                    <span>Applied to me to some degree, or some of the time</span>
                    <span>Applied to me to a considerable degree, or a good part of time</span>
                    <span>Applied to me very much, or most of the time</span>
                </div>
            </div>
        `;
    });
    assessmentForm.insertAdjacentHTML('afterbegin', questionsHtml);

    const sliders = assessmentForm.querySelectorAll('input[type="range"]');
    const totalQuestions = sliders.length;
    const answeredStatus = new Array(totalQuestions).fill(false);

    const updateProgressBar = () => {
        const answeredCount = answeredStatus.filter(Boolean).length;
        const progress = (answeredCount / totalQuestions) * 100;
        progressBar.style.width = `${progress}%`;
    };

    sliders.forEach((slider, index) => {
        slider.addEventListener('change', () => {
            if (!answeredStatus[index]) {
                answeredStatus[index] = true;
                updateProgressBar();
            }
        });
    });

    assessmentForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const scores = {
            depression: 0,
            anxiety: 0,
            stress: 0
        };

        questions.forEach((question, index) => {
            const answerInput = document.getElementById(`answer-${index}`);
            const answerValue = parseInt(answerInput.value, 10);
            scores[question.scale] += answerValue;
        });

        scores.depression *= 2;
        scores.anxiety *= 2;
        scores.stress *= 2;

        localStorage.setItem('dass21_scores', JSON.stringify(scores));

        assessmentForm.style.display = 'none';
        document.querySelector('.progress-container').style.display = 'none';
        document.querySelector('.assessment-description').style.display = 'none';
        document.querySelector('#assessment h2').textContent = 'Your Assessment Results';

        resultsDisplay.innerHTML = `
            <h2>Your Results</h2>
            <p>Thank you for completing the assessment. Here are your scores:</p>
            <ul>
                <li><strong>Depression Score:</strong> ${scores.depression}</li>
                <li><strong>Anxiety Score:</strong> ${scores.anxiety}</li>
                <li><strong>Stress Score:</strong> ${scores.stress}</li>
            </ul>
            <p>These scores are an indication of your wellbeing and not a diagnosis. For a detailed interpretation and to connect with one of our coaches, please see your detailed results.</p>
            <a href="results.html" class="button">View Detailed Results & Recommended Coach</a>
        `;
        resultsDisplay.style.display = 'block';
    });

    updateProgressBar();
});