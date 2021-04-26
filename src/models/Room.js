const mongoose = require('mongoose')


const roomSchema = new mongoose.Schema({
	roomName: String,
	password: String,
	privateRoom: Boolean,
	checkboxes: Array,
	users: Array,
	bpm: Number
}, {
	timestamps: true
})

module.exports = mongoose.model('Room', roomSchema)