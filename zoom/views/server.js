const express = require('express')
const path = require('path')
const { Socket } = require('socket.io')
const app = express()
const server = require('http').Server(app)
const io = require('socket.io')(server)
const { v4: uuidv4 } = require('uuid')

app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')

app.use(express.static('public'))

app.get('/', (req, res) => {
    res.redirect(`/${uuidv4()}`)
    res.render('room')
})

app.get('/:room', (req, res) => {
    res.render('room', { roomId: req.params.room })
})

io.on('connection', socket => {
    socket.on('join-room', (roomId, userId) => {
        socket.join(roomId)
        socket.to(roomId).broadcast.emit('User Connected', userId)
        socket.on('disconnect', () => {
            socket.to(roomId).broadcast.emit('User Disconnected', userId)
        })
    })
})

server.listen(3000)