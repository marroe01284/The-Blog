function getPostIdFromURL() {
    const params = new URLSearchParams(window.location.search);
    return params.get('postId');
}


document.getElementById('edit-form').addEventListener('submit', async (event) => {
    event.preventDefault();

    const title = document.getElementById('title').value;
    const imageUrl = document.getElementById('imageUrl').value;
    const content = document.getElementById('content').value;
    const tagsInput = document.getElementById('tags').value;

    if (content.length < 300 || content.length > 2000) {
        showError('Content must be between 300 and 2000 characters long.');
        return;
    }

    const tags = tagsInput.split(',').map(tag => tag.trim());
    if (tags.length > 2) {
        showError('You can only enter up to 2 tags.');
        return;
    }

    const postId = getPostIdFromURL();
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
        },
        tags: tags
    };

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

        showSuccess('Post updated successfully!');
    } catch (error) {
        showError('Failed to update post. Please try again later.');
    }
});

function discardChanges() {
    document.getElementById('title').value = '';
    document.getElementById('imageUrl').value = '';
    document.getElementById('content').value = '';
    document.getElementById('tags').value = '';
}

function showError(message) {
    alert(message);
}

function showSuccess(message) {
    alert(message);
}

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
        return data.data;
    } catch (error) {
        console.error("Error fetching blog post:", error);
        return null;
    }
}

async function populateFormFields(postId, accessToken) {
    const post = await fetchBlogPost(postId, accessToken);
    if (post) {
        document.getElementById('title').value = post.title;
        document.getElementById('imageUrl').value = post.media.url;
        document.getElementById('content').value = post.body;
        document.getElementById('tags').value = post.tags.join(', ');
    }
}

window.addEventListener('DOMContentLoaded', async () => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (!user || !user.accessToken) {
        showError('Access token not found. Please log in again.');
        return;
    }
    const accessToken = user.accessToken;
    const postId = getPostIdFromURL();
    await populateFormFields(postId, accessToken);
});
