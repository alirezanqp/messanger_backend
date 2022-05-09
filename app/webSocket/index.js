const { Server } = require('socket.io')
const { ADD_CHAT_MESSAGE } = require('../actions/socketio')

module.exports = (httpServer) => {

    const io = new Server (httpServer, {
        cors: {
            origin: '*',
            methods: ['GET', 'POST']
        }
    })

    io.on('connection', (socket) => {
        console.log(socket.id)

        // New Message Event
        socket.on('newChatMessage', async (data) => {
            const newMessage = await ADD_CHAT_MESSAGE(data)

            io.to(data.chat._id).emit('receivedNewMessage', JSON.stringify(newMessage));
        })
        socket.on('message', (data) => {
            io.sockets.emit('chat message', data)
        })
    
        socket.on('disconnect', () => {
            console.log('User Disconnected! - ', socket.id)
        })
    })
}