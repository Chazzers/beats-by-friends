import showAndHide from '../helpers/showAndHide.js'

const username = document.getElementById('username')
const main = document.querySelector('main')
const userList = document.getElementById('user-list')
const usernameContainer = document.getElementById('username-container')

let hasUsername = false

function usernameSubmit(event, socket) {
	hasUsername = true
	event.preventDefault()
	socket.auth = {
		username: username.value,
	}
	socket.connect()
	if(hasUsername) {
		showAndHide({
			showElements:[main, userList],
			hideElements: [usernameContainer] 
		})
	}
}

export default usernameSubmit