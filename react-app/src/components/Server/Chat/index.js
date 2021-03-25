import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useHistory } from 'react-router-dom';
import { findExistingChannel } from '../../../store/channel';
import './Chat.css';
import ChatHeader from './ChatHeader';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import CardGiftcardIcon from '@material-ui/icons/CardGiftcard';
import GifIcon from '@material-ui/icons/Gif';
import EmojiEmotionsIcon from '@material-ui/icons/EmojiEmotions';
import io from 'socket.io-client';

const socket = io('localhost:5000/');

socket.on('load message', (msg) => {
    fetch('/api/chat/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(msg),
    });

    const chatBox = document.querySelector('.chat__messages');
    const message = document.createElement('p');
    const username = document.createElement('p');
    const chatMessageContainer = document.createElement('div');
    chatMessageContainer.classList.add('chatMessageContainer');
    username.innerHTML = msg.message.user.username;
    message.innerHTML = msg.message.messageInput;
    username.classList.add('chatUsername');
    message.classList.add('chatMessage');
    chatMessageContainer.appendChild(username);
    chatMessageContainer.appendChild(message);
    chatBox.appendChild(chatMessageContainer);
    chatBox.scrollTop = chatBox.scrollHeight;
});
function Chat() {
    const chatBox = document.querySelector('.chat__messages');
    const dispatch = useDispatch();
    const history = useHistory();
    const [messageInput, setMessageInput] = useState('');
    const [isLoaded, setIsLoaded] = useState(false);
    const [newChannel, setNewChannel] = useState(false);

    const { channelId } = useParams();

    const user = useSelector((state) => state.session.user);
    const channel = useSelector((state) => state.channel);

    const handleNewMessage = (e) => {
        e.preventDefault();
        if (!messageInput) return;
        setMessageInput('');
        socket.emit('new message', { messageInput, user, channel });
    };

    useEffect(() => {
        dispatch(findExistingChannel(channelId));
    }, [channelId]);

    useEffect(() => {
        if (channel) {
            setIsLoaded(true);
        }
        console.log(chatBox);
        if (chatBox) chatBox.scrollTop = chatBox.scrollHeight;
    }, [channel]);

    return (
        isLoaded && (
            <div className="chat">
                <ChatHeader />

                <div className="chat__messages">
                    {channel.messages &&
                        channel.messages.length > 0 &&
                        channel.messages.map((message) => (
                            <div className="chatMessageContainer">
                                <p className="chatUsername">
                                    {message.username}
                                </p>
                                <p className="chatMessage">{message.message}</p>
                            </div>
                        ))}
                </div>

                <div className="chat__input">
                    <AddCircleIcon fontSize="large" />
                    <form onSubmit={(e) => handleNewMessage(e)}>
                        <input
                            value={messageInput}
                            onChange={(e) => setMessageInput(e.target.value)}
                            placeholder={`message #TEST`}
                        />
                        <button className="chat__inputButton" type="submit">
                            Send Message
                        </button>
                    </form>

                    <div className="chat__inputIcons">
                        <CardGiftcardIcon fontSize="large" />
                        <GifIcon fontSize="large" />
                        <EmojiEmotionsIcon fontSize="large" />
                    </div>
                </div>
            </div>
        )
    );
}

export default Chat;
