const postForm = document.getElementById('post-form');
const errorMessage = document.getElementById('error-message');

postForm.addEventListener('submit', async (event) => {
    event.preventDefault();

    // Get input values
    const title = postForm.elements.title.value;
    const imageUrl = postForm.elements.imageUrl.value;
    const content = postForm.elements.content.value;

    // Check if content length is within the allowed range
    if (content.length < 300 || content.length > 2000) {
        showError('Content must be between 300 and 2000 characters long.');
        return;
    }
    // Retrieve access token from local storage
    const user = JSON.parse(localStorage.getItem('user'));

if (!user || !user.accessToken) {
    showError('Access token not found. Please log in again.');
    return;
}

// Retrieve access token from user object
const accessToken = user.accessToken;

// Prepare data for POST request
const postData = {
    title: title,
    body: content,
    media: {
        url: imageUrl,
        alt: title // You can adjust this as needed
    }
};

    // Send POST request to create a new blog post
    try {
        const response = await fetch('https://v2.api.noroff.dev/blog/posts/Marius_roenning', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${accessToken}` // Include access token in headers
            },
            body: JSON.stringify(postData)
        });

        if (!response.ok) {
            throw new Error('Failed to create post');
        }

        // Post creation successful
        showSuccess("Post created successfully!");
        postForm.reset(); // Clear form fields
        errorMessage.textContent = ''; // Clear error message
    } catch (error) {
        showError('Failed to create post. Please try again later.');
    }
});

function showError(message) {
    errorMessage.textContent = message;
}

function showSuccess(message) {
    alert(message); // You can also display success message in the UI if needed
}