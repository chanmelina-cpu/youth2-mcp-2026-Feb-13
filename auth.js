import { getAuth, signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from './firebase-config.js';

document.addEventListener('DOMContentLoaded', () => {
    const auth = getAuth();
    const loginForm = document.querySelector('.auth-form');
    const googleSignInButton = document.getElementById('google-signin-button');

    // --- Form submission --- //
    if (loginForm) {
        loginForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;
            const loginButton = document.getElementById('login-button');

            // Basic validation
            if (!email || !password) {
                alert('Please enter both email and password.');
                return;
            }

            loginButton.disabled = true;
            loginButton.textContent = 'Logging In...';

            signInWithEmailAndPassword(auth, email, password)
                .then((userCredential) => {
                    window.location.href = 'index.html';
                })
                .catch((error) => {
                    const errorMessage = document.createElement('p');
                    errorMessage.className = 'error-message';
                    errorMessage.textContent = error.message;
                    loginForm.prepend(errorMessage);

                    loginButton.disabled = false;
                    loginButton.textContent = 'Log In';
                });
        });
    }

    // --- Google Sign-In --- //
    if (googleSignInButton) {
        googleSignInButton.addEventListener('click', () => {
            const provider = new GoogleAuthProvider();
            signInWithPopup(auth, provider)
                .then((result) => {
                    window.location.href = 'index.html';
                })
                .catch((error) => {
                    console.error('Google Sign-In Error:', error);
                    alert(`Google Sign-In failed: ${error.message}`);
                });
        });
    }
});
