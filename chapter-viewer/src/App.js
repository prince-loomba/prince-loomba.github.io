import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Chapter from './components/Chapter';
import ScrollToTop from './components/ScrollToTop';
import chapters from './sample'; // Import chapter data

let lastScrollTop = window.scrollY;
let scrollTimeout;

// Add scroll event listener
window.addEventListener('scroll', () => {
    const navBar = document.querySelector('.nav-buttons');

    const currentScroll = window.scrollY;

    if (currentScroll < lastScrollTop) {
        // Scrolling up
        navBar.classList.add('visible');
    } else if (currentScroll > lastScrollTop) {
        // Scrolling down
        navBar.classList.remove('visible');
    }

    // Keep the nav bar visible briefly after scrolling
    clearTimeout(scrollTimeout);
    scrollTimeout = setTimeout(() => {
        if (window.scrollY !== 0) {
            navBar.classList.remove('visible');
        }
    }, 2000); // Visible for 2 seconds after scroll

    lastScrollTop = currentScroll <= 0 ? 0 : currentScroll; // Prevent negative scroll
});

const App = () => {
    const [currentChapter, setCurrentChapter] = useState(1);
    const [chapterContent, setChapterContent] = useState([]);

    // Function to load images for the current chapter
    const loadImages = (chapter) => {
        const chapterImages = chapters[chapter];
        setChapterContent(chapterImages || []);
    };

    // Function to handle chapter change
    const loadChapter = (chapter) => {
        if (!chapters[chapter]) return; // Prevent invalid chapter access
        setCurrentChapter(chapter);
        loadImages(chapter);
        localStorage.setItem('currentChapter', chapter);
        updateURL(chapter);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    // Update URL with the current chapter
    const updateURL = (chapter) => {
        const url = new URL(window.location);
        url.searchParams.set('chapter', chapter);
        window.history.pushState({}, '', url);
    };

    // Handle chapter change from URL or localStorage
    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search);
        const chapterFromURL = urlParams.get('chapter');
        const savedChapter = chapterFromURL || localStorage.getItem('currentChapter') || 1;
        const chapter = parseInt(savedChapter);
        loadChapter(chapter);
    }, []);

    return (
        <div className="app-container">
            <Navbar
                chapters={chapters} // Pass the chapters to Navbar for generating dropdown
                currentChapter={currentChapter}
                onNext={() => loadChapter(currentChapter + 1)}
                onPrevious={() => loadChapter(currentChapter - 1)}
                onChapterChange={loadChapter} // Pass loadChapter to handle chapter change from dropdown
            />
            <Chapter content={chapterContent} />
            <ScrollToTop />
        </div>
    );
};

export default App;
