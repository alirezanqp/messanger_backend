const { Server } = require('socket.io')

module.exports = (httpServer) => {

    const io = new Server (httpServer, {
        cors: {
            origin: 'http://*:3000/',
            methods: ['GET', 'POST']
        }
    })

    io.on('connection', (socket) => {
        console.log(socket.id)

        socket.on('disconnect', () => {
            console.log('User Disconnected! - ', socket.id)
        })
    })
}
