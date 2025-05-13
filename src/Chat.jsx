import React, { useState, useEffect } from "react";
import {
  collection,
  addDoc,
  query,
  orderBy,
  onSnapshot,
  serverTimestamp,
} from "firebase/firestore";
import { db } from "./firebase";

const Chat = () => {
  const [message, setMessage] = useState("");
  const [chats, setChats] = useState([]);

  useEffect(() => {
    const q = query(collection(db, "publicChats"), orderBy("timestamp", "asc"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      setChats(snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
    });
    return () => unsubscribe();
  }, []);

  const handleSend = async (e) => {
    e.preventDefault();
    if (message.trim() === "") return;
    await addDoc(collection(db, "publicChats"), {
      message,
      timestamp: serverTimestamp(),
    });
    setMessage("");
  };

  return (
    <div className="chat-page">
      <h2><i className="fa fa-comments"></i> Anonymous Forum</h2>
      <div className="chat-box">
        {chats
          .filter(chat => chat.timestamp) // avoid undefined timestamps
          .map((chat) => (
            <div key={chat.id} className="chat-message">
              <p>{chat.message}</p>
              <small>
                {chat.timestamp
                  ? chat.timestamp.toDate().toLocaleString()
                  : "Sending..."}
              </small>
            </div>
          ))}
      </div>
      <form onSubmit={handleSend} className="chat-form">
        <input
          type="text"
          placeholder="Type anonymously..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <button type="submit">Send</button>
      </form>
    </div>
  );
};

export default Chat;
