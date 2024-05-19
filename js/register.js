const registrationForm = document.getElementById('registration-form');
const errorMessage = document.getElementById('error-message');

registrationForm.addEventListener('submit', async (event) => {
    event.preventDefault();

    // Get input values
    const name = registrationForm.elements.name.value;
    const email = registrationForm.elements.email.value;
    const password = registrationForm.elements.password.value;
    const confirmPassword = registrationForm.elements['confirm-password'].value;

    // Client-side validation
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

    // Prepare data for POST request
    const userData = {
        name: name,
        email: email,
        password: password
    };

    // Send POST request to registration endpoint
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

        // Registration successful
        alert('Registration successful! You can now log in.');
        registrationForm.reset(); // Clear form fields
        errorMessage.textContent = ''; // Clear error message
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