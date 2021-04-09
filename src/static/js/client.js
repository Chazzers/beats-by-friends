const socket = io()

socket.on('connect', () => {
	socket.send('Hello')
})

socket.on('message', data => console.log(data))