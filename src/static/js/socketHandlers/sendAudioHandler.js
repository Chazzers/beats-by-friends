import { checkboxesToArray } from '../helpers/groupAudioByKey.js'
function sendAudioHandler(checkbox) {
	const { checkboxIndex, checked } = checkbox
	checkboxesToArray[checkboxIndex].checked = checked
}

export default sendAudioHandler