function playSound(key) {
	const noteAudio = document.getElementById(key.dataset.audio)
	noteAudio.currentTime = 0
	noteAudio.play()
}

export default playSound