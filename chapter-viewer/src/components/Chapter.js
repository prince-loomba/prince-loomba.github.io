import React from 'react';

const Chapter = ({ content }) => {
    return (
        <div id="image-container">
            {content.length === 0 ? (
                <p>No images available for this chapter.</p>
            ) : (
                content.map((imgSrc, index) => (
                    <img key={index} src={imgSrc} alt={`Chapter image ${index + 1}`} />
                ))
            )}
        </div>
    );
};

export default Chapter;
