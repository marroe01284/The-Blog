
async function fetchBlogPosts(accessToken) {
    try {
        const response = await fetch("https://v2.api.noroff.dev/blog/posts/Marius_roenning", {
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        });
        if (!response.ok) {
            throw new Error("Failed to fetch blog posts");
        }
        const data = await response.json();
        return data.data; // Return array of blog posts
    } catch (error) {
        console.error("Error fetching blog posts:", error);
        return []; // Return empty array if error occurs
    }
}

function displayBlogPosts(posts) {
    const blogPostsContainer = document.getElementById("blog-posts");
    const blogPostTemplate = document.getElementById("blog-post-template");

    // Clear existing content
    blogPostsContainer.innerHTML = "";

    // Iterate through the posts and create HTML elements
    posts.forEach(post => {
        // Clone the template content
        const blogPostElement = blogPostTemplate.content.cloneNode(true);

        // Fill in the post details
        const titleElement = blogPostElement.querySelector(".post-title");
        const bodyElement = blogPostElement.querySelector(".post-body");
        const imageContainer = blogPostElement.querySelector(".post-image");
        const editButton = blogPostElement.querySelector(".edit-button");
        const deleteButton = blogPostElement.querySelector(".delete-button");

        titleElement.textContent = post.title;
        bodyElement.textContent = post.body;

        // Check if the post has an image URL
        if (post.media && post.media.url) {
            // Create an image element and set its source to the URL
            const imageElement = document.createElement("img");
            imageElement.src = post.media.url;
            imageElement.alt = post.media.alt || ""; // Set alt attribute if available
            // Append the image element to the image container
            imageContainer.appendChild(imageElement);
        }

        // Attach event listeners to the edit and delete buttons
        editButton.addEventListener("click", () => handleEditPost(post.id));
        deleteButton.addEventListener("click", () => handleDeletePost(post.id));

        // Append the blog post element to the container
        blogPostsContainer.appendChild(blogPostElement);
    });
}

// Function to handle editing a blog post
function handleEditPost(postId) {
    // Redirect to the edit page with the postId as a parameter
    window.location.href = `../account/edit.html?postId=${postId}`;
}

// Function to handle deleting a blog post
async function handleDeletePost(postId) {
    // Display a confirmation dialog
    const confirmed = confirm("Are you sure you want to delete this post?");
    if (!confirmed) {
        return; // Cancel deletion if not confirmed
    }

    try {
        // Retrieve access token from local storage
        const user = JSON.parse(localStorage.getItem('user'));
        if (!user || !user.accessToken) {
            showError('Access token not found. Please log in again.');
            return;
        }

        const accessToken = user.accessToken;

        const response = await fetch(`https://v2.api.noroff.dev/blog/posts/Marius_roenning/${postId}`, {
            method: "DELETE",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${accessToken}` // Include access token in headers
            }
        });
        if (!response.ok) {
            throw new Error("Failed to delete post");
        }
        // Reload the page to reflect the changes
        location.reload();
    } catch (error) {
        console.error("Error deleting post:", error);
    }
}

// Entry point: Fetch blog posts and display them on the page
async function init() {
    // Retrieve access token from local storage
    const user = JSON.parse(localStorage.getItem('user'));
    if (!user || !user.accessToken) {
        showError('Access token not found. Please log in again.');
        return;
    }

    const accessToken = user.accessToken;

    // Fetch blog posts using the access token
    const posts = await fetchBlogPosts(accessToken);
    displayBlogPosts(posts);
}

// Call the init function when the page loads
window.addEventListener("load", init);