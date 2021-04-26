function addMultipleEventlisteners(events = [], element, handler, socket) {
	events.forEach(eventType => element.addEventListener(eventType, () => handler(element.value, socket)))
}


export default addMultipleEventlisteners
