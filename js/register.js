const registrationForm = document.getElementById('registration-form');
const errorMessage = document.getElementById('error-message');

registrationForm.addEventListener('submit', async (event) => {
    event.preventDefault();

    const name = registrationForm.elements.name.value.trim();
    const email = registrationForm.elements.email.value.trim();
    const password = registrationForm.elements.password.value.trim();
    const confirmPassword = registrationForm.elements['confirm-password'].value.trim();

    if (!isValidEmail(email)) {
        showError("Email must end with '@stud.noroff.no'");
        return;
    }

    if (password.length < 8) {
        showError("Password must be at least 8 characters long");
        return;
    }

    if (password !== confirmPassword) {
        showError("Passwords do not match");
        return;
    }

    const userData = {
        name: name,
        email: email,
        password: password
    };

    try {
        const response = await fetch('https://v2.api.noroff.dev/auth/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(userData)
        });

        if (!response.ok) {
            throw new Error('Registration failed');
        }

        alert('Registration successful! You can now log in.');
        registrationForm.reset();
        errorMessage.textContent = '';
        window.location.href = 'login.html';
    } catch (error) {
        showError('Registration failed. Please try again later.');
    }
});

function isValidEmail(email) {
    return email.endsWith('@stud.noroff.no');
}

function showError(message) {
    errorMessage.textContent = message;
}
