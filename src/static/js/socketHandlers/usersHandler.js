import render from '../helpers/render.js'
import { checkboxesToArray } from '../helpers/groupAudioByKey.js'

function usersHandler({ users, checkboxes, bpm, bpmValue }) {
	render(`
<section>
<h2>Users</h2>
${
	users.map(user => 
	`<article>
		<p>${user.username}</p>
	</article>`
	).join('')
}
</section>
`, '#user-list')
	if(checkboxes.length) {
		checkboxes.forEach(checkbox => checkboxesToArray[checkbox.checkboxIndex].checked = checkbox.checked)
	}
	bpmValue.value = bpm
}

export default usersHandler