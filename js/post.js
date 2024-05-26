document.addEventListener('DOMContentLoaded', () => {
    const postForm = document.getElementById('post-form');
    const errorMessage = document.getElementById('error-message');

    if (!postForm) {
        console.error('Form element not found');
        return;
    }

    postForm.addEventListener('submit', async (event) => {
        event.preventDefault();

        const title = postForm.elements.title.value;
        const imageUrl = postForm.elements.imageUrl.value;
        const content = postForm.elements.content.value;

        if (content.length < 300 || content.length > 2000) {
            showError('Content must be between 300 and 2000 characters long.');
            return;
        }

        const user = JSON.parse(localStorage.getItem('user'));

        if (!user || !user.accessToken) {
            showError('Access token not found. Please log in again.');
            return;
        }

        const accessToken = user.accessToken;

        const postData = {
            title: title,
            body: content,
            media: {
                url: imageUrl,
                alt: title
            }
        };



        try {
            const response = await fetch('https://v2.api.noroff.dev/blog/posts/Marius_roenning', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${accessToken}`
                },
                body: JSON.stringify(postData)
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error('Failed to create post');
            }

            showSuccess("Post created successfully!");
            postForm.reset(); 
            errorMessage.textContent = '';
        } catch (error) {
            showError('Failed to create post. Please try again later.');
        }
    });

    function showError(message) {
        errorMessage.textContent = message;
    }

    function showSuccess(message) {
        alert(message);
    }
});