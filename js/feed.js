const blogPage = "https://v2.api.noroff.dev/blog/posts/Marius_roenning";
const content = document.getElementById("container");
const slidesContainer = document.getElementById("slides-container");
const prevButton = document.getElementById("slide-arrow-prev");
const nextButton = document.getElementById("slide-arrow-next");

// this function fetches the last 3 post for the carousel
async function fetchAndCreateSlides() {
    try {
        const response = await fetch(blogPage);
        if (!response.ok) {
            throw new Error("Failed to fetch blog posts");
        }
        const data = await response.json();
        const posts = data.data.slice(0, 3); // Get the first 3 posts
        
        
        slidesContainer.innerHTML = "";

        
        posts.forEach(post => {
            const slide = document.createElement("li");
            slide.classList.add("slide");
            const maxLetters = 300;
            // Limiting the character count for the post body
            const bodyContent = post.body.length > maxLetters ? post.body.substring(0, maxLetters) + "..." : post.body;
            slide.innerHTML = `
                ${post.media ? `<img class="carousel-img" src="${post.media.url}" alt="${post.media.alt}">` : ''}
                <h2 class="header-c">${post.title}</h2>
                ${bodyContent ? `<p class="paragraph-c">${bodyContent}</p>` : ''}
                <a class="anchor-c" href="/blog-post.html?ID=${post.id}">Read more</a>
            `;
            slidesContainer.appendChild(slide);
        });
    } catch (error) {
        console.error("Error fetching blog posts:", error);
    }
}


window.addEventListener("load", fetchAndCreateSlides);

// Function: update the index and snap and looping. 
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

// Event listeners for previous and next buttons
nextButton.addEventListener("click", () => {
    updateIndex(currentIndex + 1);
});

prevButton.addEventListener("click", () => {
    updateIndex(currentIndex - 1);
});

// Function to append blog posts
function append(data) {
    const blogFeedOne = document.getElementById("blog-feed-one");
    const contentSplit = document.getElementById("content-split");
    const blogFeedTwo = document.getElementById("blog-feed-two");
    const contentSplitTwo = document.getElementById("content-spilt-two");
    const blogFeedThree = document.getElementById("blog-feed-three");
    const contentSplitThree = document.getElementById("content-split-three");

    data.data.forEach((post, index) => {
        const container = document.createElement("div");
        container.classList.add("blog-post");
        const maxChars = 100;
        const introduction = post.body.length > maxChars ? post.body.substring(0, maxChars) + "..." : post.body;
        container.innerHTML = `
            ${post.media ? `<img class="post-img" src="${post.media.url}" alt="${post.media.alt}">` : ''}
            ${introduction ? `<p class="paragraph">${introduction}</p>` : ''}
            ${post.tag ? `<p class="paragraph">Tag: ${post.tag}</p>` : ''}
            <p>Author: ${post.author.name}</p>
            <a class="article-link" href="/blog-post.html?ID=${post.id}">Read More</a>
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
                    <p class="author">Author: ${post.author.name}</p>
                    <a class="read-btn" href="/blog-post.html?ID=${post.id}">Read more</a>
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
                    <p class="author">Author: ${post.author.name}</p>
                    <a class="black-btn" href="/blog-post.html?ID=${post.id}">Read more</a>
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
                    <p class="author">Author: ${post.author.name}</p>
                    <a class="read-btn" href="/blog-post.html?ID=${post.id}">Read more</a>
                `;
                break;
        }
    });
}

// Fetch blog posts and append them to the page
fetch(blogPage)
    .then((response) => response.json())
    .then((data) => append(data))
    .catch((error) => {
        console.error('Error fetching data:', error);
        const div = document.createElement("div");
        div.textContent = "Error fetching data.";
        content.appendChild(div);
    });

