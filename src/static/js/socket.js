import { checkboxArrayKeys, groupedCheckboxesArray, checkboxesToArray } from './groupAudioByKey.js'
import playSound from './playSound.js'



const socket = io({
	autoConnect: false
})

const createUsernameForm = document.getElementById('create-username-form')
const username = document.getElementById('username')
const main = document.querySelector('main')

let hasUsername = false

if(!hasUsername && createUsernameForm){ 
	createUsernameForm.style.display = 'block'
	main.style.display = 'none'
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
			createUsernameForm.style.display = 'none'
			main.style.display = 'block'
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
	${
		users.map(user => 
		`<article>
			<h2>${user.username}</h2>
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