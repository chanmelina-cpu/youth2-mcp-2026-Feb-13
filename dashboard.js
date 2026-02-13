import { getAuth, onAuthStateChanged, signOut } from './firebase-config.js';
import { getFirestore, collection, query, where, orderBy, getDocs } from './firebase-config.js';

document.addEventListener('DOMContentLoaded', () => {
    const auth = getAuth();
    const db = getFirestore();
    const logoutNav = document.getElementById('logout-nav');
    const moodSelectors = document.querySelectorAll('.mood-selector .mood');
    const moodChartCanvas = document.getElementById('mood-chart');
    let moodChart;

    onAuthStateChanged(auth, user => {
        if (user) {
            // User is signed in.
            loadMoodData(user.uid);
        } else {
            // No user is signed in.
            window.location.href = 'login.html';
        }
    });

    if (logoutNav) {
        logoutNav.addEventListener('click', (e) => {
            e.preventDefault();
            signOut(auth).then(() => {
                window.location.href = 'index.html';
            }).catch((error) => {
                console.error('Sign Out Error', error);
            });
        });
    }

    moodSelectors.forEach(moodEl => {
        moodEl.addEventListener('click', () => {
            const mood = moodEl.dataset.mood;
            // Redirect to the self-assessment page, passing the mood as a query parameter
            window.location.href = `self-assessment.html?mood=${mood}`;
        });
    });

    async function loadMoodData(uid) {
        try {
            const moodsRef = collection(db, 'moods');
            const q = query(moodsRef, where('uid', '==', uid), orderBy('timestamp', 'asc'));
            const querySnapshot = await getDocs(q);
            
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
        } catch (error) {
            console.error("Error loading mood data: ", error);
        }
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
        
        if (!moodChartCanvas) return;

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
                            callback: function(value) {
                                return Object.keys(moodMap).find(key => moodMap[key] === value) || '';
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
});
