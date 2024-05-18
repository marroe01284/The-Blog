const blogEntry = document.getElementById("blog-content");
const loader = document.getElementById("loader");
const shareButton = document.getElementById("share-btn");
const backButton = document.getElementById("back-btn");

function getQueryParamValue(parameter) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(parameter);
}

const postId = getQueryParamValue('ID');
const blogPage = "https://v2.api.noroff.dev/blog/posts/Marius_roenning/";


loader.style.display = "block";

fetch(`${blogPage}${postId}`)
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(result => {
        const data = result.data;
        // Hide the loader
        loader.style.display = "none";
        // Show the blog content
        blogEntry.style.display = "block";
        blogEntry.innerHTML = `
        <div class="post-head">
        <h1 class="post-heading">${data.title}</h1>
        ${data.media ? `<img class="post-image" src="${data.media.url}" alt="${data.media.alt}">` : ''}
        <p class="post-content">${data.body}</p>
        </div>
        <div class="post-owner">
        <p class="post-author">By: ${data.author.name}</p>   
        <p class="post-publication">Published: ${data.created}</p>
        </div>
        `;
        shareButton.style.display = "block";
    })
    .catch(error => {
        console.error('There was a problem with the fetch operation:', error);
        loader.style.display = "none";
    });

shareButton.addEventListener('click', () => {
    const url = window.location.href;
    navigator.clipboard.writeText(url)
        .then(() => {
            alert('URL copied to clipboard!');
        })
        .catch(err => {
            console.error('Failed to copy URL: ', err);
            alert('Failed to copy URL. Please copy it manually.');
        });
});

backButton.addEventListener('click', () => {
    window.location.href = "index.html";
});