// require and initiate dependencies
const express = require('express')
const app = express()
const http = require('http').Server(app)
const io = require('socket.io')(http)
const mongoose = require('mongoose')

require('dotenv').config()
// require controllers
const createRoom = require('./src/controllers/createRoom')
const renderRooms = require('./src/controllers/renderRooms')
const renderIndex = require('./src/controllers/renderIndex')
const renderCreateRoom = require('./src/controllers/renderCreateRoom')
const renderBeatRoom = require('./src/controllers/renderBeatRoom')
const Room = require('./src/models/Room.js')

const port = process.env.PORT || 3000

const uri = process.env.MONGODB_URI

let checkedCheckboxes = []

mongoose.connect(uri, {
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

app
	.get('/', renderIndex)
	.get('/rooms', renderRooms)
	.get('/create-room', renderCreateRoom)
	.get('/rooms/:id', renderBeatRoom)

	.post('/create-room', createRoom)

io.on('connection', async (socket) => {
	console.log('Someone connected!')
	const users = []
	const userId = socket.id

	io.of('/').sockets.forEach(user => users.push({
		userID: user.id,
		username: user.username,
	}))

	socket.emit('getRoomId')

	socket.on('roomId', async ({ roomId, bpm }) => {
		socket.join(roomId)

		await Room.updateOne({
			_id: roomId
		}, {
			users: users,
			bpm: bpm
		})

		const currentRoom = await Room.findOne({
			_id: roomId
		})

		socket.on('send bpm', (bpm) => {
			io.in(roomId).emit('change bpm', {
				bpm: bpm
			})
		})

		io.in(roomId).emit('users', {
			users: users,
			checkboxes: currentRoom.checkboxes,
			bpm: currentRoom.bpm
		})

		socket.on('audio', async (checkbox) => {
			const currentRoom = await Room.findOne({
				_id: roomId
			})
			checkedCheckboxes = currentRoom.checkboxes

			if(checkbox.checked) {
				checkedCheckboxes.push(checkbox)
				await Room.updateOne({
					_id: roomId
				}, {
					checkboxes: checkedCheckboxes
				})
			} else {
				const newCheckboxes = checkedCheckboxes.filter(item => item.checkboxIndex !== checkbox.checkboxIndex)
				await Room.updateOne({
					_id: roomId
				}, {
					checkboxes: newCheckboxes
				})
			}
			io.in(roomId).emit('sendAudio', checkbox)
		})
		socket.on('disconnect', async () => {
			const remainingUsers = users.filter(user => user.userID !== userId)
			Room.findOneAndUpdate({
				_id: roomId
			}, {
				users: remainingUsers
			})
			if(remainingUsers.length === 0) {
				await Room.deleteOne({
					_id: roomId
				})
			}
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
