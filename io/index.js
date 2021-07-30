/* eslint-disable no-console */
import http from 'http'
import socketIO from 'socket.io-client'

export default function () {
  this.nuxt.hook('render:before', (renderer) => {
    const server = http.createServer(this.nuxt.renderer.app)
    const io = socketIO('https://saletastic-admin-server.herokuapp.com/')

    // overwrite nuxt.server.listen()
    // this.nuxt.server.listen = (port, host) => new Promise(resolve => server.listen(port || 5000, host || 'localhost', resolve))
    // close this server on 'close' event
    this.nuxt.hook('close', () => new Promise(server.close))

    // Add socket.io events
    const messages = []
    io.on('connection', (socket) => {
      console.log('connected to socket server');
      socket.on('msg', function (message) {
        messages.push(message)
        console.log(messages)
        socket.broadcast.emit('msg', message)
      })
    })
  })
}