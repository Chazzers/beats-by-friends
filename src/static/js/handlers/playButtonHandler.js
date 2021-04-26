import showAndHide from '../helpers/showAndHide.js'
import { groupedCheckboxesArray, checkboxArrayKeys } from '../helpers/groupAudioByKey.js'
import playSound from '../helpers/playSound.js'


// dom element selectors
const playSvg = document.getElementById('play-svg')
const pauseSvg = document.getElementById('pause-svg')
const timelineItems = document.querySelectorAll('.timeline-item')

// global vars
let index = 0
let intervalId
const newArray = []
let start = false

// array alterations
const timelineItemsArray = [...timelineItems]
const nestedTimelineArray = createNestedArrays(timelineItemsArray, 16)

function createNestedArrays(array = [], groupPerAmount) {
	const arrayToPush = []
	
	for (let i = 0; i < groupPerAmount; i++) {
		arrayToPush.push(array[i])
	}
	for (let i = 0; i < groupPerAmount; i++) {
		array.shift()
	}
	newArray.push(arrayToPush)
	if(array.length) {
		return createNestedArrays(array, groupPerAmount)
	} else {
		return newArray
	}
}

function play(bpm) {
	intervalId = setInterval(() => {
		for (const key in groupedCheckboxesArray) {
			const checkbox = groupedCheckboxesArray[key][index]
	
			if(checkbox.checkbox.checked) {
				playSound(checkbox.checkbox)
			}
		}
		nestedTimelineArray.forEach(array => array.forEach(item => item.style.backgroundColor = 'transparent'))
		nestedTimelineArray.forEach(array => array[index].style.backgroundColor = '#ffffff')
		if(index === checkboxArrayKeys.length - 1) {
			index = 0
		} else {
			index++
		}
	}, 60000 / bpm / 4)
}

function pause() {
	clearInterval(intervalId)
}


function playButtonHandler(bpmValue) {
	start = !start
	if(start) {
		play(bpmValue.value)
		showAndHide({
			showElements:[pauseSvg],
			hideElements: [playSvg]
		})
	} else {
		pause()
		showAndHide({
			showElements:[playSvg],
			hideElements: [pauseSvg] 
		})
	}
}

export default playButtonHandler