const createNewMessage = (messageInput, user, channel) => {
    fetch('/api/chat/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ messageInput, user, channelId: channel.id }),
    });
};

export default createNewMessage;
