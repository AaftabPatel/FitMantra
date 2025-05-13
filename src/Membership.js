import React, { useState, useEffect } from 'react';
import { getDocs, collection, addDoc } from 'firebase/firestore';
import { db } from './firebase';
import bg from './bg2.jpg';
import MembershipForm from './MembershipForm';

const Membership = () => {
  const [showForm, setShowForm] = useState(false);
  const [showForm2, setShowForm2] = useState(false);
  const [selectedenterprises, setSelectedenterprises] = useState(null);
  const [enterprises, setEnterprises] = useState([]);
  const [visibleCount, setVisibleCount] = useState(10);

  const [searchQuery, setSearchQuery] = useState('');

  const [newEnterprise, setNewEnterprise] = useState({
    name: '',
    location: '',
    email: '',
    contact: '',
    socials: '',
    image: '',
  });

  const handleCardClick = (enterpriseObj) => {
    setSelectedenterprises(enterpriseObj);
    setShowForm(true);
  };

  const slides = [
    { text: "Professional Enterprises", image: bg },
    { text: "24/7 Availability", image: bg },
    { text: "Trustworthy and Reliable", image: bg },
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

  useEffect(() => {
    const fetchEnterprises = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "enterprise"));
        const enterprisesList = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setEnterprises(enterprisesList);
      } catch (error) {
        console.error("Error fetching enterprises:", error);
      }
    };

    fetchEnterprises();
  }, []);

  const handleLoadMore = () => {
    setVisibleCount((prevCount) => prevCount + 10);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewEnterprise((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleAddEnterprise = async (e) => {
    e.preventDefault();
    try {
      await addDoc(collection(db, 'enterprise'), newEnterprise);
      setEnterprises((prev) => [...prev, newEnterprise]);
      setNewEnterprise({
        name: '',
        location: '',
        email: '',
        contact: '',
        socials: '',
        image: '',
      });
      alert('Enterprise added successfully');
    } catch (error) {
      console.error("Error adding enterprise:", error);
    }
  };

  const filteredEnterprises = enterprises.filter((enterprise) =>
    Object.values(enterprise).some((val) =>
      typeof val === 'string' && val.toLowerCase().includes(searchQuery)
    )
  );

  return (
    <>
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

      <h1 className="serviceHeading">OUR ENTERPRISES</h1>
      <br />
      <center>
        <button onClick={() => setShowForm2(!showForm2)} className="load-more-btn">
          {showForm2 ? "Close Form" : "Add Enterprise"}
        </button>
      </center>

      {/* 🔍 Search Bar */}
      <center><i className="fa fa-search"></i>
        <input
          type="text"
          placeholder="Search by name, location, email, or contact"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value.toLowerCase())}
          className="search-bar"
          style={{
            margin: '20px 0',
            padding: '10px',
            width: '50%',
            fontSize: '16px',
            borderRadius: '8px',
            border: '1px solid #ccc'
          }}
        />
      </center>

      {/* 📝 Add Enterprise Form */}
      {showForm2 && (
        <div className="addBox">
          <div className="add-enterprise-form">
            <h2>Add New Enterprise</h2>
            <form onSubmit={handleAddEnterprise}>
              <label>
                Name:
                <input type="text" name="name" value={newEnterprise.name} onChange={handleInputChange} required />
              </label>
              <label>
                Location:
                <input type="text" name="location" value={newEnterprise.location} onChange={handleInputChange} required />
              </label>
              <label>
                Email:
                <input type="email" name="email" value={newEnterprise.email} onChange={handleInputChange} required />
              </label>
              <label>
                Contact:
                <input type="text" name="contact" value={newEnterprise.contact} onChange={handleInputChange} required />
              </label>
              <label>
                Socials:
                <input type="text" name="socials" value={newEnterprise.socials} onChange={handleInputChange} required />
              </label>
              <label>
                Image URL:
                <input type="text" name="image" value={newEnterprise.image} onChange={handleInputChange} required />
              </label>
              <button className="submitBtn" type="submit">Add Enterprise</button>
            </form>
          </div>
        </div>
      )}

      {/* 🗂️ Enterprise Cards */}
      <div className="cardholder">
        {filteredEnterprises.slice(0, visibleCount).map((enterprise) => (
          <div
            key={enterprise.id}
            className="card"
            onClick={() => handleCardClick(enterprise)}
          >
            <img src={enterprise.image} alt="Enterprise" className="card-image" />
            <h2 className="cheading">{enterprise.name}</h2>
            <p>Location: {enterprise.location}</p>
            <p>Email: {enterprise.email}</p>
            <p>Contact: {enterprise.contact}</p>
            <p>Socials: {enterprise.socials}</p>
          </div>
        ))}
      </div>

      {/* ➕ Load More */}
      {visibleCount < filteredEnterprises.length && (
        <div style={{ textAlign: 'center', marginTop: '20px' }}>
          <button className="load-more-btn" onClick={handleLoadMore}>
            Load More
          </button>
        </div>
      )}

      {/* 📋 Membership Form */}
      {showForm && (
        <MembershipForm
          enterprise={selectedenterprises}
          onClose={() => setShowForm(false)}
        />
      )}
    </>
  );
};

export default Membership;
