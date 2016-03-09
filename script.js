tickLoop = setInterval(Universe.tick, (1000 / Universe.tickRate))

function getFloatVal(id) {
	return parseFloat(document.getElementById(id).value)
}

function formatTime(time) {
	if (time == Math.abs(time)) {
		return Math.floor(time / 31556926) + "y "+ Math.floor((time % 31556926) / 604800) + "w "+ (Math.floor((time % 31556926) / 86400) % 7) + "d "+ (Math.floor((time % 31556926) / 3600) % 24) + "h "+ (Math.floor((time % 31556926) / 60) % 60) + "m "+ Math.round(((time % 31556926) % 60) * 1000000) / 1000000 + "s"

	}
	else {
		time = Math.abs(time)
		return "- " + Math.floor(time / 31556926) + "y "+ Math.floor((time % 31556926) / 604800) + "w "+ (Math.floor((time % 31556926) / 86400) % 7) + "d "+ (Math.floor((time % 31556926) / 3600) % 24) + "h "+ (Math.floor((time % 31556926) / 60) % 60) + "m "+ Math.round(((time % 31556926) % 60) * 1000000) / 1000000 + "s"
	}
}