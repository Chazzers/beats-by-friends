import { checkboxArrayKeys, groupedCheckboxesArray, checkboxesToArray } from './groupAudioByKey.js'
import playSound from './playSound.js'

const socket = io({
	autoConnect: false
})

const createUsernameForm = document.getElementById('create-username-form')
const usernameContainer = document.getElementById('username-container')
const username = document.getElementById('username')
const main = document.querySelector('main')
const userList = document.getElementById('user-list')

let hasUsername = false

if(!hasUsername && createUsernameForm){ 
	usernameContainer.style.display = 'block'
}

if(createUsernameForm) {
	createUsernameForm.addEventListener('submit', (event) => {
		event.preventDefault()
		hasUsername = true
		socket.auth = {
			username: username.value,
		}
		socket.connect()
		if(hasUsername) {
			usernameContainer.style.display = 'none'
			main.style.display = 'block'
			userList.style.display = 'block'
		}
	})
}

const roomId = window.location.pathname.split('/')[2]
if(roomId) {
	socket.on('getRoomId', () => {
		console.log(`you are in room: ${roomId}`)
		socket.emit('roomId', {
			roomId: roomId,
		})
	})
}

socket.on('users', ({ users, checkboxes }) => {
	console.log(users)
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
})


checkboxesToArray.forEach(checkbox => checkbox.addEventListener('click', (e) => {
	socket.emit('audio', {
		checkboxIndex: checkboxesToArray.indexOf(e.target),
		checked: e.target.checked,
	})
}))

socket.on('sendAudio', (checkbox) => {
	const { checkboxIndex, checked } = checkbox
	checkboxesToArray[checkboxIndex].checked = checked
})

let index = 0
setInterval(() => {
	for (const key in groupedCheckboxesArray) {
		const checkbox = groupedCheckboxesArray[key][index]

		if(checkbox.checkbox.checked) {
			playSound(checkbox.checkbox)
		}
	}
	if(index === checkboxArrayKeys.length - 1) {
		index = 0
	} else {
		index++
	}
}, 1000)

// render html function
function render(html, selector) {
	const rootDiv = selector ? document.querySelector(selector) : document.getElementById('root')
	return rootDiv.innerHTML = html
}