import React, { useEffect, useState } from 'react';

const images = Array.from({ length: 300 }, (_, i) =>
    `/assets/images/male${(i + 1).toString().padStart(4, '0')}.png`
);

const ImageComponent = () => {
    const [imageArray, setImageArray] = useState([]);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    useEffect(() => {
        const loadImages = async () => {
            const imgs = await Promise.all(
                images.map(imgSrc =>
                    new Promise((resolve, reject) => {
                        const img = new Image();
                        img.src = imgSrc;
                        img.onload = () => resolve(img);
                        img.onerror = () => reject(new Error(`Failed to load image ${imgSrc}`));
                    })
                )
            );
            setImageArray(imgs);
        };

        loadImages();
    }, []);

    useEffect(() => {
        const handleScroll = () => {
            const scrollTop = window.scrollY;
            const maxIndex = imageArray.length - 1;
            const newIndex = Math.min(
                maxIndex,
                Math.floor(scrollTop / 10) // Increased sensitivity for gradual change
            );
            setCurrentImageIndex(newIndex);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [imageArray]);

    return (
        <div style={{ position: 'fixed', top: 0, width: '100%', height: '100vh', zIndex: 1 }}>
            {imageArray[currentImageIndex] && (
                <img
                    src={imageArray[currentImageIndex].src}
                    alt={`Image ${currentImageIndex + 1}`}
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
            )}
        </div>
    );
};

export default ImageComponent;