
import emitBpmValueToAllUsers from './handlers/emitBpmValueToAllUsers.js'
import addMultipleEventlisteners from  './helpers/addMultipleEventlisteners.js'
import { checkboxesToArray } from './helpers/groupAudioByKey.js'
import usernameSubmit from './handlers/usernameSubmit.js'
import playButtonHandler from './handlers/playButtonHandler.js'
import changeBpmHandler from './socketHandlers/changeBpmHandler.js'
import sendAudioHandler from './socketHandlers/sendAudioHandler.js'
import usersHandler from './socketHandlers/usersHandler.js'

// initialize socket
const socket = io({
	autoConnect: false
})

// query selector variables
const createUsernameForm = document.getElementById('create-username-form')
const playButton = document.getElementById('play')
const bpmValue = document.getElementById('bpm')

const roomId = window.location.pathname.split('/')[2]

if(roomId) {
	// socket events
	socket.on('getRoomId', () => {
		socket.emit('roomId', {
			roomId: roomId,
			bpm: bpmValue.value
		})
	})
		.on('users', ({ users, checkboxes, bpm }) => {
			usersHandler({
				users: users,
				checkboxes: checkboxes,
				bpm: bpm,
				bpmValue: bpmValue
			})
		})
		.on('sendAudio', sendAudioHandler)
		.on('change bpm', (bpm) => {
			changeBpmHandler(bpm, bpmValue)
		})

	createUsernameForm.addEventListener('submit', (event) => {
		usernameSubmit(event, socket)
	})

	checkboxesToArray.forEach(checkbox => checkbox.addEventListener('click', (e) => {
		socket.emit('audio', {
			checkboxIndex: checkboxesToArray.indexOf(e.target),
			checked: e.target.checked,
		})
	}))

	playButton.addEventListener('click', () => playButtonHandler(bpmValue))
	
	addMultipleEventlisteners(['mouseup', 'keyup'], bpmValue, emitBpmValueToAllUsers, socket)
}