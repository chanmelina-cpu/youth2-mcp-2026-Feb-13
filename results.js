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