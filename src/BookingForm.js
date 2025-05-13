import React, { useState } from "react";
import { db } from "./firebase";
import { collection, addDoc } from "firebase/firestore";

const BookingForm = ({ trainer, onClose }) => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    contact: "",
    date:"",
    trainer,
  });

  const handleChange = (e) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addDoc(collection(db, "trainerBookings"), form);
      alert("Booking submitted!");
      onClose();
    } catch (error) {
      console.error("Error booking:", error);
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal">
        <h2>Book {trainer}</h2>
        <form onSubmit={handleSubmit}>
          <input name="name" placeholder="Your Name" onChange={handleChange} required />
          <input name="email" placeholder="Your Email" onChange={handleChange} required />
          <input name="contact" placeholder="Contact No." onChange={handleChange} required />
          <input type="date" name="date" value={form.date} onChange={handleChange} required />
          <button type="submit">Submit</button>
          <button type="button" onClick={onClose}>Cancel</button>
        </form>
      </div>
    </div>
  );
};

export default BookingForm;
