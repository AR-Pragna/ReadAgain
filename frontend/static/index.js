document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.querySelector('.Loginform');
    const registerForm = document.querySelector('.Registerform');
    const registerBtn = document.querySelector('.Registerbtn');
    const loginBtn = document.querySelector('.Loginbtn');
    const loginSubmit = document.getElementById('login-btn');
    const registerSubmit = document.getElementById('register-btn');

    registerBtn.addEventListener('click', () => {
        loginForm.classList.remove('active');
        registerForm.classList.add('active');
    });

    loginBtn.addEventListener('click', () => {
        registerForm.classList.remove('active');
        loginForm.classList.add('active');
    });

    loginSubmit.addEventListener('click', (e) => {
        e.preventDefault();
        const email = document.getElementById('login-email').value;
        const password = document.getElementById('login-password').value;
        const emailError = document.getElementById('login-email-error');
        const passwordError = document.getElementById('login-password-error');

        emailError.textContent = '';
        passwordError.textContent = '';

        if (!email.includes('@')) {
            emailError.textContent = 'Invalid email address.';
        } else if (password.length < 8) {
            passwordError.textContent = 'Incorrect password. Must be at least 8 characters.';
        } else {
            alert('Login successful!');
            window.location.href = 'home.html'; // Redirect to home page
        }
    });

    registerSubmit.addEventListener('click', (e) => {
        e.preventDefault();
        const email = document.getElementById('register-email').value;
        const password = document.getElementById('register-password').value;
        const confirmPassword = document.getElementById('register-confirm-password').value;
        const emailError = document.getElementById('register-email-error');
        const passwordError = document.getElementById('register-password-error');
        const confirmPasswordError = document.getElementById('register-confirm-password-error');

        emailError.textContent = '';
        passwordError.textContent = '';
        confirmPasswordError.textContent = '';

        if (!email.includes('@')) {
            emailError.textContent = 'Invalid email address.';
        } else if (password.length < 8) {
            passwordError.textContent = 'Password must be at least 8 characters.';
        } else if (password !== confirmPassword) {
            confirmPasswordError.textContent = 'Passwords do not match.';
        } else {
            alert('Registration successful!');
            
            loginForm.classList.add('active');
            registerForm.classList.remove('active');
        }
    });
});