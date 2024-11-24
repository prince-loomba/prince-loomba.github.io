import chapters from './sample.js';
const imageContainer = document.getElementById('image-container');
const chapterSelect = document.getElementById('chapter-select');
const backToTopBtn = document.getElementById('back-to-top');
const prevImageBtn = document.getElementById('prev-image');
const nextImageBtn = document.getElementById('next-image');
const prevChapterBtn = document.getElementById('prev-chapter');
const nextChapterBtn = document.getElementById('next-chapter');

let currentChapter = 1;
let currentImageIndex = 0;

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

// Function to load a specific image for the current chapter
function loadImage() {
    const chapterImages = chapters[currentChapter];

    if (!chapterImages || chapterImages.length === 0) {
        return;
    }

    imageContainer.innerHTML = '';

    const img = document.createElement('img');
    img.src = chapterImages[currentImageIndex];
    imageContainer.appendChild(img);
}

// Function to load chapters based on URL or chapter selection
function loadChapter(chapter) {
    if (!chapters[chapter]) {
        return;
    }

    currentChapter = chapter;
    chapterSelect.value = chapter;

    // Retrieve the saved image index for this chapter
    const savedImageIndex = localStorage.getItem(`currentImageIndex_${chapter}`);
    currentImageIndex = savedImageIndex ? parseInt(savedImageIndex) : 0; // Default to 0 if no saved index

    loadImage();
    localStorage.setItem('currentChapter', currentChapter);

    // Update URL with the current chapter
    updateURL(chapter);
}

// Function to change the image
function changeImage(direction) {
    const chapterImages = chapters[currentChapter];

    // Update image index based on direction (1 for next, -1 for previous)
    currentImageIndex += direction;

    // Prevent going out of bounds for images
    if (currentImageIndex >= chapterImages.length) {
        currentImageIndex = 0; // Loop back to the first image
        if (chapters[currentChapter + 1]) {
            loadChapter(currentChapter + 1); // Move to the next chapter
        }
    }

    if (currentImageIndex < 0) {
        currentImageIndex = 0; // Prevent negative index
    }

    loadImage();
    localStorage.setItem(`currentImageIndex_${currentChapter}`, currentImageIndex);
}

// Function to update URL with the current chapter
function updateURL(chapter) {
    const url = new URL(window.location);
    url.searchParams.set('chapter', chapter); // Set or update 'chapter' parameter
    window.history.pushState({}, '', url); // Update the URL without reloading the page
}

// Handle key events for chapter and image navigation
document.addEventListener('keydown', (event) => {
    if (event.key === 'ArrowLeft') {
        if (currentChapter > 1) {
            loadChapter(currentChapter - 1); // Move to previous chapter
        }
    } else if (event.key === 'ArrowRight') {
        if (chapters[currentChapter + 1]) {
            loadChapter(currentChapter + 1); // Move to next chapter
        }
    } else if (event.key === 'ArrowUp') {
        changeImage(-1); // Move to previous image
    } else if (event.key === 'ArrowDown') {
        changeImage(1); // Move to next image or next chapter
    }
});

imageContainer.addEventListener('click', () => {
    changeImage(1); // Move to next image on click
});

// Handle dropdown change
chapterSelect.addEventListener('change', (event) => loadChapter(event.target.value));
chapterSelect.addEventListener('keydown', (event) => event.preventDefault());

// Handle Back to Top button click
backToTopBtn.addEventListener('click', () => {
    currentImageIndex = 0;
    loadImage();
    localStorage.setItem(`currentImageIndex_${currentChapter}`, currentImageIndex);
});

// Handle Previous Image button click
prevImageBtn.addEventListener('click', () => changeImage(-1));

// Handle Next Image button click
nextImageBtn.addEventListener('click', () => changeImage(1));

// Handle Previous Chapter button click
prevChapterBtn.addEventListener('click', () => {
    if (currentChapter > 1) {
        loadChapter(currentChapter - 1); // Move to previous chapter
    }
});

// Handle Next Chapter button click
nextChapterBtn.addEventListener('click', () => {
    if (chapters[currentChapter + 1]) {
        loadChapter(currentChapter + 1); // Move to next chapter
    }
});

// Initialize
function initialize() {
    const urlParams = new URLSearchParams(window.location.search);
    const chapterFromURL = urlParams.get('chapter');

    // Load chapter from URL if available, otherwise default to chapter 1
    const savedChapter = chapterFromURL && chapters[chapterFromURL] ? chapterFromURL : localStorage.getItem('currentChapter') || 1;
    const savedImageIndex = localStorage.getItem(`currentImageIndex_${savedChapter}`);

    currentChapter = parseInt(savedChapter);
    currentImageIndex = savedImageIndex ? parseInt(savedImageIndex) : 0;

    populateChapterDropdown();
    loadChapter(currentChapter);
}

// Initialize on page load
initialize();
