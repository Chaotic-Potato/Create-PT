Universe.tickLoop = setInterval(Universe.tick, (1000 / Universe.tickRate))

function formatTime(time) {
	sign = (time == Math.abs(time))
	time = Math.abs(time)
	return (sign ? "" : "- ") + Math.floor(time / 31556926) + "y " + 
	getTimeMeasure(time, 604800) + "w " + 
	getTimeMeasure(time, 86400, 7) + "d " + 
	getTimeMeasure(time, 3600, 24) + "h " + 
	getTimeMeasure(time, 60, 60) + "m " + 
	Math.round(((time % 31556926) % 60) * 1000000) / 1000000 + "s"
}

function getTimeMeasure(time, len, mod) {
	var val =  Math.floor((time % 31556926) / len)
	return (mod == undefined ? val : val % mod)
	
}

function closeNewBodyDiv() {
	get("newBody").style.visibility = "hidden"
	get("textureSelect").style.visibility = "hidden"
}

function showTextureDiv() {
	get("textureSelect").style.left =get("newBody").style.left
	get("textureSelect").style.top =get("newBody").style.top
	closeNewBodyDiv()
	get("textureSelect").style.visibility = "visible"
}

toggleSettings = function() {get("settings").style.visibility = (get("settings").style.visibility == "hidden" ? "visible" : "hidden")}
newVelPos = function(a, b, m, n) {return ((a * m) + (b *n)) / (m + n)}
getFloatVal = function(id) {return parseFloat(get(id).value)}
get = function(id) {return document.getElementById(id)}