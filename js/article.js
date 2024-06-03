const blogEntry = document.getElementById("blog-content");
const content = document.getElementById("post-container")
const shareButton = document.getElementById("share-btn");
const backButton = document.getElementById("back-btn");
const loaderContainer = document.getElementById("loader-container");
const loader = document.getElementById('loader');

loaderContainer.style.display = 'flex';

setTimeout(() => {
    loaderContainer.style.display = 'none';
    content.style.display = 'block';
}, 500);

function getQueryParamValue(parameter) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(parameter);
}

function formatAuthor(authorName) {
    const formattedName = authorName.replace(/[_\d]/g, '');
    return formattedName.replace(/_/g, ' ').replace(/\b\w/g, c => c.toUpperCase());
}

function formatDate(dateString) {
    const date = new Date(dateString);
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return date.toLocaleDateString(undefined, options);
}

const postId = getQueryParamValue('ID');
const blogPage = "https://v2.api.noroff.dev/blog/posts/Marius_roenning/";

fetch(`${blogPage}${postId}`)
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(result => {
        const data = result.data;
        const formattedAuthor = formatAuthor(data.author.name);
        const formattedCreatedDate = formatDate(data.created);

        blogEntry.style.display = "block";
        blogEntry.innerHTML = `
        <div class="post-head">
            <h1 class="post-heading">${data.title}</h1>
            ${data.media ? `<img class="post-image" src="${data.media.url}" alt="${data.media.alt}">` : ''}
            <p class="post-content">${data.body}</p>
        </div>
        <div class="post-owner">
            <p class="post-author">By: ${formattedAuthor}</p>
            <p class="post-publication">Published: ${formattedCreatedDate}</p>
        </div>
        `;
        shareButton.style.display = "block";
    })
    .catch(error => {
        console.error('There was a problem with the fetch operation:', error);
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
