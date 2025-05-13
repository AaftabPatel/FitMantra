import React, { useState, useEffect } from 'react';
import bgVideo from './bgvideo.mp4'; 

const Slideshow = () => {
    const slides = [
        { text: "Professional Bodyguard Services" },
        { text: "24/7 Personal Protection" },
        { text: "Trustworthy and Reliable" }
    ];

    const [currentSlide, setCurrentSlide] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentSlide((prevSlide) =>
                prevSlide === slides.length - 1 ? 0 : prevSlide + 1
            );
        }, 5000);
        return () => clearInterval(interval);
    }, [slides.length]);

    return (
        <div className="slideshow" id="slides">
            
            <div className="video-container">
                <video
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="video-bg"
                >
                    <source src={bgVideo} type="video/mp4" />
                    Your browser does not support the video tag.
                </video>
                {/* Dark overlay on top of video */}
                <div className="video-overlay" />
            </div>

            <div className="text-container">
                {slides.map((slide, index) => (
                    <div
                        key={index}
                        className={`slide-text ${index === currentSlide ? 'active' : ''}`}
                    >
                        {slide.text}
                        <h1 className="onlyOn">Only on FitMantra</h1>
                        <br />
                        
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Slideshow;
