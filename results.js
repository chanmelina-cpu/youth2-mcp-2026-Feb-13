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
