const { createServer } = require('http')
const { Server } = require('socket.io')

module.exports = (app) => {

    const httpServer = createServer(app) 

    const io = new Server (httpServer, {
        cors: {
            origin: 'http://localhost:5050',
            methods: ['GET', 'POST']
        }
    })

    io.on('connection', (socket) => {
        console.log(socket.id)

        socket.on('disconnect', () => {
            console.log('User Disconnected! - ', socket.id)
        })
    })

    httpServer.listen(4000)
}
