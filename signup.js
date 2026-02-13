import { getAuth, createUserWithEmailAndPassword } from './firebase-config.js';

document.addEventListener('DOMContentLoaded', () => {
    const auth = getAuth();
    const signupForm = document.getElementById('signup-form');

    if (signupForm) {
        signupForm.addEventListener('submit', (e) => {
            e.preventDefault();

            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const phone = document.getElementById('phone').value;
            const dob = document.getElementById('dob').value;
            const gender = document.getElementById('gender').value;
            const signupButton = signupForm.querySelector('button[type="submit"]');
            const errorMessageContainer = document.getElementById('error-message');

            // --- Basic Validation --- //
            if (!name || !email || !phone || !dob || !gender) {
                errorMessageContainer.textContent = 'Please fill out all fields.';
                return;
            }
            errorMessageContainer.textContent = ''; // Clear previous errors

            signupButton.disabled = true;
            signupButton.textContent = 'Signing Up...';

            // In a real application, you would create a user with email and password,
            // then save the additional user data (name, phone, dob, gender) to a database
            // like Firestore, linked to the user's UID.

            // For this example, we'll just log the data and simulate a successful signup.
            console.log('Simulating user creation with the following data:');
            console.log({ name, email, phone, dob, gender });

            // Simulate async operation
            setTimeout(() => {
                // Let's assume signup is successful
                // In a real Firebase app, this would be inside the .then() of createUserWithEmailAndPassword

                /*
                createUserWithEmailAndPassword(auth, email, password) // Assuming you add a password field
                    .then((userCredential) => {
                        const user = userCredential.user;
                        // Now, save the extra data to Firestore
                        // db.collection('users').doc(user.uid).set({ ... });
                        window.location.href = 'index.html';
                    })
                    .catch((error) => {
                        errorMessageContainer.textContent = error.message;
                        signupButton.disabled = false;
                        signupButton.textContent = 'Sign Up';
                    });
                */

                alert('Signup successful! (Simulated)\nRedirecting to the home page.');
                window.location.href = 'index.html';

            }, 1500);
        });
    }
});
