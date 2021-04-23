const checkboxes = document.querySelectorAll('.audio-input')
const checkboxesToArray = [...checkboxes]

const checkboxArraytoObjectArray = checkboxesToArray.map((checkbox) => {
	return {
		checkboxAudio: checkbox.dataset.audio,
		checkbox: checkbox
	}
})

const groupedCheckboxesArray = groupByKey(checkboxArraytoObjectArray, 'checkboxAudio')

function groupByKey(array, key) {
	return array.reduce((storage, obj) => {
		const currentValue = obj[key]
		storage[currentValue] = storage[currentValue] || []
		
		storage[currentValue].push(obj)

		return storage
	}, {})
}
const checkboxArrayKeys = Object.keys(groupedCheckboxesArray)

export {
	checkboxArrayKeys, 
	groupedCheckboxesArray,
	checkboxesToArray
}