import React, { useState } from 'react';
import { db } from './firebase';
import { collection, addDoc } from 'firebase/firestore';

const Contact = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [number, setNumber] = useState('');
    const [query, setQuery] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await addDoc(collection(db, 'contactQueries'), {
                name,
                email,
                number,
                query,
                timestamp: new Date()
            });
            alert('Query submitted successfully!');
            setName('');
            setEmail('');
            setNumber('');
            setQuery('');
        } catch (error) {
            console.error('Error adding document: ', error);
            alert('Submission failed. Try again.');
        }
    };

    return (
        <div className="contactUs" id="contact">
            <div className="contactForm">
                <h2>Get in Touch</h2>
                <form onSubmit={handleSubmit}>
                    <div className="input-group">
                        <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Enter your Name" required />
                    </div>
                    <div className="input-group">
                        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Enter your email" required />
                    </div>
                    <div className="input-group">
                        <input type="text" value={number} onChange={(e) => setNumber(e.target.value)} placeholder="Enter your number" required />
                    </div>
                    <div className="input-group">
                        <textarea value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Enter your Query" required></textarea>
                    </div>
                    <button type="submit">Submit</button>
                </form>
            </div>
        </div>
    );
};

export default Contact;
