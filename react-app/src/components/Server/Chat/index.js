import React, { Children, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useHistory } from 'react-router-dom';
import { findExistingChannel } from '../../../store/channel';
import './Chat.css';
import ChatHeader from './ChatHeader';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import CardGiftcardIcon from '@material-ui/icons/CardGiftcard';
import { Avatar } from '@material-ui/core';
import GifIcon from '@material-ui/icons/Gif';
import EmojiEmotionsIcon from '@material-ui/icons/EmojiEmotions';
import io from 'socket.io-client';
import createNewMessage from '../../../store/chat';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Fade from '@material-ui/core/Fade';
import Emoji from '../../Emojis/Emojis';

const url =
    process.env.NODE_ENV === 'development'
        ? 'http://localhost:5000/'
        : 'https://discordanc3.herokuapp.com/';

const socket = io(url);

socket.on('new user', (message) => {
    console.log(message.message);
});

function Chat() {
    const chatBox = document.querySelector('.chat__messages');
    const dispatch = useDispatch();
    const [messageInput, setMessageInput] = useState('');
    const [isLoaded, setIsLoaded] = useState(false);
    const [newMessage, setNewMessage] = useState(false);
    const [messages, setMessages] = useState([]);

    const { channelId } = useParams();

    const user = useSelector((state) => state.session.user);
    const channel = useSelector((state) => state.channel);
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    // useEffect(() => {
    //     socket.on('message', msg => {
    //         setMessages(messages => [...messages, msg])
    //     })
    // })

    useEffect(() => {
        if (isLoaded && user && channel)
            socket.emit('join', { username: user.username, room: channel.id });
    }, [isLoaded, user, channel]);

    const handleClose = () => {
        setAnchorEl(null);
    };
    const handleNewMessage = (e) => {
        e.preventDefault();
        if (!messageInput) return;
        socket.emit('new message');
        createNewMessage(messageInput, user, channel);
        setMessageInput('');
        setNewMessage(true);
    };

    useEffect(() => {
        socket.on('load message', () => {
            console.log('received message');
            setNewMessage(true);
        });
    }, []);

    useEffect(() => {
        dispatch(findExistingChannel(channelId));
        setNewMessage(false);
    }, [channelId, newMessage, channel.name]);

    useEffect(() => {
        if (channel) {
            setIsLoaded(true);
            if (chatBox) chatBox.scrollTop = chatBox.scrollHeight;
        }
    }, [channel, chatBox]);

    return (
        isLoaded && (
            <div className="chat">
                <ChatHeader />

                <div className="chat__messages">
                    {channel.messages &&
                        channel.messages.length > 0 &&
                        channel.messages.map((message, idx) => (
                            <div key={idx} className="chatMessageContainer">
                                <div className="chatImageAndName">
                                    {!user || user.profile_URL === undefined ? (
                                        <Avatar />
                                    ) : (
                                        <div>
                                            <img
                                                className="profile__image"
                                                src={`${user.profile_URL}`}
                                                alt="profile-pic"
                                            />
                                        </div>
                                    )}
                                </div>
                                <div className="messageBody">
                                    <p className="chatUsername">
                                        {message.username}
                                    </p>
                                    <p className="chatMessage">
                                        {message.message}
                                    </p>
                                    {/* <button onClick={(e) => deleteMessage(e)}>X</button> */}
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
                        <EmojiEmotionsIcon
                            className="emoji-icon"
                            onClick={handleClick}
                            fontSize="large"
                        />
                        <Menu
                            id="fade-menu"
                            anchorEl={anchorEl}
                            keepMounted
                            open={open}
                            onClose={handleClose}
                            TransitionComponent={Fade}
                        >
                            <MenuItem onClick={handleClose}>
                                <Emoji setMessageInput={setMessageInput} />
                            </MenuItem>
                        </Menu>
                    </div>
                </div>
            </div>
        )
    );
}

export default Chat;
