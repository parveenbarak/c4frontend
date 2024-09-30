import { useState, useEffect } from 'react';
import './chat.css';
import io from 'socket.io-client';

const socket = io('http://localhost:9000');  

export const Chat = () => {
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState('');

  useEffect(() => {
    socket.on('message', (msg) => {
      setMessages((prev) => [...prev, msg]);
    });
  }, []);

  const sendMessage = (e) => {
    e.preventDefault();
    socket.emit('message', message);
    setMessage('');
  };

  return (
    <div className="chatContainer">
      <div className="chatBox">
        {messages.map((msg, index) => (
          <div key={index}>{msg}</div>
        ))}
      </div>
      <form onSubmit={sendMessage}>
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="messageInput"
          placeholder="Type your message"
        />
        <button type="submit">Send</button>
      </form>
    </div>
  );
};
