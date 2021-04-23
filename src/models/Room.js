const mongoose = require('mongoose')


const roomSchema = new mongoose.Schema({
	roomName: String,
	password: String,
	privateRoom: Boolean,
	users: Array
}, {
	timestamps: true
})

module.exports = mongoose.model('Room', roomSchema)