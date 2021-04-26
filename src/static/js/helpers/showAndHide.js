function showAndHide({ showElements = [], hideElements = [] }) {
	showElements.forEach(element => element.style.display = 'block')
	hideElements.forEach(element => element.style.display = 'none')
}

export default showAndHide