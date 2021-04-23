const User = require('../models/User')

function createUser(req, res) {
	const { username, password } = req.body
	if(res.status.ok) {
		const newUser = new User({
			username: username,
			password: password, 
			beats: []
		})

		User.create(newUser)
	}
}

module.exports = createUser