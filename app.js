const express = require('express')
const app = express()
const http = require('http').Server(app)

const webSocket = require('socket.io')(http)

const port = 3000


app
	.set('view engine', 'ejs')
	.set('views', './src/views')

	.use(express.static('src/static'))
	.use(express.urlencoded({
		extended: true
	}))
	.use(express.json())

	.get('/', (req, res) => {
		res.render('index')
	})

webSocket.on('connection', async (socket) => {
	socket.send('hello')
	socket.on('message', data => console.log(data))
})

http.listen(port, () => console.log(`this app is listening at http://localhost:${port}`))
