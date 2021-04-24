const Room = require('../models/Room')

async function renderIndex(req, res) {
	const rooms = await Room.find({})
	res.render('index', {
		rooms: rooms,
	})
}

module.exports = renderIndex