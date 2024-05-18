document.getElementById('login-form').addEventListener('submit', async (event) => {
    event.preventDefault();
    
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const errorMessage = document.getElementById('error-message');
  
    try {
      const response = await fetch('https://v2.api.noroff.dev/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password })
      });
  
      if (!response.ok) {
        throw new Error('Invalid credentials');
      }
  
      const data = await response.json();
  
      // Extract user data from response
      const { name, email: userEmail, bio, avatar, banner, accessToken } = data.data;
  
      // Save user data to local storage
      localStorage.setItem('user', JSON.stringify({
        name,
        email: userEmail,
        bio,
        avatarUrl: avatar.url,
        bannerUrl: banner.url,
        accessToken
      }));
  
      // Redirect to another page
      window.location.href = '../account/makepost.html'; // Replace '/dashboard' with the desired destination
    } catch (error) {
      console.error('Login failed:', error);
      // Display error message to user
      errorMessage.textContent = 'Invalid email or password.';
      errorMessage.style.display = 'block';
    }
  });