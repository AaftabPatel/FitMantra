import React, { useState, useEffect } from 'react';
import { getDocs, collection, addDoc } from 'firebase/firestore';
import { db } from './firebase';
import bg from './bg4.jpg';
import BookingForm from './BookingForm';

const TrainerBooking = () => {
  const [showForm, setShowForm] = useState(false);
  const [showForm2, setShowForm2] = useState(false);
  const [selectedTrainer, setSelectedTrainer] = useState("");
  const [trainers, setTrainers] = useState([]);
  const [visibleCount, setVisibleCount] = useState(10);
  const [searchTerm, setSearchTerm] = useState(""); // <-- Search input

  const [newTrainer, setnewTrainer] = useState({
    name: '',
    location: '',
    job: '',
    contact: '',
    socials: '',
    image: '',
  });

  const handleCardClick = (trainerName) => {
    setSelectedTrainer(trainerName);
    setShowForm(true);
  };

  const slides = [
    { text: "Professional Trainer", image: bg },
    { text: "24/7 Availability", image: bg },
    { text: "Trustworthy and Reliable", image: bg }
  ];

  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prevSlide) =>
        prevSlide === slides.length - 1 ? 0 : prevSlide + 1
      );
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const fetchTrainers = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "trainers"));
        const trainersList = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setTrainers(trainersList);
      } catch (error) {
        console.error("Error fetching trainers:", error);
      }
    };

    fetchTrainers();
  }, []);

  const handleLoadMore = () => {
    setVisibleCount((prevCount) => prevCount + 10);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setnewTrainer((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleAddTrainer = async (e) => {
    e.preventDefault();
    try {
      await addDoc(collection(db, 'trainers'), newTrainer);
      setTrainers((prev) => [...prev, newTrainer]);
      setnewTrainer({
        name: '',
        location: '',
        job: '',
        contact: '',
        socials: '',
        image: '',
      });
      alert('Trainer added successfully');
    } catch (error) {
      console.error("Error adding trainer:", error);
    }
  };

  // FILTERED TRAINERS
  const filteredTrainers = trainers.filter(trainer =>
    trainer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    trainer.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
    trainer.job?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      <div className="slideshow2" id="slides2">
        <div className="image-container2" style={{ backgroundImage: `url(${slides[currentSlide].image})` }}>
          <div className="text-container2">
            {slides.map((slide, index) => (
              <div key={index} className={`slide-text2 ${index === currentSlide ? 'active' : ''}`}>
                {slide.text}
                <h1 className="onlyOn2">Only on FitMantra</h1>
                <br />
              </div>
            ))}
          </div>
        </div>
      </div>

      <h1 className="serviceHeading"> OUR TRAINERS</h1>
      <br />
      <center>
        <button onClick={() => setShowForm2(prev => !prev)} className="load-more-btn">
          {showForm2 ? "Close Form" : "Add Trainer"}
        </button>
      </center>

      {/* 🔍 SEARCH BAR */}
      <center><i className="fa fa-search"></i>
        <input
          type="text"
          placeholder="Search by name, location, or job"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{ padding: '10px', margin: '20px', width: '60%', borderRadius: '8px', border: '1px solid #ccc' }}
        />
      </center>

      

      {showForm2 && (
        <center>
          <div className="addBox">
            <div className="add-trainer-form">
              <h2>Add New Trainer</h2>
              <form onSubmit={handleAddTrainer}>
                <label>Name: <input type="text" name="name" value={newTrainer.name} onChange={handleInputChange} required /></label>
                <label>Location: <input type="text" name="location" value={newTrainer.location} onChange={handleInputChange} required /></label>
                <label>Job: <input type="text" name="job" value={newTrainer.job} onChange={handleInputChange} required /></label>
                <label>Contact: <input type="text" name="contact" value={newTrainer.contact} onChange={handleInputChange} required /></label>
                <label>Socials: <input type="text" name="socials" value={newTrainer.socials} onChange={handleInputChange} required /></label>
                <label>Image URL: <input type="text" name="image" value={newTrainer.image} onChange={handleInputChange} required /></label>
                <button className="submitBtn" type="submit">Add Trainer</button>
              </form>
            </div>
          </div>
        </center>
      )}

      <div className="cardholder">
        {filteredTrainers.slice(0, visibleCount).map((trainer) => (
          <div key={trainer.id} className="card" onClick={() => handleCardClick(trainer.name)}>
            <img src={trainer.image} alt="Trainer" className="card-image" />
            <h2 className="cheading">{trainer.name}</h2>
            <p>Location: {trainer.location}</p>
            <p>Job: {trainer.job}</p>
            <p>Contact: {trainer.contact}</p>
            <p>Socials: {trainer.socials}</p>
          </div>
        ))}
      </div>

      {visibleCount < filteredTrainers.length && (
        <div style={{ textAlign: 'center', marginTop: '20px' }}>
          <button className="load-more-btn" onClick={handleLoadMore}>
            Load More
          </button>
        </div>
      )}

      {showForm && (
        <BookingForm trainer={selectedTrainer} onClose={() => setShowForm(false)} />
      )}
    </>
  );
};

export default TrainerBooking;
