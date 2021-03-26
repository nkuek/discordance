import React, { useEffect, useState, useContext, useRef } from 'react';
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
import { SocketContext } from '../../../context/socket';
import createNewMessage from '../../../store/chat';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Fade from '@material-ui/core/Fade';
import Emoji from '../../Emojis/Emojis';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import MessageDropdown from '../../MessageDropdown';
import { IconButton } from '@material-ui/core';
import { saveMessageToState } from '../../../store/message';

function Chat() {
    const socket = useContext(SocketContext);
    const prevRoomRef = useRef();
    const chatBox = document.querySelector('.chat__messages');
    const dispatch = useDispatch();
    const [messageInput, setMessageInput] = useState('');
    const [isLoaded, setIsLoaded] = useState(false);
    const [newMessage, setNewMessage] = useState(false);
    const { channelId } = useParams();

    const user = useSelector((state) => state.session.user);
    const channel = useSelector((state) => state.channel);
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

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
        socket.emit('new message', { room: channel.id });
        createNewMessage(messageInput, user, channel);
        setMessageInput('');
        setNewMessage(true);
    };

    const handleDropdown = (message) => {
        dispatch(saveMessageToState(message));
    };

    useEffect(() => {
        socket.on('new user', (message) => {
            console.log(message.message);
        });
        return () => socket.disconnect();
    }, []);

    useEffect(() => {
        socket.on('load message', () => {
            console.log('received message');
            setNewMessage(true);
        });
        return () => socket.disconnect();
    }, [createNewMessage]);

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
                                            <button
                                                className="chat__inputButton"
                                                type="submit"
                                            >
                                                Send Message
                                            </button>
                                        </div>
                                    </div>
                                </div>
                                <div
                                    onClick={() => handleDropdown(message.id)}
                                    className="messageButtons"
                                >
                                    <MessageDropdown
                                        newMessage={newMessage}
                                        setNewMessage={setNewMessage}
                                    />
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
