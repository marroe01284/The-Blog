
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
        return data.data;
    } catch (error) {
        console.error("Error fetching blog posts:", error);
        return [];
    }
}

function displayBlogPosts(posts) {
    const blogPostsContainer = document.getElementById("blog-posts");
    const blogPostTemplate = document.getElementById("blog-post-template");

    blogPostsContainer.innerHTML = "";

    posts.forEach(post => {
        const blogPostElement = blogPostTemplate.content.cloneNode(true);
        const titleElement = blogPostElement.querySelector(".post-title");
        const bodyElement = blogPostElement.querySelector(".post-body");
        const imageContainer = blogPostElement.querySelector(".post-image");
        const editButton = blogPostElement.querySelector(".edit-button");
        const deleteButton = blogPostElement.querySelector(".delete-button");

        titleElement.textContent = post.title;
        bodyElement.textContent = post.body;
        if (post.media && post.media.url) {
            const imageElement = document.createElement("img");
            imageElement.src = post.media.url;
            imageElement.alt = post.media.alt || "";
            imageContainer.appendChild(imageElement);
        }
        editButton.addEventListener("click", () => handleEditPost(post.id));
        deleteButton.addEventListener("click", () => handleDeletePost(post.id));
        blogPostsContainer.appendChild(blogPostElement);
    });
}


function handleEditPost(postId) {
    window.location.href = `../account/edit.html?postId=${postId}`;
}

async function handleDeletePost(postId) {
    const confirmed = confirm("Are you sure you want to delete this post?");
    if (!confirmed) {
        return;
    }

    try {
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
                'Authorization': `Bearer ${accessToken}`
            }
        });
        if (!response.ok) {
            throw new Error("Failed to delete post");
        }
        location.reload();
    } catch (error) {
        console.error("Error deleting post:", error);
    }
}

async function init() {
    const user = JSON.parse(localStorage.getItem('user'));
    if (!user || !user.accessToken) {
        showError('Access token not found. Please log in again.');
        return;
    }

    const accessToken = user.accessToken;
    const posts = await fetchBlogPosts(accessToken);
    displayBlogPosts(posts);
}
window.addEventListener("load", init);