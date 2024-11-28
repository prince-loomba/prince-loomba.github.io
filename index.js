import chapters from './sample.js';

const imageContainer = document.getElementById('image-container');
const chapterSelect = document.getElementById('chapter-select');
const backToTopButton = document.getElementById('back-to-top');
const prevChapterBtn = document.getElementById('prev-chapter');
const nextChapterBtn = document.getElementById('next-chapter');

let currentChapter = 1;

// Populate the chapter dropdown
function populateChapterDropdown() {
    chapterSelect.innerHTML = ''; // Clear existing options
    Object.keys(chapters).forEach((chapter) => {
        const option = document.createElement('option');
        option.value = chapter;
        option.textContent = `Chapter ${chapter}`;
        chapterSelect.appendChild(option);
    });

    chapterSelect.value = currentChapter;
    chapterSelect.disabled = false; // Enable dropdown after population
}

// Load all images for the current chapter
function loadImages() {
    const chapterImages = chapters[currentChapter];

    if (!chapterImages || chapterImages.length === 0) {
        console.error(`No images found for Chapter ${currentChapter}`);
        imageContainer.innerHTML = '<p>No images available for this chapter.</p>';
        return;
    }

    imageContainer.innerHTML = ''; // Clear any existing images
    chapterImages.forEach(imageSrc => {
        const img = document.createElement('img');
        img.src = imageSrc;
        img.alt = `Chapter ${currentChapter} Image`;
        img.loading = 'lazy'; // Improve performance
        imageContainer.appendChild(img);
    });
}

// Load a chapter based on input
function loadChapter(chapter) {
    chapter = parseInt(chapter, 10); // Ensure chapter is a number
    if (!chapters[chapter]) {
        console.error(`Invalid Chapter: ${chapter}`);
        return;
    }

    currentChapter = chapter;
    chapterSelect.value = chapter;

    loadImages(); // Load images for the selected chapter
    localStorage.setItem('currentChapter', currentChapter); // Save progress
    updateURL(chapter);

    window.scrollTo({
        top: 0,
        behavior: "smooth", // Smooth scrolling for better UX
    });
}

// Update the URL to reflect the current chapter
function updateURL(chapter) {
    const url = new URL(window.location);
    url.searchParams.set('chapter', chapter);
    window.history.pushState({}, '', url);
}

// Event: Handle chapter dropdown change
chapterSelect.addEventListener('change', (event) => loadChapter(event.target.value));

// Event: Show or hide the back-to-top button
window.onscroll = function () {
    if (document.body.scrollTop > 300 || document.documentElement.scrollTop > 300) {
        backToTopButton.classList.add('show');
    } else {
        backToTopButton.classList.remove('show');
    }
};

// Event: Scroll to top on back-to-top button click
backToTopButton.onclick = function () {
    window.scrollTo({ top: 0, behavior: 'smooth' });
};

// Event: Handle previous chapter button click
prevChapterBtn.addEventListener('click', () => {
    if (currentChapter > 1) {
        loadChapter(currentChapter - 1);
    }
});

// Event: Handle next chapter button click
nextChapterBtn.addEventListener('click', () => {
    const totalChapters = Object.keys(chapters).length;
    if (currentChapter < totalChapters) {
        loadChapter(currentChapter + 1);
    }
});

// Debounce flag to prevent rapid chapter navigation
let isNavigating = false;

// Handle key navigation and scrolling
document.addEventListener('keydown', (event) => {
    const totalChapters = Object.keys(chapters).length;

    // Handle chapter navigation
    if ((event.key === 'ArrowLeft' || event.key === 'ArrowRight') && !isNavigating) {
        event.preventDefault(); // Prevent default scrolling behavior for left/right keys

        if (event.key === 'ArrowLeft' && currentChapter > 1) {
            isNavigating = true; // Activate debounce
            loadChapter(currentChapter - 1);
        } else if (event.key === 'ArrowRight' && currentChapter < totalChapters) {
            isNavigating = true; // Activate debounce
            loadChapter(currentChapter + 1);
        }

        // Clear debounce after 300ms
        setTimeout(() => (isNavigating = false), 300);
    }
});

let scrolling = false; // Flag to track whether scrolling is active
let scrollDirection = 0; // Direction: -1 for up, 1 for down
let scrollSpeed = 20; // Pixels to scroll per frame (adjust for speed)

// Function to handle continuous scrolling
function continuousScroll() {
    if (scrolling) {
        window.scrollBy({
            top: scrollDirection * scrollSpeed,
            behavior: 'auto', // Instant scrolling for continuous updates
        });
        requestAnimationFrame(continuousScroll); // Repeat the scrolling action
    }
}

// Event listener for keydown (start scrolling)
document.addEventListener('keydown', (event) => {
    if (event.key === 'ArrowUp' || event.key === 'ArrowDown') {
        event.preventDefault(); // Prevent default behavior
        if (!scrolling) {
            scrolling = true;
            scrollDirection = event.key === 'ArrowUp' ? -1 : 1;
            continuousScroll(); // Start scrolling
        }
    }
});

// Event listener for keyup (stop scrolling)
document.addEventListener('keyup', (event) => {
    if (event.key === 'ArrowUp' || event.key === 'ArrowDown') {
        scrolling = false; // Stop scrolling
    }
});

// Handle visibility of the navigation bar on scroll
let lastScrollTop = window.scrollY;
const navBar = document.querySelector('.nav-buttons');
let scrollTimeout;

// Ensure the nav bar is visible initially
navBar.classList.add('visible');

// Add scroll event listener for nav bar visibility
window.addEventListener('scroll', () => {
    const currentScroll = window.scrollY;

    if (currentScroll < lastScrollTop) {
        // Scrolling up
        navBar.classList.add('visible');
    } else if (currentScroll > lastScrollTop) {
        // Scrolling down
        navBar.classList.remove('visible');
    }

    // Keep the nav bar visible briefly after scrolling stops
    clearTimeout(scrollTimeout);
    scrollTimeout = setTimeout(() => {
        if (window.scrollY !== 0) {
            navBar.classList.remove('visible');
        }
    }, 2000); // Visible for 2 seconds after scroll

    lastScrollTop = Math.max(currentScroll, 0); // Prevent negative scroll
});

// Initialize the script
function initialize() {
    const urlParams = new URLSearchParams(window.location.search);
    const chapterFromURL = urlParams.get('chapter');

    // Load chapter from URL if valid, else fallback to saved or default chapter
    const savedChapter = chapterFromURL && chapters[chapterFromURL] ? chapterFromURL : localStorage.getItem('currentChapter') || 1;

    currentChapter = parseInt(savedChapter, 10);

    populateChapterDropdown();
    loadChapter(currentChapter);
}

// Initialize on page load
initialize();
