tickLoop = setInterval(Universe.tick, (1000 / Universe.tickRate))

function getFloatVal(id) {
	return parseFloat(document.getElementById(id).value)
}