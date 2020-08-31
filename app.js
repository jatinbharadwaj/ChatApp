const express = require('express')
const http = require('http')

const app = express()
const socketio = require('socket.io')

const server = http.createServer(app)
const io = socketio(server)

io.on('connection',(socket)=>{
    console.log('connected with socket id ',socket.id)

    socket.on('msg_send',(data)=>{

        console.log('recieved',data.msg)

        io.emit('msg_rcvd',data)

    })

})

app.use('/',express.static(__dirname + '/public'))


server.listen(4444,()=>{
    console.log('Started on http://localhost:4444')
})