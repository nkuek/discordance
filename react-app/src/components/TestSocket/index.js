import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import io from 'socket.io-client';

const socket = io('localhost:5000/');

socket.on('my response', (msg) => {
    fetch('/api/chat/', {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(msg),
    });
    const message = document.createElement('p');
    console.log(msg);
    message.innerHTML = msg.message.username + ': ' + msg.message.input;
    document.getElementById('chatbox').appendChild(message);
});

const TestSocket = () => {
    const user = useSelector((state) => state.session.user);
    const [isLoaded, setIsLoaded] = useState(false);
    const [input, setInput] = useState('');
    const handleSubmit = (e, username) => {
        e.preventDefault();
        if (!input) return;
        socket.emit('my event', { input, username });
        setInput('');
        return false;
    };

    useEffect(() => {
        user && setIsLoaded(true);
    }, [user]);
    return (
        isLoaded && (
            <div>
                <div>
                    <h1>Messages here</h1>
                    <div style={{ color: 'white' }} id="chatbox"></div>
                </div>
                <br></br>
                <form onSubmit={(e) => handleSubmit(e, user.username)}>
                    <input
                        placeholder="Message"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                    ></input>
                    <button>Submit</button>
                </form>
            </div>
        )
    );
};

export default TestSocket;
