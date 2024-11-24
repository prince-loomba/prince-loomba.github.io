import chapters from './sample.js';

const imageContainer = document.getElementById('image-container');
const chapterSelect = document.getElementById('chapter-select');
const backToTopButton = document.getElementById('back-to-top');
const prevChapterBtn = document.getElementById('prev-chapter');
const nextChapterBtn = document.getElementById('next-chapter');

let currentChapter = 1;

// Function to populate chapter dropdown
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

// Function to load all images for the current chapter
function loadImages() {
    const chapterImages = chapters[currentChapter];

    if (!chapterImages || chapterImages.length === 0) {
        return;
    }

    imageContainer.innerHTML = ''; // Clear any existing images

    // Loop through the chapter images and add them to the container
    chapterImages.forEach(imageSrc => {
        const img = document.createElement('img');
        img.src = imageSrc;
        imageContainer.appendChild(img);
    });
}

// Function to load chapters based on URL or chapter selection
function loadChapter(chapter) {
    if (!chapters[chapter]) {
        return;
    }

    currentChapter = chapter;
    chapterSelect.value = chapter;

    loadImages(); // Load all images for the current chapter
    localStorage.setItem('currentChapter', currentChapter);

    // Update URL with the current chapter
    updateURL(chapter);
}

// Function to update URL with the current chapter
function updateURL(chapter) {
    const url = new URL(window.location);
    url.searchParams.set('chapter', chapter); // Set or update 'chapter' parameter
    window.history.pushState({}, '', url); // Update the URL without reloading the page
}

// Handle dropdown change
chapterSelect.addEventListener('change', (event) => loadChapter(event.target.value));
chapterSelect.addEventListener('keydown', (event) => event.preventDefault());

// Show the button when the user scrolls down 300px from the top of the document
window.onscroll = function() {
    if (document.body.scrollTop > 300 || document.documentElement.scrollTop > 300) {
        backToTopButton.classList.add('show');
    } else {
        backToTopButton.classList.remove('show');
    }
};

// Scroll the page to the top when the button is clicked
backToTopButton.onclick = function() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
};

// Handle Previous Chapter Button Click
prevChapterBtn.addEventListener('click', () => {
    if (currentChapter > 1) {
        loadChapter(currentChapter - 1);
    }
});

// Handle Next Chapter Button Click
nextChapterBtn.addEventListener('click', () => {
    const totalChapters = Object.keys(chapters).length;
    if (currentChapter < totalChapters) {
        loadChapter(currentChapter + 1);
    }
});

// Handle Keydown Events for Left and Right Arrow Keys
document.addEventListener('keydown', (event) => {
    if (event.key === 'ArrowLeft') {
        // Left arrow key pressed: Previous chapter
        if (currentChapter > 1) {
            loadChapter(currentChapter - 1);
        }
    } else if (event.key === 'ArrowRight') {
        // Right arrow key pressed: Next chapter
        const totalChapters = Object.keys(chapters).length;
        if (currentChapter < totalChapters) {
            loadChapter(currentChapter + 1);
        }
    }
});

// Initialize
function initialize() {
    const urlParams = new URLSearchParams(window.location.search);
    const chapterFromURL = urlParams.get('chapter');

    // Load chapter from URL if available, otherwise default to chapter 1
    const savedChapter = chapterFromURL && chapters[chapterFromURL] ? chapterFromURL : localStorage.getItem('currentChapter') || 1;

    currentChapter = parseInt(savedChapter);

    populateChapterDropdown();
    loadChapter(currentChapter);
}

// Initialize on page load
initialize();
