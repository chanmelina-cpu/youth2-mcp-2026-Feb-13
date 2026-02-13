// schedule.js

document.addEventListener('DOMContentLoaded', () => {
    const inviteForm = document.getElementById('invite-scheduling-form');

    if (inviteForm) {
        inviteForm.addEventListener('submit', async (event) => {
            event.preventDefault();

            const recipientEmail = document.getElementById('recipient-email').value;
            const inviteDate = document.getElementById('invite-date').value;
            const inviteTime = document.getElementById('invite-time').value;
            const inviteTopic = document.getElementById('invite-topic').value;

            const inviteDetails = {
                recipientEmail,
                inviteDate,
                inviteTime,
                inviteTopic
            };

            console.log('Invite Details:', inviteDetails);
            alert(`Invite details collected: \n${JSON.stringify(inviteDetails, null, 2)}\n\n(Firebase integration to follow)`);

            // Placeholder for Firebase or API integration
            // Example: await sendInviteToFirebase(inviteDetails);
        });
    }
});