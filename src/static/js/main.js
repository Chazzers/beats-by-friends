import { checkboxesToArray } from './helpers/groupAudioByKey.js'
import emitBpmValueToAllUsers from './handlers/emitBpmValueToAllUsers.js'
import addMultipleEventlisteners from  './helpers/addMultipleEventlisteners.js'
import render from './helpers/render.js'
import usernameSubmit from './handlers/usernameSubmit.js'
import playButtonHandler from './handlers/playButtonHandler.js'

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
	socket.on('getRoomId', () => {
		socket.emit('roomId', {
			roomId: roomId,
			bpm: bpmValue.value
		})
	})
		.on('sendAudio', (checkbox) => {
			const { checkboxIndex, checked } = checkbox
			checkboxesToArray[checkboxIndex].checked = checked
		})
		.on('change bpm', (bpm) => {
			bpmValue.value = bpm.bpm
		})
		.on('users', ({ users, checkboxes, bpm }) => {
			render(`
			<section>
			<h2>Users</h2>
			${
				users.map(user => 
				`<article>
					<p>${user.username}</p>
				</article>`
				).join('')
			}
			</section>
			`, '#user-list')
			if(checkboxes.length) {
				checkboxes.forEach(checkbox => checkboxesToArray[checkbox.checkboxIndex].checked = checkbox.checked)
			}
			bpmValue.value = bpm
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