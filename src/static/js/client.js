// const socket = io()

// socket.on('connect', () => {
// 	socket.send('Hello')
// })

// socket.on('message', data => console.log(data))

// const whiteKeysKeyboardInput = ['z', 'x', 'c', 'v', 'b', 'n', 'm']
// const blackKeysKeyboardInput = ['s', 'd', 'g', 'h', 'j']

// const keys = document.querySelectorAll('.key')
// const whiteKeys = document.querySelectorAll('.key.white')
// const blackKeys = document.querySelectorAll('.key.black')

// const keyMap = [...keys].reduce((map, key) => {
// 	map[key.CDATA_SECTION_NODE.note] = key
// 	return map
// }, {})

// keys.forEach(key => {
// 	key.addEventListener('click', () => playNote(key))
// })

// document.addEventListener('keydown', e => {
// 	if(e.repeat) return
// 	const key = e.key
// 	const whiteKeyIndex = whiteKeysKeyboardInput.indexOf(key)
// 	const blackKeyIndex = blackKeysKeyboardInput.indexOf(key)

// 	if(whiteKeyIndex > -1) playNote(whiteKeys[whiteKeyIndex])
// 	if(blackKeyIndex > -1) playNote(blackKeys[blackKeyIndex])
// })

// function playNote(key) {
// 	const noteAudio = document.getElementById(key.dataset.note)

// 	noteAudio.currentTime = 0
// 	noteAudio.play()
// 	key.classList.add('active')
// 	noteAudio.addEventListener('ended', () => key.classList.remove('active'))
// }

function recordAudio() {
	return new Promise(resolve => {
		navigator.mediaDevices.getUserMedia({
			audio: {
				echoCancellation: false,
				autoGainControl: false,
				noiseSuppression: false,
				latency: 0
			}
		})
			.then(stream => {
				const mediaRecorder = new MediaRecorder(stream)
				const audioChunks = []
				mediaRecorder.addEventListener('dataavailable', event => {
					audioChunks.push(event.data)
				})
  
				function start() {
					mediaRecorder.start()
				}
  
				function stop() {
					return new Promise(resolve => {
						mediaRecorder.addEventListener('stop', () => {
							const audioBlob = new Blob(audioChunks)
							const audioUrl = URL.createObjectURL(audioBlob)
							const audio = new Audio(audioUrl)
							function play() {
								audio.play()
							}
  
							resolve({
								audioBlob,
								audioUrl,
								play 
							})
						})
  
						mediaRecorder.stop()
					})
				}
				resolve({
					start,
					stop 
				})
			})
	})
}

const sleep = time => new Promise(resolve => setTimeout(resolve, time))

// (async () => {
// 	const recorder = await recordAudio()
// 	recorder.start()
// 	await sleep(3000)
// 	const audio = await recorder.stop()
// 	audio.play()
// })()




async function recordAndPlay() {
	const startRecordingBtn = document.querySelector('#start-recording-btn')
	const stopRecordingBtn = document.querySelector('#stop-recording-btn')
	const recorder = await recordAudio()
	
	let startTime
	let endTime
	let timeElapsed
	startRecordingBtn.addEventListener('click', async () => {
		startTime = Date.now()
		recorder.start()
	})
	stopRecordingBtn.addEventListener('click', async () => {
		const audio = await recorder.stop()
		endTime = Date.now()
		timeElapsed = endTime - startTime
		console.log(timeElapsed)
		setInterval(() => audio.play(), timeElapsed)
	})
}

recordAndPlay()






// setInterval()

// async function recordAudio(record) {
// 	console.log(record)

// 	// Getting permission status.
// 	const micStatus = await navigator.permissions.query({
// 		name: 'microphone'
// 	})

// 	console.log(micStatus) // state: "prompt"

// 	// Reset permission to initial state.
// 	const context = new AudioContext()

// 	if (context.state === 'suspended') {
// 		await context.resume()
// 	}
	
// 	const stream = await navigator.mediaDevices
// 		.getUserMedia({
// 			audio: {
// 				echoCancellation: false,
// 				autoGainControl: false,
// 				noiseSuppression: false,
// 				latency: 0
// 			}
// 		})
// 	const lineInSource = context.createMediaStreamSource(stream)
// 	console.log(lineInSource.disconnect())
// 	lineInSource.disconnect()
	
// 	if(record === true) {
// 		lineInSource.connect(context.destination)
// 	}
// }