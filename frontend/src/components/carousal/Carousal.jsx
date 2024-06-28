import React, { useState, useEffect } from 'react';
import './Carousal.css';
import { assets } from '../../assets/assets';

const Carousal = () => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const images = [
        assets.header_img,
        assets.banner1,
        assets.banner2,
        assets.banner3,
        assets.banner4,
        assets.banner5,
    ];

    const moveSlide = (direction) => {
        setCurrentIndex((prevIndex) =>
            (prevIndex + direction + images.length) % images.length
        );
    };

    useEffect(() => {
        const interval = setInterval(() => {
            moveSlide(1);
        }, 3000);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="carousel" id='carousel' >
            <div className="carousel-inner" style={{ transform: `translateX(-${currentIndex * 100}%)` }}>
                {images.map((image, index) => (
                    <div className={`carousel-item ${index === currentIndex ? 'active' : ''}`} key={index}>
                        <img src={image} alt={`Slide ${index + 1}`} />
                    </div>
                ))}
            </div>
            <button className="carousel-control prev" onClick={() => moveSlide(-1)}>❮</button>
            <button className="carousel-control next" onClick={() => moveSlide(1)}>❯</button>
        </div>
    );
};

export default Carousal;
