import React, { useState, useEffect } from 'react';
import { db } from './firebase';
import { collection, addDoc, query, orderBy, onSnapshot } from 'firebase/firestore';
import axios from 'axios';
import bg5 from './bg5.jpg';

const Chatbot = () => {
  const [userDetails, setUserDetails] = useState({
    age: '',
    weight: '',
    height: '',
    gender: '',
  });
  const [detailsSubmitted, setDetailsSubmitted] = useState(false);
  const [userMessage, setUserMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);

  // Fetch messages from Firestore in real-time
  useEffect(() => {
    const unsubscribe = onSnapshot(
      query(collection(db, 'messages'), orderBy('timestamp')),
      (snapshot) => {
        const msgs = snapshot.docs.map((doc) => doc.data());
        setMessages(msgs);
      }
    );

    return () => unsubscribe();
  }, []);

  // Function to handle user details form submission
  const handleDetailsSubmit = async (e) => {
    e.preventDefault();
    setDetailsSubmitted(true);

    // Prepare the intro message for the bot
    const introMessage = `Hi, I am a ${userDetails.age}-year-old ${userDetails.gender}, weighing ${userDetails.weight}kg and ${userDetails.height}cm tall. Please recommend a diet and exercise routine.`;

    // Send the intro message to Firestore
    await addDoc(collection(db, 'messages'), {
      text: introMessage,
      sender: 'user',
      timestamp: new Date(),
    });

    // Get the bot's response for the diet and exercise routine
    const response = await getOpenAIResponse(introMessage);

    // Send the bot's response to Firestore
    await addDoc(collection(db, 'messages'), {
      text: response,
      sender: 'bot',
      timestamp: new Date(),
    });
  };

  // Function to handle sending user's message
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!userMessage.trim()) return;

    // Send the user's message to Firestore
    await addDoc(collection(db, 'messages'), {
      text: userMessage,
      sender: 'user',
      timestamp: new Date(),
    });

    setLoading(true);

    // Fetch the bot's response from OpenAI API
    const response = await getOpenAIResponse(userMessage);

    // Send the bot's response to Firestore
    await addDoc(collection(db, 'messages'), {
      text: response,
      sender: 'bot',
      timestamp: new Date(),
    });

    setLoading(false);
    setUserMessage('');
  };

  // Function to get response from OpenAI API
  const getOpenAIResponse = async (message) => {
    const apiKey = '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';

    try {
      const response = await axios.post(
        'https://openrouter.ai/api/v1/chat/completions',
        {
          model: 'openai/gpt-3.5-turbo',
          messages: [{ role: 'user', content: message }],
        },
        {
          headers: {
            'Authorization': `Bearer ${apiKey}`,
            'Content-Type': 'application/json',
          },
        }
      );

      return response.data.choices[0].message.content.trim();
    } catch (error) {
      console.error('🔴 OpenAI API ERROR:', error.response?.data || error.message);
      return '⚠️ Sorry, I could not generate a response.';
    }
  };

  return (
    <div id="chatbot-container"
    style={{
        backgroundImage: `url(${bg5})`, // Use the imported image here
        backgroundSize: 'cover',
      }}>
      {!detailsSubmitted ? (
        <form id="user-details-form" onSubmit={handleDetailsSubmit}>
          <h3>Enter Your Details</h3>
          <input
            type="number"
            name="age"
            placeholder="Age"
            value={userDetails.age}
            onChange={(e) => setUserDetails({ ...userDetails, age: e.target.value })}
            required
          />
          <input
            type="number"
            name="weight"
            placeholder="Weight (kg)"
            value={userDetails.weight}
            onChange={(e) => setUserDetails({ ...userDetails, weight: e.target.value })}
            required
          />
          <input
            type="number"
            name="height"
            placeholder="Height (cm)"
            value={userDetails.height}
            onChange={(e) => setUserDetails({ ...userDetails, height: e.target.value })}
            required
          />
          <select
            name="gender"
            value={userDetails.gender}
            onChange={(e) => setUserDetails({ ...userDetails, gender: e.target.value })}
            required
          >
            <option value="">Select Gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>
          <button type="submit">Submit</button>
        </form>
      ) : (
        <>
          <div id="chat-window">
            {messages.map((msg, index) => (
              <div key={index} className={`message ${msg.sender}`}>
                <p>{msg.text}</p>
              </div>
            ))}
          </div>

          <form id="chat-form" onSubmit={handleSubmit}>
            <input
              type="text"
              id="chat-input"
              value={userMessage}
              onChange={(e) => setUserMessage(e.target.value)}
              placeholder="Ask a follow-up..."
              autoComplete="off"
            />
            <button id="chat-submit" type="submit" disabled={loading}>
              {loading ? 'Loading...' : 'Send'}
            </button>
          </form>
        </>
      )}
    </div>
  );
};

export default Chatbot;
