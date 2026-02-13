<<<<<<< HEAD
import { auth, GoogleAuthProvider, signInWithPopup } from './firebase-config.js';

document.addEventListener('DOMContentLoaded', () => {
    const resultsContainer = document.getElementById('results-container');
    const scores = JSON.parse(localStorage.getItem('dass21-scores'));
    const signinButton = document.getElementById('signin-button');
    const calendarSlotsContainer = document.getElementById('calendar-slots-container');
    const timeSlotsContainer = document.getElementById('time-slots');

    if (scores) {
        const getCoach = (depression, anxiety, stress) => {
            if (depression >= 28 || anxiety >= 20 || stress >= 34) {
                return 'Jason Lim';
            } else if (depression >= 21 || anxiety >= 15 || stress >= 26) {
                return 'Priya Tan';
            } else if (depression >= 14 || anxiety >= 10 || stress >= 19) {
                return 'Daniel Wong';
            } else if (depression >= 10 || anxiety >= 8 || stress >= 15) {
                return 'Mei Chen';
            } else {
                return 'Daniel Wong';
            }
        };

        const assignedCoach = getCoach(scores.depression, scores.anxiety, scores.stress);

        resultsContainer.innerHTML = `
            <h2>Your Scores:</h2>
            <p><strong>Depression:</strong> ${scores.depression}</p>
            <p><strong>Anxiety:</strong> ${scores.anxiety}</p>
            <p><strong>Stress:</strong> ${scores.stress}</p>
            <hr>
            <h3>Assigned Coach:</h3>
            <p>${assignedCoach}</p>
        `;
    } else {
        resultsContainer.innerHTML = '<p>No assessment results found. Please take the self-assessment first.</p>';
    }

    signinButton.addEventListener('click', async () => {
        try {
            const provider = new GoogleAuthProvider();
            provider.addScope('https://www.googleapis.com/auth/calendar');
            const result = await signInWithPopup(auth, provider);
            const credential = GoogleAuthProvider.credentialFromResult(result);
            const token = credential.accessToken;
            const user = result.user;

            signinButton.style.display = 'none';
            calendarSlotsContainer.style.display = 'block';

            await loadGapi(token);
            await listUpcomingEvents(user.email);

        } catch (error) {
            console.error("Error during sign-in:", error);
        }
    });

    async function loadGapi(token) {
        return new Promise((resolve) => {
            gapi.load('client', async () => {
                gapi.client.init({
                    apiKey: 'AIzaSyC_u9mKhc_GcKUCmmNj49fPqc5KnIJKZYI',
                    clientId: 'YOUR_CLIENT_ID', // TODO: Replace with your actual client ID
                    discoveryDocs: ["https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest"],
                });
                gapi.client.setToken({ access_token: token });
                resolve();
            });
        });
    }

    async function listUpcomingEvents(userEmail) {
        const now = new Date();
        const nextWeek = new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000);

        const response = await gapi.client.calendar.freebusy.query({
            resource: {
                timeMin: now.toISOString(),
                timeMax: nextWeek.toISOString(),
                items: [{ id: 'primary' }],
            },
        });

        const busySlots = response.result.calendars.primary.busy;
        const availableSlots = getAvailableSlots(busySlots);
        renderAvailableSlots(availableSlots, userEmail);
    }

    function getAvailableSlots(busySlots) {
        const availableSlots = [];
        const now = new Date();

        for (let i = 0; i < 7; i++) {
            const day = new Date(now.getTime() + i * 24 * 60 * 60 * 1000);
            if (day.getDay() > 0 && day.getDay() < 6) { // Weekdays
                for (let hour = 9; hour < 17; hour++) { // 9am to 5pm
                    const slot = new Date(day.getFullYear(), day.getMonth(), day.getDate(), hour);
                    if (isSlotAvailable(slot, busySlots)) {
                        availableSlots.push(slot);
                    }
                }
            }
        }
        return availableSlots;
    }

    function isSlotAvailable(slot, busySlots) {
        for (const busy of busySlots) {
            const start = new Date(busy.start);
            const end = new Date(busy.end);
            if (slot >= start && slot < end) {
                return false;
            }
        }
        return true;
    }

    function renderAvailableSlots(availableSlots, userEmail) {
        timeSlotsContainer.innerHTML = '';
        availableSlots.forEach(slot => {
            const slotElement = document.createElement('div');
            slotElement.classList.add('time-slot');
            slotElement.textContent = slot.toLocaleString();
            slotElement.addEventListener('click', () => {
                createEvent(slot, userEmail);
            });
            timeSlotsContainer.appendChild(slotElement);
        });
    }

    async function createEvent(slot, userEmail) {
        const event = {
            'summary': 'YouthOK Coaching Session',
            'description': 'A coaching session with your assigned coach.',
            'start': {
                'dateTime': slot.toISOString(),
                'timeZone': Intl.DateTimeFormat().resolvedOptions().timeZone
            },
            'end': {
                'dateTime': new Date(slot.getTime() + 60 * 60 * 1000).toISOString(),
                'timeZone': Intl.DateTimeFormat().resolvedOptions().timeZone
            },
            'attendees': [
                { 'email': userEmail }
            ],
            'reminders': {
                'useDefault': false,
                'overrides': [
                    { 'method': 'email', 'minutes': 24 * 60 },
                    { 'method': 'popup', 'minutes': 10 }
                ]
            }
        };

        const request = gapi.client.calendar.events.insert({
            'calendarId': 'primary',
            'resource': event
        });

        request.execute(event => {
            alert('Event created: ' + event.htmlLink);
            calendarSlotsContainer.innerHTML = '<p>Appointment booked successfully!</p>';
        });
    }
});
=======
document.addEventListener('DOMContentLoaded', () => {
    const resultsContent = document.getElementById('results-content');
    const scores = JSON.parse(localStorage.getItem('dass21_scores'));
    const mood = localStorage.getItem('selected_mood');

    if (scores) {
        const { depression, anxiety, stress } = scores;

        let recommendationHTML = '';

        // Determine the highest score
        const maxScore = Math.max(depression, anxiety, stress);

        if (maxScore >= 21) { // Severe
            recommendationHTML = `
                <div class="recommendation">
                    <h3>Based on your results, we strongly recommend seeking professional help.</h3>
                    <p>Your scores indicate a severe level of distress. It is important to talk to a mental health professional who can provide you with the best support.</p>
                    <a href="#">Find a Counsellor</a>
                </div>
            `;
        } else if (maxScore >= 14) { // Moderate
            recommendationHTML = `
                <div class="recommendation">
                    <h3>We recommend connecting with a wellness coach.</h3>
                    <p>Your scores suggest a moderate level of distress. A wellness coach can help you develop coping strategies and improve your mental wellbeing.</p>
                    <p>To help us match you with the right coach, could you briefly tell us what's on your mind?</p>
                    <div id="coach-chat-container">
                        <div id="coach-chat-log"></div>
                        <div class="chat-input-container">
                            <textarea id="chat-input" placeholder="Type your message here..."></textarea>
                            <button id="send-chat-btn">&#10148;</button>
                        </div>
                    </div>
                    <div id="coach-recommendation" style="display:none;">
                         <a href="#">Find a Coach</a>
                    </div>
                </div>
            `;
        } else if (maxScore >= 8) { // Mild
             recommendationHTML = `
                <div class="recommendation">
                    <h3>Connecting with a buddy could be helpful.</h3>
                    <p>Your scores indicate a mild level of distress. Talking to a peer who understands what you're going through can make a big difference.</p>
                    <p>Are you a student at a polytechnic?</p>
                    <button id="poly-yes">Yes</button>
                    <button id="poly-no">No</button>
                </div>
            `;
        } else { // Normal
            recommendationHTML = `
                <div class="recommendation">
                    <h3>Your results are within the normal range.</h3>
                    <p>It's great that you're in tune with your feelings. Connecting with others in the community can help you maintain your wellbeing.</p>
                    <a href="index.html#community-features">Explore the Community</a>
                </div>
            `;
        }

        resultsContent.innerHTML = recommendationHTML;

        const sendChatBtn = document.getElementById('send-chat-btn');
        if (sendChatBtn) {
            sendChatBtn.addEventListener('click', () => {
                const chatInput = document.getElementById('chat-input');
                const chatLog = document.getElementById('coach-chat-log');
                const userMessage = chatInput.value.trim();

                if (userMessage) {
                    const userMessageDiv = document.createElement('div');
                    userMessageDiv.classList.add('user-message');
                    userMessageDiv.innerHTML = `<p>${userMessage}</p>`;
                    chatLog.appendChild(userMessageDiv);
                    chatInput.value = '';

                    const botMessageDiv = document.createElement('div');
                    botMessageDiv.classList.add('bot-message');
                    botMessageDiv.innerHTML = `<p>Thank you for sharing. We are finding a suitable coach for you now.</p>`;
                    chatLog.appendChild(botMessageDiv);

                    document.querySelector('.chat-input-container').style.display = 'none';
                    document.getElementById('coach-recommendation').style.display = 'block';
                }
            });
        }

        if (document.getElementById('poly-yes')) {
            document.getElementById('poly-yes').addEventListener('click', () => {
                resultsContent.innerHTML = `
                    <div class="recommendation">
                        <h3>Great! We can connect you with a buddy from your polytechnic.</h3>
                        <a href="#">Find a Buddy</a>
                    </div>
                `;
            });

            document.getElementById('poly-no').addEventListener('click', () => {
                resultsContent.innerHTML = `
                    <div class="recommendation">
                        <h3>No problem. We can still connect you with a buddy from our wider community.</h3>
                        <a href="#">Find a Buddy</a>
                    </div>
                `;
            });
        }

    } else {
        resultsContent.innerHTML = `<p>We couldn't retrieve your results. Please take the assessment again.</p>`;
    }
});
>>>>>>> 52b7f10f359935d0638fe44e71b582f832cd287b
