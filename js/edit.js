// Function to get the post ID from the URL query parameters
function getPostIdFromURL() {
    const params = new URLSearchParams(window.location.search);
    return params.get('postId');
}

// Function to handle form submission
document.getElementById('edit-form').addEventListener('submit', async (event) => {
    event.preventDefault();

    // Get input values
    const title = document.getElementById('title').value;
    const imageUrl = document.getElementById('imageUrl').value;
    const content = document.getElementById('content').value;

    // Retrieve post ID from query parameter
    const postId = getPostIdFromURL();

    // Retrieve access token from local storage
    const user = JSON.parse(localStorage.getItem('user'));
    if (!user || !user.accessToken) {
        showError('Access token not found. Please log in again.');
        return;
    }
    const accessToken = user.accessToken;

    // Prepare data for PUT request
    const postData = {
        title: title,
        body: content,
        media: {
            url: imageUrl,
            alt: title
        }
    };

    // Send PUT request to update the blog post
    try {
        const response = await fetch(`https://v2.api.noroff.dev/blog/posts/Marius_roenning/${postId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${accessToken}`
            },
            body: JSON.stringify(postData)
        });

        if (!response.ok) {
            throw new Error('Failed to update post');
        }

        // Post update successful
        showSuccess('Post updated successfully!');
    } catch (error) {
        showError('Failed to update post. Please try again later.');
    }
});

// Function to discard changes and clear form fields
function discardChanges() {
    document.getElementById('title').value = '';
    document.getElementById('imageUrl').value = '';
    document.getElementById('content').value = '';
}

// Function to display error message
function showError(message) {
    alert(message); // You can customize this to display the error message in the UI
}

// Function to display success message
function showSuccess(message) {
    alert(message); // You can customize this to display the success message in the UI
}

// Function to fetch the data of the specific blog post
async function fetchBlogPost(postId, accessToken) {
    try {
        const response = await fetch(`https://v2.api.noroff.dev/blog/posts/Marius_roenning/${postId}`, {
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        });
        if (!response.ok) {
            throw new Error("Failed to fetch blog post");
        }
        const data = await response.json();
        return data.data; // Return the blog post data
    } catch (error) {
        console.error("Error fetching blog post:", error);
        return null; // Return null if error occurs
    }
}

// Function to populate the form fields with the blog post data
async function populateFormFields(postId, accessToken) {
    const post = await fetchBlogPost(postId, accessToken);
    if (post) {
        document.getElementById('title').value = post.title;
        document.getElementById('imageUrl').value = post.media.url;
        document.getElementById('content').value = post.body;
    }
}

// Entry point: Populate form fields with the current content of the post
window.addEventListener('DOMContentLoaded', async () => {
    // Retrieve access token from local storage
    const user = JSON.parse(localStorage.getItem('user'));
    if (!user || !user.accessToken) {
        showError('Access token not found. Please log in again.');
        return;
    }
    const accessToken = user.accessToken;

    // Retrieve post ID from query parameter
    const postId = getPostIdFromURL();

    // Populate form fields with the current content of the post
    await populateFormFields(postId, accessToken);
});