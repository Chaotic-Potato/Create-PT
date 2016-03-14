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

function newVelPos (a, b, m, n) {
	return ((a * m) + (b *n)) / (m + n)
}

function closeNewBodyDiv() {
	document.getElementById("newBody").style.visibility = "hidden"
	document.getElementById("textureSelect").style.visibility = "hidden"
}

function showTextureDiv() {
	document.getElementById("textureSelect").style.left = document.getElementById("newBody").style.left
	document.getElementById("textureSelect").style.top = document.getElementById("newBody").style.top
	closeNewBodyDiv()
	document.getElementById("textureSelect").style.visibility = "visible"
}
