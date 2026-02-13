const auth = firebase.auth();
const db = firebase.firestore();

const logoutNav = document.getElementById('logout-nav');
const messageInput = document.getElementById('message-input');
const sendButton = document.getElementById('send-button');
const chatMessagesContainer = document.querySelector('.chat-messages');
const conversationItems = document.querySelectorAll('.conversation-item');

let currentUserId;
let activeConversationId = 'coach_jane'; // Default conversation

auth.onAuthStateChanged(user => {
    if (user) {
        // User is signed in.
        currentUserId = user.uid;
        loadMessages(activeConversationId, currentUserId);
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

function sendMessage(userId, conversationId) {
    const text = messageInput.value.trim();
    if (text) {
        db.collection('conversations').doc(conversationId).collection('messages').add({
            senderId: userId,
            text: text,
            timestamp: firebase.firestore.FieldValue.serverTimestamp()
        })
        .then(() => {
            messageInput.value = '';
            console.log('Message sent!');
        })
        .catch(error => {
            console.error('Error sending message: ', error);
        });
    }
}

function loadMessages(conversationId, userId) {
    db.collection('conversations').doc(conversationId).collection('messages')
      .orderBy('timestamp', 'asc')
      .onSnapshot(querySnapshot => {
          chatMessagesContainer.innerHTML = ''; // Clear old messages
          querySnapshot.forEach(doc => {
              const message = doc.data();
              const messageEl = document.createElement('div');
              messageEl.classList.add('message');
              
              if (message.senderId === userId) {
                  messageEl.classList.add('sent');
              } else {
                  messageEl.classList.add('received');
              }

              const p = document.createElement('p');
              p.textContent = message.text;
              messageEl.appendChild(p);
              chatMessagesContainer.appendChild(messageEl);
          });
          // Scroll to the latest message
          chatMessagesContainer.scrollTop = chatMessagesContainer.scrollHeight;
      });
}

if(sendButton) {
    sendButton.addEventListener('click', () => {
        sendMessage(currentUserId, activeConversationId);
    });
}

if(messageInput) {
    messageInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            sendMessage(currentUserId, activeConversationId);
        }
    });
}

// Basic conversation switching logic
conversationItems.forEach(item => {
    item.addEventListener('click', () => {
        // In a real app, you'd get the conversation ID from a data attribute
        // For now, we'll just use a hardcoded switch for demonstration
        const coachName = item.querySelector('.coach-name').textContent;
        if (coachName.includes('Jane')) {
            activeConversationId = 'coach_jane';
        } else if (coachName.includes('Mike')) {
            activeConversationId = 'coach_mike';
        }

        // Update active class
        conversationItems.forEach(i => i.classList.remove('active'));
        item.classList.add('active');
        
        // Load messages for the new conversation
        loadMessages(activeConversationId, currentUserId);
    });
});
