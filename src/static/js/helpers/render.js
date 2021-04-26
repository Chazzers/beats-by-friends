// render html function
function render(html, selector) {
	const rootDiv = selector ? document.querySelector(selector) : document.getElementById('root')
	return rootDiv.innerHTML = html
}

export default render