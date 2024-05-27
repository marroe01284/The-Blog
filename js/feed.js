const blogPage = "https://v2.api.noroff.dev/blog/posts/Marius_roenning";
const content = document.getElementById("container");
const slidesContainer = document.getElementById("slides-container");
const prevButton = document.getElementById("slide-arrow-prev");
const nextButton = document.getElementById("slide-arrow-next");
const searchInput = document.getElementById("search-input");
const filterSelect = document.getElementById("filter-select");
const searchButton = document.getElementById("search-button");

function formatAuthor(authorName) {
    const formattedName = authorName.replace(/[_\d]/g, '').replace(/_/g, ' ');
    return formattedName.charAt(0).toUpperCase() + formattedName.slice(1).toLowerCase();
}

function formatDate(dateString) {
    const date = new Date(dateString);
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return date.toLocaleDateString(undefined, options);
}

async function fetchAndCreateSlides() {
    try {
        const response = await fetch(blogPage);
        if (!response.ok) {
            throw new Error("Failed to fetch blog posts");
        }
        const data = await response.json();
        const posts = data.data.slice(0, 3);
        
        slidesContainer.innerHTML = "";
        
        posts.forEach(post => {
            const slide = document.createElement("li");
            slide.classList.add("slide");
            const maxLetters = 300;
            const bodyContent = post.body.length > maxLetters ? post.body.substring(0, maxLetters) + "..." : post.body;
            slide.innerHTML = `
                ${post.media ? `<img class="carousel-img" src="${post.media.url}" alt="${post.media.alt}">` : ''}
                <h2 class="header-c">${post.title}</h2>
                ${bodyContent ? `<p class="paragraph-c">${bodyContent}</p>` : ''}
                <a class="anchor-c" href="/article.html?ID=${post.id}">Read more</a>
            `;
            slidesContainer.appendChild(slide);
        });
    } catch (error) {
        console.error("Error fetching blog posts:", error);
    }
}
let currentIndex = 0;

const updateIndex = (newIndex) => {
    const slides = document.querySelectorAll('.slide');
    if (newIndex >= slides.length) {
        currentIndex = 0;
    } else if (newIndex < 0) {
        currentIndex = slides.length - 1;
    } else {
        currentIndex = newIndex;
    }
    slides[currentIndex].scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'start' });
};

nextButton.addEventListener("click", () => {
    updateIndex(currentIndex + 1);
});

prevButton.addEventListener("click", () => {
    updateIndex(currentIndex - 1);
});

function createBlogPosts(data) {
    const blogFeedOne = document.getElementById("blog-feed-one");
    const contentSplit = document.getElementById("content-split");
    const blogFeedTwo = document.getElementById("blog-feed-two");
    const contentSplitTwo = document.getElementById("content-spilt-two");
    const blogFeedThree = document.getElementById("blog-feed-three");
    const contentSplitThree = document.getElementById("content-split-three");

    blogFeedOne.innerHTML = '';
    contentSplit.innerHTML = '';
    blogFeedTwo.innerHTML = '';
    contentSplitTwo.innerHTML = '';
    blogFeedThree.innerHTML = '';
    contentSplitThree.innerHTML = '';

    data.forEach((post, index) => {
        const container = document.createElement("div");
        container.classList.add("blog-post");
        container.addEventListener("click", () => {
            window.location.href = `/article.html?ID=${post.id}`;
        });
        const maxChars = 100;
        const introduction = post.body.length > maxChars ? post.body.substring(0, maxChars) + "..." : post.body;
        container.innerHTML = `
            ${post.media ? `<img class="post-img" src="${post.media.url}" alt="${post.media.alt}">` : ''}
            ${introduction ? `<p class="paragraph">${introduction}</p>` : ''}
            ${post.tags ? `<p class="paragraph">Tag: ${post.tags.join(', ')}</p>` : ''}
            <p>Updated: ${formatDate(post.updated)}</p>
            <a class="article-link" href="/article.html?ID=${post.id}">Read More</a>
        `;
        const maxCharsBody = 500;
        switch (index) {
            case 0:
            case 1:
            case 2:
            case 3:
                blogFeedOne.appendChild(container);
                break;
            case 4:
                const bodyChars = post.body.length > maxCharsBody ? post.body.substring(0, maxCharsBody) + "..." : post.body;
                contentSplit.innerHTML = `
                    ${post.media ? `<img class="image-post" src="${post.media.url}" alt="${post.media.alt}">` : ''}
                    <h2 class="header-yellow">${post.title}</h2>
                    ${bodyChars ? `<p class="article-post">${bodyChars}</p>` : ''}
                    <p class="author">Updated: ${formatDate(post.updated)}</p>
                    <a class="read-btn" href="/article.html?ID=${post.id}">Read more</a>
                `;
                break;
            case 5:
            case 6:
            case 7:
            case 8:
                blogFeedTwo.appendChild(container);
                break;
            case 9:
                const bodyCharsTwo = post.body.length > maxCharsBody ? post.body.substring(0, maxCharsBody) + "..." : post.body;
                contentSplitTwo.innerHTML = `
                    ${post.media ? `<img class="image-post" src="${post.media.url}" alt="${post.media.alt}">` : ''}
                    <h2 class="header-black">${post.title}</h2>
                    ${bodyCharsTwo ? `<p class="article-post">${bodyCharsTwo}</p>` : ''}
                    <p class="author">Updated: ${formatDate(post.updated)}</p>
                    <a class="black-btn" href="/article.html?ID=${post.id}">Read more</a>
                `;
                break;
            case 10:
            case 11:
            case 12:
            case 13:
                blogFeedThree.appendChild(container);
                break;
            case 14:
                const bodyCharsThree = post.body.length > maxCharsBody ? post.body.substring(0, maxCharsBody) + "..." : post.body;
                contentSplitThree.innerHTML = `
                    ${post.media ? `<img class="image-post" src="${post.media.url}" alt="${post.media.alt}">` : ''}
                    <h2 class="header-black">${post.title}</h2>
                    ${bodyCharsThree ? `<p class="article-post">${bodyCharsThree}</p>` : ''}
                    <p class="author">Updated: ${formatDate(post.updated)}</p>
                    <a class="read-btn" href="/article.html?ID=${post.id}">Read more</a>
                `;
                break;
            default:
                break;
        }
    });
}

async function fetchBlogPosts() {
    try {
        const response = await fetch(blogPage);
        if (!response.ok) {
            throw new Error("Failed to fetch blog posts");
        }
        const data = await response.json();
        const posts = data.data;
        createBlogPosts(posts);
        populateTags(posts);
    } catch (error) {
        console.error("Error fetching blog posts:", error);
    }
}

function populateTags(posts) {
    const allTags = new Set();
    posts.forEach(post => {
        if (post.tags) {
            post.tags.forEach(tag => allTags.add(tag));
        }
    });
    filterSelect.innerHTML = `<option value="all">All Tags</option>`;
    allTags.forEach(tag => {
        const option = document.createElement("option");
        option.value = tag;
        option.textContent = tag;
        filterSelect.appendChild(option);
    });
}

function filterAndSearch() {
    const searchQuery = searchInput.value.toLowerCase();
    const selectedTag = filterSelect.value;
    fetch(blogPage)
        .then(response => response.json())
        .then(data => {
            const filteredPosts = data.data.filter(post => {
                const matchesSearch = post.title.toLowerCase().includes(searchQuery);
                const matchesTag = selectedTag === 'all' || (post.tags && post.tags.includes(selectedTag));
                return matchesSearch && matchesTag;
            });
            createBlogPosts(filteredPosts);
        })
        .catch(error => console.error('Error fetching filtered posts:', error));
}

searchButton.addEventListener('click', filterAndSearch);
searchInput.addEventListener('input', filterAndSearch);
filterSelect.addEventListener('change', filterAndSearch);

fetchAndCreateSlides();
fetchBlogPosts();
