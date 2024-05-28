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
  

      const { name, email: userEmail, bio, avatar, banner, accessToken } = data.data;
  
      localStorage.setItem('user', JSON.stringify({
        name,
        email: userEmail,
        bio,
        avatarUrl: avatar.url,
        bannerUrl: banner.url,
        accessToken
      }));
  
      window.location.href = '../account/makepost.html';
    } catch (error) {
      console.error('Login failed:', error);
      errorMessage.textContent = 'Invalid email or password.';
      errorMessage.style.display = 'block';
    }
  });