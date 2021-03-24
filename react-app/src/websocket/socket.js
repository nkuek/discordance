import io from 'socket.io-client'

const socket = io('localhost:5000/')

socket.on('new message', async(msg) => {
    const response = await fetch('/api/chat', {
        method: "PUT",
        headers: {
            'Content-Type':
        }
    })
})