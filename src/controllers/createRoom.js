const Room = require('../models/Room')

function createRoom(req, res) {
	const { name, password, privateRoom } = req.body
	
	const newRoom = privateRoom ? new Room({
		roomName: name,
		password: password,
		privateRoom: privateRoom,
		// createdBy: express.session.username,
	}) : new Room({
		roomName: name,
		privateRoom: false,
		//createdBy: express.session.username,
	})

	Room.create(newRoom)
	return res.redirect(`/rooms/${newRoom._id}`)
}

module.exports = createRoom