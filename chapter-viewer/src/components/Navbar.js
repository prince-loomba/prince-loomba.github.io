import React, { useState, useEffect } from 'react';
import '../index.css';

const Navbar = ({ chapters, currentChapter, onNext, onPrevious, onChapterChange }) => {
    const [visible, setVisible] = useState(true);
    const [lastScrollTop, setLastScrollTop] = useState(0);

    // Handle scroll events to show/hide the navbar
    useEffect(() => {
        const handleScroll = () => {
            const currentScroll = window.scrollY;

            if (currentScroll < lastScrollTop) {
                // Scrolling up
                setVisible(true);
            } else if (currentScroll > lastScrollTop) {
                // Scrolling down
                setVisible(false);
            }

            setLastScrollTop(currentScroll <= 0 ? 0 : currentScroll);
        };

        window.addEventListener('scroll', handleScroll);

        // Cleanup event listener
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, [lastScrollTop]);

    return (
        <div className={`nav-buttons ${visible ? 'visible' : 'hidden'}`}>
            <button
                id="prev-chapter"
                className="nav-btn"
                onClick={onPrevious}
                disabled={currentChapter <= 1}
            >
                <i className="fa-solid fa-arrow-left"></i>
            </button>

            {/* Chapter Dropdown */}
            <select
                id="chapter-select"
                className="nav-btn"
                value={currentChapter}
                onChange={(e) => onChapterChange(parseInt(e.target.value))}
            >
                {Object.keys(chapters).map((chapter) => (
                    <option key={chapter} value={chapter}>
                        Chapter {chapter}
                    </option>
                ))}
            </select>

            <button
                id="next-chapter"
                className="nav-btn"
                onClick={onNext}
                disabled={currentChapter >= Object.keys(chapters).length}
            >
                <i className="fa-solid fa-arrow-right"></i>
            </button>
        </div>
    );
};

export default Navbar;
