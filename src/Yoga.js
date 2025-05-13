import React, { useState, useEffect } from 'react';
import { getDocs, collection, addDoc } from 'firebase/firestore';
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

  const [currentSlide, setCurrentSlide] = useState(0);
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [visibleCount, setVisibleCount] = useState(10);
  const [searchTerm, setSearchTerm] = useState('');

  const [newVideo, setNewVideo] = useState({
    title: '',
    description: '',
    videoUrl: '',
  });

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "video"));
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
    setSelectedVideo(videoUrl);
  };

  const handleLoadMore = () => {
    setVisibleCount((prevCount) => prevCount + 10);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewVideo((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleAddVideo = async (e) => {
    e.preventDefault();
    try {
      await addDoc(collection(db, 'video'), newVideo);
      setVideos((prev) => [...prev, newVideo]);
      setNewVideo({ title: '', description: '', videoUrl: '' });
      alert('Video added successfully');
    } catch (error) {
      console.error("Error adding Video:", error);
    }
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
              </div>
            ))}
          </div>
        </div>
      </div>

      <h1 className="yogaHeading">Yoga Videos</h1>
      <br />
      <center>
        <button onClick={() => setShowForm(!showForm)} className="load-more-btn">
          {showForm ? "Close Form" : "Add Video"}
        </button>
      </center>

      <center><i className="fa fa-search"></i>
        <input
          type="text"
          placeholder="Search yoga videos..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-bar"
          style={{
            padding: '10px',
            width: '50%',
            margin: '20px auto',
            fontSize: '16px',
            borderRadius: '5px',
            border: '1px solid #ccc'
          }}
        />
      </center>

      {showForm && (
        <div className="addBox">
          <div className="add-enterprise-form">
            <h2>Add New Video</h2>
            <form onSubmit={handleAddVideo}>
              <label>
                Title:
                <input type="text" name="title" value={newVideo.title} onChange={handleInputChange} required />
              </label>
              <label>
                Description:
                <input type="text" name="description" value={newVideo.description} onChange={handleInputChange} required />
              </label>
              <label>
                videoUrl:
                <input type="text" name="videoUrl" value={newVideo.videoUrl} onChange={handleInputChange} required />
              </label>
              <button className="submitBtn" type="submit">Add Video</button>
            </form>
          </div>
        </div>
      )}

      {loading ? (
        <p>Loading videos...</p>
      ) : (
        <div className="video-list">
          {videos
            .filter(video =>
              video.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
              video.description.toLowerCase().includes(searchTerm.toLowerCase())
            )
            .slice(0, visibleCount)
            .map((video, index) => {
              const videoId = getYouTubeId(video.videoUrl);
              return (
                <div key={index} className="video-card">
                  <h3 className="videoHeading">{video.title}</h3>
                  <p>{video.description}</p>

                  {selectedVideo === video.videoUrl ? (
                    <div className="video-player">
                      {videoId ? (
                        <iframe
                          width="100%"
                          height="315"
                          src={`https://www.youtube.com/embed/${videoId}`}
                          title="YouTube Video"
                          frameBorder="0"
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                          allowFullScreen
                        ></iframe>
                      ) : (
                        <video width="100%" controls>
                          <source src={video.videoUrl} type="video/mp4" />
                          Your browser does not support the video tag.
                        </video>
                      )}
                    </div>
                  ) : (
                    <img
                      src={
                        videoId
                          ? `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`
                          : "https://via.placeholder.com/480x360?text=No+Thumbnail"
                      }
                      alt="Click to play"
                      onClick={() => handleThumbnailClick(video.videoUrl)}
                      className="thumbnail"
                      style={{ cursor: 'pointer', width: '100%' }}
                    />
                  )}
                </div>
              );
            })}
          {visibleCount < videos.length && (
            <center>
              <button onClick={handleLoadMore} className="load-more-btn">Load More</button>
            </center>
          )}
        </div>
      )}
    </div>
  );
};

export default Yoga;
