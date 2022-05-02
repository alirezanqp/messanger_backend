const { Server } = require('socket.io')

module.exports = (httpServer) => {

    const io = new Server (httpServer, {
        cors: {
            origin: '*',
            methods: ['GET', 'POST']
        }
    })

    io.on('connection', (socket) => {
        console.log(socket.id)

        socket.on('message', (data) => {
            io.sockets.emit('chat message', data)
        })
    
        socket.on('disconnect', () => {
            console.log('User Disconnected! - ', socket.id)
        })
    })
}