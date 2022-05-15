const { Server } = require('socket.io')
const { ADD_CHAT_MESSAGE } = require('../actions/socketio')

module.exports = (httpServer) => {

    const io = new Server (httpServer, {
        cors: {
            origin: '*',
            methods: ['GET', 'POST']
        }
    })

    const users = []

    const addUser = (userId, socketId) => {
        !users.some(user => userId === userId) && 
            users.push({ userId, socketId})
    }

    const removeUser = (socketId) => {
        users = users.filter(user => user.socketId !== socketId)
    }

    const getUser = (userId) => {
        return users.find(user => user.userId === userId)
    }

    io.on('connection', (socket) => {
        console.log(socket.id)

        // Add User
        socket.on('addUser', (userId) => {
            addUser(userId, socket.id)
            io.emit("getUsers", users)
        })

        // New Message Event
        socket.on('newChatMessage', async (data) => {
            const newMessage = await ADD_CHAT_MESSAGE(data)

            io.to(data.chatId).emit('receivedNewMessage', JSON.stringify(newMessage));
        })

        socket.on('message', (data) => {
            io.sockets.emit('chat message', data)
        })
    
        socket.on('disconnect', () => {
            removeUser(socket.id)
            io.emit("getUsers", users)
        })
    })
}