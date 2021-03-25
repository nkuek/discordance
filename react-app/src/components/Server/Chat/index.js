import React, { Children, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useHistory } from 'react-router-dom';
import { findExistingChannel } from '../../../store/channel';
import './Chat.css';
import ChatHeader from './ChatHeader';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import CardGiftcardIcon from '@material-ui/icons/CardGiftcard';
import { Avatar } from '@material-ui/core';
import { IconButton } from '@material-ui/core';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import GifIcon from '@material-ui/icons/Gif';
import EmojiEmotionsIcon from '@material-ui/icons/EmojiEmotions';
import io from 'socket.io-client';
import createNewMessage from '../../../store/chat';
import MessageDropdown from '../../MessageDropdown';
import { saveMessageToState } from '../../../store/message';

const socket = io('http://localhost:5000/');

function Chat() {
    const chatBox = document.querySelector('.chat__messages');
    const dispatch = useDispatch();
    const [messageInput, setMessageInput] = useState('');
    const [isLoaded, setIsLoaded] = useState(false);
    const [newMessage, setNewMessage] = useState(false);

    const { channelId } = useParams();

    const user = useSelector((state) => state.session.user);
    const channel = useSelector((state) => state.channel);

    const handleNewMessage = (e) => {
        e.preventDefault();
        if (!messageInput) return;
        setMessageInput('');
        socket.emit('new message');
        createNewMessage(messageInput, user, channel);
        setNewMessage(true);
    };

    const handleDropdown = (messageId) => {
        dispatch(saveMessageToState(messageId));
    };

    useEffect(() => {
        socket.on('load message', () => {
            setNewMessage(true);
        });
    }, []);

    useEffect(() => {
        console.log('dispatching');
        dispatch(findExistingChannel(channelId));
        setNewMessage(false);
    }, [channelId, newMessage]);

    useEffect(() => {
        if (channel) {
            setIsLoaded(true);
            if (chatBox) chatBox.scrollTop = chatBox.scrollHeight;
        }
    }, [channel]);

    return (
        isLoaded && (
            <div className="chat">
                <ChatHeader />

                <div className="chat__messages">
                    {channel.messages &&
                        channel.messages.length > 0 &&
                        channel.messages.map((message, idx) => (
                            <div key={idx} className="chatMessageContainer">
                                <div className="chatImageAndBody">
                                    <div className="chatImageAndName">
                                        {!user ||
                                        user.profile_URL === undefined ? (
                                            <Avatar />
                                        ) : (
                                            <div>
                                                <img
                                                    className="profile__image"
                                                    src={`${user.profile_URL}`}
                                                />
                                            </div>
                                        )}
                                    </div>
                                    <div className="messageBodyAndButtons">
                                        <div className="messageBody">
                                            <p className="chatUsername">
                                                {message.username}
                                            </p>
                                            <p className="chatMessage">
                                                {message.message}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                                <div
                                    onClick={() => handleDropdown(message.id)}
                                    className="messageButtons"
                                >
                                    <MessageDropdown />
                                </div>
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
