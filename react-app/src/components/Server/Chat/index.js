import React, { Children, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useHistory } from 'react-router-dom';
import { findExistingChannel } from '../../../store/channel';
import './Chat.css';
import 'emoji-mart/css/emoji-mart.css';
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
import { IconButton } from '@material-ui/core';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import MessageDropdown from '../../MessageDropdown';
import { saveMessageToState } from '../../../store/message';
import { Picker } from 'emoji-mart';

const url =
    process.env.NODE_ENV === 'development'
        ? 'http://localhost:5000/'
        : 'https://discordanc3.herokuapp.com/';

const socket = io.connect(url, {
    secure: true,
});

function Chat() {
    const chatBox = document.querySelector('.chat__messages');
    const dispatch = useDispatch();
    const [messageInput, setMessageInput] = useState('');
    const [emojiPickerState, SetEmojiPicker] = useState(false);
    const [isLoaded, setIsLoaded] = useState(false);
    const [newMessage, setNewMessage] = useState(false);

    const { channelId } = useParams();

    const user = useSelector((state) => state.session.user);
    const channel = useSelector((state) => state.channel);
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);

    let emojiPicker;
    if (emojiPickerState) {
        emojiPicker = (
            <Picker
                title="Pick your emoji…"
                emoji="point_up"
                style={{
                    position: 'absolute',
                    bottom: '100px',
                    right: '100px',
                    backgroundColor: '#474b53',
                }}
                theme="dark"
                onSelect={(emoji) => {
                    setMessageInput(messageInput + emoji.native);
                    SetEmojiPicker(false);
                }}
            />
        );
    }

    function triggerPicker(event) {
        event.preventDefault();
        SetEmojiPicker(!emojiPickerState);
    }

    // const handleClick = (event) => {
    //   event.preventDefault();
    //   setAnchorEl(event.currentTarget);
    // };

    const handleDropdown = (messageId) => {
        dispatch(saveMessageToState(messageId));
    };
    // const handleClose = () => {
    //     setAnchorEl(null);
    // };
    const handleNewMessage = (e) => {
        e.preventDefault();
        if (!messageInput) return;
        socket.emit('new message', { user: user.username, room: channel.id });
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
                                    onClick={() => handleDropdown(message)}
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
                        <div className="emoji-container">{emojiPicker}</div>
                        <button className="chat__inputButton" type="submit">
                            Send Message
                        </button>
                    </form>
                    <div className="chat__inputIcons">
                        <CardGiftcardIcon fontSize="large" />
                        <GifIcon fontSize="large" />
                        <EmojiEmotionsIcon
                            className="emoji-icon"
                            onClick={triggerPicker}
                            fontSize="large"
                        />
                    </div>
                </div>
            </div>
        )
    );
}

export default Chat;
