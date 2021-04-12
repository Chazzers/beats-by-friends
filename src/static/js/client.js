const socket = io()

socket.on('connect', () => {
	socket.send('Hello')
})

socket.on('message', data => console.log(data))

const whiteKeysKeyboardInput = ['z', 'x', 'c', 'v', 'b', 'n', 'm']
const blackKeysKeyboardInput = ['s', 'd', 'g', 'h', 'j']

const keys = document.querySelectorAll('.key')
const whiteKeys = document.querySelectorAll('.key.white')
const blackKeys = document.querySelectorAll('.key.black')

const keyMap = [...keys].reduce((map, key) => {
	map[key.CDATA_SECTION_NODE.note] = key
	return map
}, {})

keys.forEach(key => {
	key.addEventListener('click', () => playNote(key))
})

document.addEventListener('keydown', e => {
	if(e.repeat) return
	const key = e.key
	const whiteKeyIndex = whiteKeysKeyboardInput.indexOf(key)
	const blackKeyIndex = blackKeysKeyboardInput.indexOf(key)

	if(whiteKeyIndex > -1) playNote(whiteKeys[whiteKeyIndex])
	if(blackKeyIndex > -1) playNote(blackKeys[blackKeyIndex])
})

function playNote(key) {
	const noteAudio = document.getElementById(key.dataset.note)

	noteAudio.currentTime = 0
	noteAudio.play()
	key.classList.add('active')
	noteAudio.addEventListener('ended', () => key.classList.remove('active'))
}