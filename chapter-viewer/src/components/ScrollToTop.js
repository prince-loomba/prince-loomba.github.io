import { useEffect } from 'react';

const ScrollToTop = () => {
    useEffect(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }, []); // Empty dependency array ensures it runs only once when the component is mounted

    return null;
};

export default ScrollToTop;
