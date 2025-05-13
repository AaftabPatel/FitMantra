/*import React, { useState, useEffect, useRef } from 'react';

import { getDocs, collection } from 'firebase/firestore';
import { db } from './firebase';
import bg from './yoga.jpg';

// Helper function to extract YouTube video ID
const getYouTubeId = (url) => {
  try {
    const regExp = /^.*(?:youtu\.be\/|v=|\/v\/|embed\/|shorts\/)([^#&?]*).*/;
    const match = url.match(regExp);
    return match && match[1].length === 11 ? match[1] : null;
  } catch {
    return null;
  }
};

const Yoga = () => {
  const slides = [
    { text: "Professional Instructors", image: bg },
    { text: "24/7 Availability", image: bg },
    { text: "Trustworthy and Reliable", image: bg },
  ];
  const playerRef = useRef(null);

  const [currentSlide, setCurrentSlide] = useState(0);
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedVideo, setSelectedVideo] = useState(null);

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "yogavideos"));
        const videoData = querySnapshot.docs.map((doc) => doc.data());
        setVideos(videoData);
      } catch (error) {
        console.error("Error fetching videos: ", error);
      } finally {
        setLoading(false);
      }
    };

    fetchVideos();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prevSlide) =>
        prevSlide === slides.length - 1 ? 0 : prevSlide + 1
      );
    }, 5000);
    return () => clearInterval(interval);
  }, [slides.length]);

 const handleThumbnailClick = (videoUrl) => {
  console.log("Clicked video URL:", videoUrl);
  setSelectedVideo(videoUrl);
  setTimeout(() => {
    if (playerRef.current) {
      playerRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, 100); // small delay to ensure player renders
};

  return (
    <div>
      <div className="slideshow2" id="slides2">
        <div
          className="image-container2"
          style={{ backgroundImage: `url(${slides[currentSlide].image})` }}
        >
          <div className="text-container2">
            {slides.map((slide, index) => (
              <div
                key={index}
                className={`slide-text2 ${index === currentSlide ? 'active' : ''}`}
              >
                {slide.text}
                <h1 className="onlyOn2">Only on FitMantra</h1>
                <br />
                <button className="ybtn ssBtn2" id="btn2">
                  Know More
                </button>
                <button className="ybtn ssBtn">Get in Touch</button>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Yoga Video Section */}
      <div className="video-container">
        <h2>Yoga Videos</h2>
        {loading ? (
          <p>Loading videos...</p>
        ) : (
          <div className="video-list">
            {videos.map((video, index) => {
              const videoId = getYouTubeId(video.videoUrl);
              return (
                <div key={index} className="video-card">
                  <h3>{video.title}</h3>
                  <p>{video.description}</p>
                  <img
                    src={
                      videoId
                        ? `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`
                        : "https://via.placeholder.com/480x360?text=No+Thumbnail"
                    }
                    alt="Click to play"
                    onClick={() => video.videoUrl && handleThumbnailClick(video.videoUrl)}
                    className="thumbnail"
                    style={{ cursor: 'pointer', width: '100%' }}
                  />
                </div>
              );
            })}
          </div>
        )}

        {/* Show video player if a video is selected */}
        {selectedVideo && (
  <div className="video-player" ref={playerRef}>
    {getYouTubeId(selectedVideo) ? (
      <iframe
        width="100%"
        height="315"
        src={`https://www.youtube.com/embed/${getYouTubeId(selectedVideo)}`}
        title="YouTube Video"
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      ></iframe>
    ) : (
      <video width="100%" controls>
        <source src={selectedVideo} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    )}
  </div>
)}

      </div>
    </div>
  );
};

export default Yoga;
*/