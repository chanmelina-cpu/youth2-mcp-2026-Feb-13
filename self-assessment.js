document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('self-assessment-form');

    form.addEventListener('submit', (event) => {
        event.preventDefault();

        const answers = Array.from(form.querySelectorAll('select')).map(select => parseInt(select.value));

        const questionMapping = {
            depression: [3, 5, 10, 13, 16, 17, 21],
            anxiety: [2, 4, 7, 9, 15, 19, 20],
            stress: [1, 6, 8, 11, 12, 14, 18]
        };

        const scores = {
            depression: 0,
            anxiety: 0,
            stress: 0
        };

        for (const category in questionMapping) {
            questionMapping[category].forEach(questionIndex => {
                scores[category] += answers[questionIndex - 1];
            });
        }
        
        // DASS-21 scores are multiplied by 2
        scores.depression *= 2;
        scores.anxiety *= 2;
        scores.stress *= 2;

        localStorage.setItem('dass21-scores', JSON.stringify(scores));

        window.location.href = 'results.html';
    });
});
