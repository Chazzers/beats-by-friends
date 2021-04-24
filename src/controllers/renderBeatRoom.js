const fs = require('fs/promises')
const path = require('path')
const directoryPath = path.join(__dirname, '../static/samples')
const Room = require('../models/Room')

async function renderBeatRoom(req, res) {
	// returns an array of promises (don't really know why)
	const { id } = req.params

	const currentRoom = await Room.findOne({
		_id: id
	}) 
	if(currentRoom) {
		const instruments = await fs.readdir(directoryPath)
			.then(instruments => instruments.map(async (instrument) => await fs.readdir(`${directoryPath}/${instrument}`)
				.then(samples => {
					return {
						instrument: instrument,
						samples: samples
					}})))
		// Resolve all promises and return an array
		const sampleData = await Promise.all(instruments).then(array => array)

		const cleanSampleData = sampleData.map(instrument => {
			const newSamples = instrument.samples.map(sample => { 
				return {
					sampleName: sample.split('.')[0],
					sampleFileName: sample,
				}
			})
			return {
				instrument: instrument.instrument,
				samples: newSamples
			}
		})

		res.render('beat-room', {
			instrumentSamplesArray: cleanSampleData,
		})
	} else {
		res.redirect('/')
	}
}

module.exports = renderBeatRoom