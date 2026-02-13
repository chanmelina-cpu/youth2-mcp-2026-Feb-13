const auth = firebase.auth();
const db = firebase.firestore();

const logoutNav = document.getElementById('logout-nav');
const moodSelectors = document.querySelectorAll('.mood-selector .mood');
const moodChartCanvas = document.getElementById('mood-chart');

let moodChart;

auth.onAuthStateChanged(user => {
    if (user) {
        // User is signed in.
        loadMoodData(user.uid);
    } else {
        // No user is signed in.
        window.location.href = 'login.html';
    }
});

if(logoutNav) {
    logoutNav.addEventListener('click', (e) => {
        e.preventDefault();
        auth.signOut().then(() => {
            window.location.href = 'index.html';
        });
    });
}

moodSelectors.forEach(moodEl => {
    moodEl.addEventListener('click', () => {
        window.location.href = 'self-assessment.html';
    });
});

function loadMoodData(uid) {
    db.collection('moods').where('uid', '==', uid).orderBy('timestamp', 'asc').get()
        .then(querySnapshot => {
            const moods = [];
            const labels = [];
            querySnapshot.forEach(doc => {
                const data = doc.data();
                if (data.timestamp) { // Ensure timestamp exists
                    moods.push(data.mood);
                    labels.push(new Date(data.timestamp.seconds * 1000).toLocaleDateString());
                }
            });
            renderMoodChart(labels, moods);
        });
}

function renderMoodChart(labels, data) {
    const moodMap = {
        'Happy': 5,
        'Excited': 4,
        'Calm': 3,
        'Anxious': 2,
        'Sad': 1,
        'Angry': 0
    };
    const numericData = data.map(mood => moodMap[mood]);

    if (moodChart) {
        moodChart.destroy();
    }

    const ctx = moodChartCanvas.getContext('2d');
    moodChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: labels,
            datasets: [{
                label: 'Your Mood Over Time',
                data: numericData,
                borderColor: '#4A90E2',
                backgroundColor: 'rgba(74, 144, 226, 0.2)',
                fill: true,
                tension: 0.4
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                y: {
                    beginAtZero: true,
                    ticks: {
                        callback: function(value, index, values) {
                            const mood = Object.keys(moodMap).find(key => moodMap[key] === value);
                            return mood;
                        }
                    },
                     grid: {
                        drawBorder: false,
                    }
                },
                x: {
                     grid: {
                        display: false,
                    }
                }
            },
            plugins: {
                legend: {
                    display: false
                }
            }
        }
    });
}
