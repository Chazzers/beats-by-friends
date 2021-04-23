// require and initiate dependencies

const express = require('express')
const app = express()
const http = require('http').Server(app)
const io = require('socket.io')(http)
const mongoose = require('mongoose')
const path = require('path')
const fs = require('fs')
//joining path of directory 


require('dotenv').config()

// require controllers

const createRoom = require('./src/controllers/createRoom')
const renderRooms = require('./src/controllers/renderRooms')
const renderIndex = require('./src/controllers/renderIndex')
const renderCreateRoom = require('./src/controllers/renderCreateRoom')
const renderBeatRoom = require('./src/controllers/renderBeatRoom')


const port = process.env.PORT || 3000

const uri = process.env.MONGODB_URI

const checkedCheckboxes = []

mongoose.connect(uri, {
	useNewUrlParser: true,
	useUnifiedTopology: true,
	dbName: 'beatsByFriends' 
})
	.catch(error => console.error(error))


app
	.set('view engine', 'ejs')
	.set('views', './src/views')

	.use(express.static('src/static'))
	.use(express.urlencoded({
		extended: true 
	}))
	.use(express.json())

	.get('/', renderIndex)
	.get('/rooms', renderRooms)
	.get('/create-room', renderCreateRoom)
	.get('/rooms/:id', renderBeatRoom)

	.post('/create-room', createRoom)

io.on('connection', async (socket) => {
	console.log('Someone connected!')
	const users = []

	io.of('/').sockets.forEach(user => users.push({
		userID: user.id,
		username: user.username,
	}))

	socket.emit('getRoomId')
	
	socket.on('roomId', ({ roomId }) => {
		socket.join(roomId)
		io.in(roomId).emit('users', {
			users: users,
			checkboxes: checkedCheckboxes
		})
		socket.on('audio', (checkbox) => {
			checkedCheckboxes.push(checkbox)
			io.in(roomId).emit('sendAudio', checkbox)
		})
	})
})

io.use((socket, next) => {
	const username = socket.handshake.auth.username

	if (!username) {
		return next(new Error('invalid username'))
	}
	socket.username = username
	next()
})

http.listen(port, () => console.log(`this app is listening at http://localhost:${port}`))
