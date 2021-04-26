function emitBpmValueToAllUsers(bpm, socket) {
	socket.emit('send bpm', bpm)
}

export default emitBpmValueToAllUsers